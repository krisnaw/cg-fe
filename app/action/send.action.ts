"use server"

import {Resend} from "resend";
import VercelInviteUser from "@/react-email-starter/emails/vercel-invite-user";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(): Promise<void> {
   const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['krisna.w2010@gmail.com'],
      subject: 'Hello world',
      react: VercelInviteUser({ }),
   });
   console.log(data);
}
