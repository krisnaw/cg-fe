"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {Loader2} from "lucide-react";
import {useActionState} from "react";
import {forgotPasswordAction} from "@/app/action/auth/forgot-password.action";
import {ActionResponse} from "@/lib/types";
import {toast} from "sonner";

export default function ForgotPassword() {

   const [state, formAction, loading] = useActionState<ActionResponse, FormData>(async (prevState, formData: FormData) => {
      const email = formData.get("email") as string;
      const submitData = {
         email: email,
      }
      const res = await forgotPasswordAction(submitData)
      if (!res.success) {
         toast.error(res.message)
      } else {
         toast.success(res.message)
      }
      return res
   }, {
      success: false,
      message: ""
   })

  return (
      <form action={formAction}>
         <Card className="min-w-sm">
            <CardHeader>
               <CardTitle className="text-lg md:text-xl">Forgot password</CardTitle>
               <CardDescription className="text-xs md:text-sm">
                  Enter your email below to reset your password.
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                         id="email"
                         type="email"
                         name="email"
                         placeholder="m@example.com"
                         required
                     />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                     Reset password
                     {loading && <Loader2 className="animate-spin" />}
                  </Button>
               </div>
            </CardContent>
         </Card>
      </form>
  )
}
