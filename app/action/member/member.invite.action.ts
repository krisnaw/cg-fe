"use server"

import {revalidatePath} from "next/cache";
import {ActionResponse} from "@/lib/types";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {z} from "zod";

const invitationSchema = z.object({
  email: z.email(),
  organizationId: z.string(),
});

type InvitationData = z.infer<typeof invitationSchema>;

export async function inviteMember(formData: InvitationData): Promise<ActionResponse> {
  const {email, organizationId} = formData

  const validate = invitationSchema.safeParse({email, organizationId});

  if (!validate.success) {
    return {
      success: false,
      message: "Invalid data",
      error: z.treeifyError(validate.error)
    }
  }

  try {
    await auth.api.createInvitation({
      body: {
        email: email as string, // required
        role: "member", // required
        organizationId: organizationId as string,
        resend: true,
      },
      headers: await headers(),
    });

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
       return {
         success: false,
         message: error.message,
       }
     }
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Invitation sent successfully"
  }
}