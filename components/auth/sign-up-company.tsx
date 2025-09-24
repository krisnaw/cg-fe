"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import SignAlert from "@/components/auth/sign-alert";
import {useActionState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {signUpCompany} from "@/app/action/auth/sign-up-company.action";
import {ActionResponse} from "@/lib/types";
import {createOrganization} from "@/app/action/member/organization/organization.create.action";


export default function SignUpCompany() {
   const searchParams = useSearchParams();
   const rawToken = searchParams.get("token");
   const token = rawToken && rawToken !== "null" && rawToken !== "undefined" ? rawToken : "";
   const loginHref = token ? `/login/?token=${encodeURIComponent(token)}` : "/login";

   const router = useRouter();

   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData) => {
      const submitData = {
         name: formData.get("name") as string,
         email: formData.get("email") as string,
         password: formData.get("password") as string,
         password_confirmation: formData.get("password_confirmation") as string,
         token: formData.get("token") as string,
         company_name: formData.get("company_name") as string,
      };

      const res = await signUpCompany(submitData);

      if (!res.success) {
         toast.error(res.message);
         return res;
      }

      toast.success(res.message);
      const company_name = formData.get("company_name") as string;
      if (res.data) {
         const org = await createOrganization(company_name, res.data)
         if (org.success) {
            toast.success(org.message)
            router.push(`/dashboard/${org.data}`)
         }
      }
      return res;
   }, {
      success: false,
      message: "",
   });

   return (
       <div className="space-y-4">
          {token && <SignAlert/>}
          <form action={formAction}>
             <input type="hidden" name="token" defaultValue={token}/>
          <Card className="min-w-sm min-h-[520px]">
            <CardHeader>
              <CardTitle>Company Account</CardTitle>
              <CardDescription>
                Register your organization and invite your team
              </CardDescription>
            </CardHeader>
                <CardContent>
                   <div className="grid gap-4">
                      <div className="grid gap-2">
                         <Label htmlFor="company_name">Company name</Label>
                         <Input
                             id="company_name"
                             name="company_name"
                             placeholder="Acme Inc."
                             required
                         />
                      </div>
                      <div className="grid gap-2">
                         <Label htmlFor="name">Full name</Label>
                         <Input
                             id="name"
                             placeholder="Max"
                             name="name"
                             required
                         />
                      </div>
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
                      <div className="grid gap-2">
                         <Label htmlFor="password">Password</Label>
                         <Input
                             id="password"
                             type="password"
                             name="password"
                             required
                             autoComplete="new-password"
                             placeholder="Password"
                         />
                      </div>
                      <div className="grid gap-2">
                         <Label htmlFor="password_confirmation">Confirm Password</Label>
                         <Input
                             id="password_confirmation"
                             type="password"
                             name="password_confirmation"
                             required
                             autoComplete="new-password"
                             placeholder="Confirm Password"
                         />
                      </div>
                      <Button type="submit" className="w-full" disabled={isPending}>
                         Create Account
                         {isPending && <Loader2 className="animate-spin"/>}
                      </Button>
                   </div>
                </CardContent>
                <CardFooter>
                   <div className="flex justify-center w-full border-t py-4">
                      <p className="text-center text-xs text-neutral-500">
                         Already have an account? <a href={loginHref}>Sign in</a>
                      </p>
                   </div>
                </CardFooter>
             </Card>
          </form>
       </div>
   );
}
