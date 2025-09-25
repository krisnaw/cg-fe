"use server"

import {Resend} from "resend";
import PasswordResetEmail from "@/components/email/password-reset.email";

type Props = {
   to: string,
   subject: string,
   url: string,
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail({ to, subject, url} : Props) {
   console.log(to, subject, url)
   const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['krisna.w2010@gmail.com'],
      subject: 'Reset Password',
      react: PasswordResetEmail({ name: "Krisna", resetUrl: url}),
   });
}