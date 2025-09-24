import SignIn from "@/components/auth/sign-in";
import {Suspense} from "react";

export default function LoginPage() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
   </Suspense>
  )
}