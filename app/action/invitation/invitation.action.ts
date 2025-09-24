"use server"
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {ActionResponse} from "@/lib/types";

export async function acceptInvitation({invitationId}: { invitationId: string }): Promise<ActionResponse> {
   try {
      const data = await auth.api.acceptInvitation({
         body: {
            invitationId: invitationId, // required
         },
         headers: await headers(),
      });
      console.log(data)
      return {
         success: true,
         message: "Invitation accepted successfully",
         id: data?.invitation.organizationId
      }
   } catch (error) {
      console.log(error)
      return {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }
}

export async function declineInvitation({invitationId}: { invitationId: string }): Promise<ActionResponse> {
   try {
      await auth.api.rejectInvitation({
         body: {
            invitationId: invitationId
         },
         headers: await headers(),
      });
      return {
         success: true,
         message: "Invitation declined successfully"
      }
   } catch (error) {
      console.log(error)
      return {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }
}