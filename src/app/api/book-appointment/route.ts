import { z } from "zod";
import { NextResponse } from "next/server";
import { sendAppointmentNotifications } from "@/lib/mail";

const appointmentSchema = z.object({
  name: z.string().min(1, "Full Name is required."),
  phone: z.string().min(1, "Phone Number is required."),
  email: z.string().email("A valid Email Address is required."),
  treatment: z.string().min(1, "Treatment Type is required."),
  date: z.string().min(1, "Preferred Date is required."),
  time: z.string().min(1, "Preferred Time is required."),
  message: z.string().optional(),
});

type AppointmentPayload = z.infer<typeof appointmentSchema>;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parseResult = appointmentSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Invalid appointment data.",
        details: parseResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const appointment = parseResult.data as AppointmentPayload;

  try {
    await sendAppointmentNotifications(appointment);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you. Your appointment request has been received. Our team will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Appointment email error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Unknown error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
