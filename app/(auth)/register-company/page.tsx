import {Suspense} from "react";
import SignUpCompany from "@/components/auth/sign-up-company";

export default function RegisterPage() {
   return (
       <Suspense fallback={<div>Loading...</div>}>
          <SignUpCompany />
       </Suspense>
   )
}