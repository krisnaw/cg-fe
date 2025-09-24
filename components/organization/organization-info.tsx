"use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useActionState, useState} from "react";
import {organizationUpdateAction} from "@/app/action/organization/organization.update.action";
import {ActionResponse} from "@/lib/types";
import {Label} from "@/components/ui/label";
import {Loader2} from "lucide-react";
import {toast} from "sonner";

export default function OrganizationInfo({name, organizationId} : {name : string, organizationId: string}) {
   const [orgName, setOrgName] = useState<string>(name)
   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData) => {
      const submitData = {
         organizationId: formData.get("organizationId") as string,
         name: formData.get("name") as string,
         slug: orgName.toLowerCase().replace(/ /g, "-")
      }
      const res = await organizationUpdateAction(submitData);
      if (!res.success) {
         toast.error(res.message)
      }
      toast.success(res.message)
      return res;
   }, {
      success: false,
      message: ""
   })

   const slug = orgName.toLowerCase().replace(/ /g, "-")

   return (
       <form action={formAction}>
          <input type="hidden" name="organizationId" value={organizationId} />
          <Card className="max-w-sm">
             <CardHeader>
                <CardTitle>
                   General information
                </CardTitle>
             </CardHeader>
             <CardContent>
                <div>
                   <Label htmlFor="name">Organization name</Label>
                   <div className="mt-2">
                      <Input required
                             value={orgName}
                             onChange={(e) => setOrgName(e.target.value)}
                             id="name" name="name"  />
                   </div>
                   <p className="text-muted-foreground text-sm mt-1.5">
                      slug: {slug}
                   </p>
                </div>
             </CardContent>
             <CardFooter>
                <Button disabled={isPending} type="submit">
                   Save changes
                   {isPending && <Loader2 className="animate-spin" />}
                </Button>
             </CardFooter>
          </Card>
       </form>
   )
}