"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {z} from "zod";
import {revalidatePath} from "next/cache";

const OrganizationSchema = z.object({
   name: z.string().min(3),
   slug: z.string().min(3),
   organizationId: z.string(),
})

type OrganizationData = z.infer<typeof OrganizationSchema>;

export async function organizationUpdateAction(formData: OrganizationData) {

   const validate = OrganizationSchema.safeParse(formData);

   if (!validate.success) {
      return {
         success: false,
         message: "Invalid data",
         error: z.treeifyError(validate.error)
      }
   }

   await auth.api.updateOrganization({
      body: {
         data: { // required
            name: validate.data.name,
            slug: validate.data.slug,
         },
         organizationId: validate.data.organizationId,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
   });

   revalidatePath("/", "layout");
   
   return {
      success: true,
      message: "Organization updated successfully"
   }
}