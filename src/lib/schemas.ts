import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name"),
  phone: z
    .string()
    .min(10, "Enter a valid 10-digit phone number")
    .max(15, "Phone number is too long")
    .regex(/^[+\d\s\-()]{10,15}$/, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email address"),
  treatment: z.string().min(1, "Please select a treatment type"),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  message: z.string().max(500, "Message is too long").optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
