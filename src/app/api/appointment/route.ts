import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/schemas";
import { CLINIC_CONFIG } from "@/lib/data";

const APPOINTMENTS_FILE = path.join(process.cwd(), "data", "appointments.json");

async function saveAppointment(appointment: AppointmentFormValues) {
  try {
    const directory = path.dirname(APPOINTMENTS_FILE);
    await fs.mkdir(directory, { recursive: true });

    const existing = await fs.readFile(APPOINTMENTS_FILE, "utf-8").catch(() => "[]");
    const appointments = JSON.parse(existing) as Array<AppointmentFormValues & { createdAt: string }>;
    appointments.push({ ...appointment, createdAt: new Date().toISOString() });
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save appointment:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.verify();

      // Send confirmation to the patient
      await transporter.sendMail({
        from: `${CLINIC_CONFIG.doctor.name} <${CLINIC_CONFIG.contact.email}>`,
        to: data.email,
        subject: `Your appointment request has been received at ${CLINIC_CONFIG.name}`,
        html: buildCustomerEmailHtml(data),
      });

      // Send notification to the clinic team
      await transporter.sendMail({
        from: `${CLINIC_CONFIG.doctor.name} <${CLINIC_CONFIG.contact.email}>`,
        to: CLINIC_CONFIG.contact.email,
        subject: `New appointment request from ${data.name}`,
        html: buildDoctorEmailHtml(data),
        replyTo: data.email,
      });
    } else {
      console.warn("SMTP is not configured. Appointment request saved, but confirmation email was not sent.");
    }

    // ── Save request to local storage file so appointments are recorded ──
    await saveAppointment(data);

    // ── Option 3: Log to console (default / development) ─────────
    console.log("📅 New appointment request:", {
      name: data.name,
      phone: data.phone,
      treatment: data.treatment,
      date: data.date,
      time: data.time,
      createdAt: new Date().toISOString(),
    });

    // ── Optional: Save to Google Sheets via API ──────────────────
    // await appendToGoogleSheets(data);

    return NextResponse.json(
      {
        success: true,
        message: `Thank you ${data.name}! We'll confirm your appointment shortly.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Appointment API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please call us directly." },
      { status: 500 }
    );
  }
}

function buildCustomerEmailHtml(data: {
  name: string; phone: string; email: string;
  treatment: string; date: string; time: string; message?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
      <div style="background: #0F2D5E; border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 300;">Appointment Request Received</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">${CLINIC_CONFIG.name}</p>
      </div>
      <div style="background: white; border-radius: 0 0 16px 16px; padding: 32px; border: 1px solid #E2E8F0;">
        <p style="color: #0F172A; font-size: 15px; line-height: 1.75;">
          Hi ${data.name},<br/><br/>
          Thank you for requesting an appointment with ${CLINIC_CONFIG.doctor.name} at ${CLINIC_CONFIG.name}. We've received your request and our team will contact you within 30 minutes to confirm your booking.
        </p>
        <div style="margin: 24px 0; padding: 20px; background: #EFF6FF; border-radius: 14px; border: 1px solid #DBEAFE;">
          <p style="margin: 0; color: #0F172A; font-size: 14px; font-weight: 600;">Request Summary</p>
          <table style="width: 100%; margin-top: 12px; border-collapse: collapse;">
            ${[
              ["Treatment", data.treatment],
              ["Preferred Date", data.date],
              ["Preferred Time", data.time],
              ["Phone", data.phone],
              ["Message", data.message || "None"],
            ].map(([label, value]) => `
              <tr>
                <td style="padding: 8px 0; color: #475569; font-size: 13px; width: 40%; font-weight: 600;">${label}</td>
                <td style="padding: 8px 0; color: #0F172A; font-size: 13px;">${value}</td>
              </tr>
            `).join("")}
          </table>
        </div>
        <p style="margin: 0; color: #64748B; font-size: 13px; line-height: 1.75;">
          If you need to update any details, reply to this email or call us at ${CLINIC_CONFIG.contact.phone}.
        </p>
      </div>
    </body>
    </html>
  `;
}

function buildDoctorEmailHtml(data: {
  name: string; phone: string; email: string;
  treatment: string; date: string; time: string; message?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
      <div style="background: #0F2D5E; border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 300;">New Appointment Request</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">${CLINIC_CONFIG.name}</p>
      </div>
      <div style="background: white; border-radius: 0 0 16px 16px; padding: 32px; border: 1px solid #E2E8F0;">
        <p style="color: #0F172A; font-size: 15px; line-height: 1.75;">
          A new appointment request has arrived. Please contact the patient within 30 minutes to confirm the appointment.
        </p>
        <table style="width: 100%; margin-top: 18px; border-collapse: collapse;">
          ${[
            ["Patient Name", data.name],
            ["Phone", data.phone],
            ["Email", data.email],
            ["Treatment", data.treatment],
            ["Preferred Date", data.date],
            ["Preferred Time", data.time],
            ["Message", data.message || "None"],
          ].map(([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #64748B; font-size: 13px; font-weight: 600; width: 40%;">${label}</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #F1F5F9; color: #1E293B; font-size: 14px;">${value}</td>
            </tr>
          `).join("")}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #FEF3C7; border-radius: 12px; border: 1px solid #FDE68A;">
          <p style="margin: 0; color: #92400E; font-size: 13px; font-weight: 600;">Reminder: Contact this patient within 30 minutes.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
