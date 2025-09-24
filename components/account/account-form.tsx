"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useActionState, useState} from "react";
import {Loader2} from "lucide-react";
import {updateAccount} from "@/app/action/account/account.update.action";
import {ActionResponse, SessionUserType} from "@/lib/types";
import {toast} from "sonner";
import {UploadButton} from "@/lib/uploadthing";

export default function AccountForm({user}: { user: SessionUserType | undefined }) {
   const [image, setImage] = useState<string>(user?.image ?? "");
   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData: FormData) => {
      const data = {
         name: formData.get("name") as string,
         image: image
      }
      const res = await updateAccount(data)

      if (!res.success) {
         toast.error(res.message)
      }

      toast.success(res.message)

      return res
   }, {
      success: false,
      message: ""
   })

   if (!user) return null


   return (
       <form action={formAction}>
          <Card className="min-w-sm max-w-sm">
             <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                   Update your display name and profile avatar.
                </CardDescription>
             </CardHeader>
             <CardContent>
                <div className="grid gap-6">
                   <div>
                      <div className="col-span-full flex items-center gap-x-8">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img
                             alt="User avatar"
                             src={image}
                             className="size-24 flex-none rounded-lg bg-gray-100 object-cover outline -outline-offset-1 outline-black/5"
                         />
                         <div>
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                   // Do something with the response
                                   setImage(res[0].appUrl)
                                   toast.info("Upload Completed");
                                }}
                                onUploadError={(error: Error) => {
                                   // Do something with the error.
                                   toast.error(`ERROR! ${error.message}`);
                                }}
                            />
                         </div>
                      </div>
                   </div>
                   <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          autoComplete="name"
                          defaultValue={user.name}
                      />
                   </div>
                </div>
             </CardContent>
             <CardFooter>
                <Button disabled={isPending} type="submit">
                   Save changes
                   {isPending && <Loader2 className="animate-spin"/>}
                </Button>
             </CardFooter>
          </Card>
       </form>
   );
}
