"use server"

import {auth} from "@/lib/auth";

export async function changePasswordAction({newPassword, token}: { newPassword: string, token: string}) {
   try {

      const data = await auth.api.resetPassword({
         body: {
            newPassword: newPassword, // required
            token, // required
         },
      });
   } catch (error) {
      return  {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }
   return {
      success: true,
      message: "Your password has been changed successfully. Please login with your new password."
   }
}