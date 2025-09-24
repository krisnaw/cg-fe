"use server"

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";

export async function deleteMemberAction(memberId: string, organizationId: string) {
   try {
      await auth.api.removeMember({
         body: {
            memberIdOrEmail: memberId,
            organizationId,
         },
         headers: await headers(),
      });
   } catch (error) {
      console.log(error);
      throw error;
   }

   revalidatePath("/", "layout");
}
