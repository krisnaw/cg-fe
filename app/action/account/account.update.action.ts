"use server"

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";
import Knock from "@knocklabs/node";

type AccountData = { id: string, email: string, name: string, image: string }
const knock = new Knock({ apiKey: process.env.KNOCK_SECRET_API_KEY });

export async function updateAccount(formData: AccountData) {

   try {
      await auth.api.updateUser({
         body: {
            name: formData.name,
            image: formData.image,
         },
         headers: await headers(),
      })

      // Dispatch Knock event
      await dispatchKnockEvent(formData)
   } catch (error) {
      return  {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }

   revalidatePath("/", "layout");

   return {
      success: true,
      message: "Account updated successfully"
   }
}

async function dispatchKnockEvent(formData: AccountData) {
   await knock.users.update(formData.id, {
      name: formData.name,
      avatar: formData.image,
      email: formData.email,
   })
}