import nodemailer from "nodemailer";

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

const buildClinicMessage = (appointment: AppointmentRequest) => {
  return `New appointment request received.

Name: ${appointment.name}
Phone Number: ${appointment.phone}
Email: ${appointment.email}
Treatment Type: ${appointment.treatment}
Preferred Date: ${appointment.date}
Preferred Time: ${appointment.time}
Additional Message: ${appointment.message ?? "(None)"}`;
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
  const clinicText = buildClinicMessage(appointment);

  await Promise.all([
    sendMail({
      to: patientEmail,
      subject: patientSubject,
      text: patientText,
    }),
    sendMail({
      to: CLINIC_EMAIL,
      subject: clinicSubject,
      text: clinicText,
    }),
  ]);
}
