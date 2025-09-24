"use server"

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";

type AccountData = { name: string, image: string }

export async function updateAccount(formData: AccountData) {
   await auth.api.updateUser({
      body: {
         name: formData.name,
         image: formData.image,
      },
      headers: await headers(),
   })

   revalidatePath("/", "layout");

   return {
      success: true,
      message: "Account updated successfully"
   }
}