import * as nodemailer from "nodemailer";

const getMailerConfig = () => {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const CLINIC_EMAIL = process.env.CLINIC_EMAIL;

  if (!EMAIL_USER || !EMAIL_PASS || !CLINIC_EMAIL) {
    throw new Error(
      "Missing required email environment variables. Set EMAIL_USER, EMAIL_PASS, and CLINIC_EMAIL."
    );
  }

  return {
    EMAIL_USER,
    EMAIL_PASS,
    CLINIC_EMAIL,
  };
};

const getTransporter = () => {
  const { EMAIL_USER, EMAIL_PASS } = getMailerConfig();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

export type AppointmentRequest = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  time: string;
  message?: string;
};

const buildPatientMessage = (appointment: AppointmentRequest) => {
  return `Hello ${appointment.name},

Thank you for choosing Dr. Pooja Bala Clinic.

We have successfully received your appointment request.

Appointment Details:

- Treatment: ${appointment.treatment}
- Preferred Date: ${appointment.date}
- Preferred Time: ${appointment.time}

Our team will contact you within 30 minutes during clinic hours to confirm your appointment.

If you have urgent concerns, please contact the clinic directly.

Regards,
Dr. Pooja Bala Clinic`;
};

const buildDoctorMessage = (appointment: AppointmentRequest) => {
  return `New appointment request received.

Name: ${appointment.name}
Phone Number: ${appointment.phone}
Email: ${appointment.email}
Treatment Type: ${appointment.treatment}
Preferred Date: ${appointment.date}
Preferred Time: ${appointment.time}
Additional Message: ${appointment.message ?? "(None)"}`;
};

const buildCustomerEmailHtml = (appointment: AppointmentRequest) => {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family: 'DM Sans', sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: #0F2D5E; color: #ffffff; padding: 32px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 500;">Appointment Request Received</h1>
    </div>
    <div style="padding: 32px; color: #0f172a; font-size: 15px; line-height: 1.7;">
      <p>Hello ${appointment.name},</p>
      <p>Thank you for choosing Dr. Pooja Bala Clinic. We have received your appointment request and will contact you shortly to confirm the details.</p>
      <p><strong>Appointment Details</strong></p>
      <ul style="padding-left: 20px;">
        <li>Treatment: ${appointment.treatment}</li>
        <li>Preferred Date: ${appointment.date}</li>
        <li>Preferred Time: ${appointment.time}</li>
      </ul>
      <p>We will contact you within 30 minutes during clinic hours to confirm your appointment. If you have urgent concerns, please call the clinic directly.</p>
      <p style="margin-top: 24px; color: #64748b; font-size: 13px;">Dr. Pooja Bala Clinic</p>
    </div>
  </div>
</body>
</html>`;
};

const buildDoctorEmailHtml = (appointment: AppointmentRequest) => {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family: 'DM Sans', sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: #0F2D5E; color: #ffffff; padding: 32px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 500;">New Appointment Request</h1>
    </div>
    <div style="padding: 32px; color: #0f172a; font-size: 15px; line-height: 1.7;">
      <p>A new appointment request has been submitted.</p>
      <p><strong>Patient Details</strong></p>
      <ul style="padding-left: 20px;">
        <li>Name: ${appointment.name}</li>
        <li>Phone Number: ${appointment.phone}</li>
        <li>Email: ${appointment.email}</li>
        <li>Treatment: ${appointment.treatment}</li>
        <li>Preferred Date: ${appointment.date}</li>
        <li>Preferred Time: ${appointment.time}</li>
        <li>Message: ${appointment.message ?? "(None)"}</li>
      </ul>
    </div>
  </div>
</body>
</html>`;
};

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const { EMAIL_USER } = getMailerConfig();
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Dr. Pooja Bala Clinic" <${EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export async function sendAppointmentNotifications(
  appointment: AppointmentRequest
) {
  const { CLINIC_EMAIL } = getMailerConfig();
  const patientEmail = appointment.email;
  const patientSubject = "Appointment Request Received - Dr. Pooja Bala Clinic";
  const clinicSubject = "New Appointment Request";

  const patientText = buildPatientMessage(appointment);
  const clinicText = buildDoctorMessage(appointment);

  await Promise.all([
    sendMail({
      to: patientEmail,
      subject: patientSubject,
      text: patientText,
      html: buildCustomerEmailHtml(appointment),
    }),
    sendMail({
      to: CLINIC_EMAIL,
      subject: clinicSubject,
      text: clinicText,
      html: buildDoctorEmailHtml(appointment),
    }),
  ]);
}

export async function sendSubscriberWelcomeEmail(email: string) {
  const subject = "You're subscribed to Dr. Pooja Bala's blog updates";
  const text = `Thank you for subscribing to Dr. Pooja Bala's blog updates. You’ll receive an email whenever new dental health articles are published on our website.`;
  const html = `<!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"/></head>
  <body style="font-family: 'DM Sans', sans-serif; background: #f8fafc; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background: #0F2D5E; color: #ffffff; padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 500;">SubDr. Pooja Bala's Blog Updates</p>
      </div>
      <div style="padding: 32px; color: #0f172a; font-size: 15px; line-height: 1.7;">
        <p>Hi there,</p>
        <p>Thank you for subscribing to the Dr. Pooja Bala's Dental Health Blog.</p>
        <p>You’ll now receive an email whenever we publish new articles, guides, and expert advice from Dr. Pooja Bala.</p>
        <p style="margin-bottom: 24px;">If you ever wish to unsubscribe, just click the link in any update email.</p>
        <p style="font-weight: 600;">We look forward to keeping your smile healthy and informed.</p>
        <p style="margin-top: 24px; color: #64748b; font-size: 13px;">Dr. Pooja Bala's Dental Clinic</p>
      </div>
    </div>
  </body>
  </html>`;

  await sendMail({
    to: email,
    subject,
    text,
    html,
  });
}
