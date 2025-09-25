"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useActionState} from "react";
import {ActionResponse} from "@/lib/types";
import {changePasswordAction} from "@/app/action/auth/change-password.action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export default function ResetPassword({token}: { token: string }) {
   const router = useRouter()
   const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState, formData: FormData) => {
      const submitData = {
         newPassword: formData.get("password") as string,
         token: formData.get("token") as string,
      }
      const res = await changePasswordAction(submitData)
      if (!res.success) {
         toast.error(res.message)
      }
      toast.success(res.message)
      router.push("/login")
      return res;
   }, {
      success: false,
      message: ""
   })

   return (
       <form action={formAction}>
          <input type="hidden" name="token" value={token} readOnly/>
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
                      <div className="flex items-center">
                         <Label htmlFor="password">New password</Label>
                      </div>

                      <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="password"
                          autoComplete="new-password"
                          required
                      />
                   </div>

                   <Button type="submit" className="w-full" disabled={isPending}>
                      Reset password
                      {isPending ? <Loader2 className="animate-spin"/> : null}
                   </Button>
                </div>
             </CardContent>
          </Card>
       </form>
   )
}
