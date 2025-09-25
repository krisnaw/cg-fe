"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export async function forgotPasswordAction({email}: { email: string}) {
   try {
      await auth.api.forgetPassword({
         body: {
            email: email,
         },
         headers: await headers(),
      });
   } catch (error) {
      return  {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }

   return {
      success: true,
      message: "Check your email for a link to reset your password."
   }
}