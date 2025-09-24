"use client"

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {useActionState, useState} from "react";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import SignAlert from "@/components/auth/sign-alert";
import {signInAction} from "@/app/action/auth/sign-in.action";
import {Loader2} from "lucide-react";
import {ActionResponse} from "@/lib/types";
import {toast} from "sonner";

export default function SignIn() {
   const router = useRouter();
   const [rememberMe, setRememberMe] = useState(false);
   const searchParams = useSearchParams();
   const rawToken = searchParams.get("token");
   const token = rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : "";
   const registerHref = token ? `/register/?token=${encodeURIComponent(token)}` : "/register";

   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_: ActionResponse, formData: FormData) => {
      const submitData = {
         email: formData.get('email') as string,
         password: formData.get('password') as string,
         rememberMe: formData.get('remember') as string,
      }
      const res = await signInAction(submitData);

      if (!res.success) {
         toast.error(res.message)
      }
      toast.success(res.message)
      if (token) {
         router.push(`/invitation/${token}`)
      } else {
         router.push("/dashboard")
      }
      return res;
   }, {
      success: false,
      message: ""
   })

   return (
       <div className="space-y-4">
          {token && <SignAlert/>}
          <form action={formAction}>
             <Card className="min-w-sm">
                <CardHeader>
                   <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
                   <CardDescription className="text-xs md:text-sm">
                      Enter your email below to login to your account
                   </CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="grid gap-4">
                      <div className="grid gap-2">
                         <Label htmlFor="email">Email</Label>
                         <Input
                             id="email"
                             type="email"
                             placeholder="m@example.com"
                             name="email"
                             required
                         />
                      </div>

                      <div className="grid gap-2">
                         <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                               Forgot your password?
                            </Link>
                         </div>

                         <Input
                             id="password"
                             type="password"
                             placeholder="password"
                             autoComplete="password"
                             name="password"
                             required
                         />
                      </div>

                      <div className="flex items-center gap-2">
                         <Checkbox
                             id="remember"
                             name="remember"
                             onClick={() => {setRememberMe(!rememberMe);}}
                         />
                         <Label htmlFor="remember">Remember me</Label>
                      </div>

                      <Button disabled={isPending} type="submit" className="w-full">
                         Login
                         {isPending && <Loader2 className="animate-spin"/>}
                      </Button>
                   </div>
                </CardContent>
                <CardFooter>
                   <div className="flex justify-center w-full border-t py-4">
                      <p className="text-center text-xs text-neutral-500">
                         Don&#39;t have an account? <a href={registerHref}>Register here</a>
                      </p>
                   </div>
                </CardFooter>
             </Card>
          </form>

       </div>
   );
}