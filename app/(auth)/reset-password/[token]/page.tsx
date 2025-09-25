import ResetPassword from "@/components/auth/reset-password";
import {Suspense} from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  )
}