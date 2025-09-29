"use server"

import {Resend} from "resend";
import PasswordResetEmail from "@/components/email/password-reset.email";

type Props = {
   to: string,
   url: string,
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordNotification({ to, url} : Props) {
   await resend.emails.send({
      from: `${process.env.APP_NAME} <onboarding@resend.dev>`,
      to: 'krisna.w2010@gmail.com',
      subject: 'Reset Password Notification',
      react: PasswordResetEmail({ resetUrl: url}),
   });
}