"use server"

import {Resend} from "resend";
import EmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(): Promise<void> {
   const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['krisna.w2010@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ name: "Krisna"}),
   });
   console.log(data);
}
