import { z } from "zod";
import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import { sendSubscriberWelcomeEmail } from "@/lib/mail";

const subscribeSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const result = subscribeSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid email address.", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { email } = result.data;
  const response = await addSubscriber(email);

  if (response.added) {
    try {
      await sendSubscriberWelcomeEmail(email);
    } catch (error) {
      console.error("Welcome email send failed:", error);
    }
  }

  return NextResponse.json(
    {
      success: true,
      message: response.message,
    },
    { status: 200 }
  );
}
