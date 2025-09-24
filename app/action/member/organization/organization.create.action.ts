"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {nameToSlug} from "@/lib/stringToSlug";

export async function createOrganization(name: string, userId: string) {
   let orgId = ""
   try {
      const data = await auth.api.createOrganization({
         body: {
            name: name, // required
            slug: nameToSlug(name), // required
            logo: "https://example.com/logo.png",
            userId: userId, // server-only
            keepCurrentActiveOrganization: false,
         },
         // This endpoint requires session cookies.
         headers: await headers(),
      });

      if (!data) {
         return {
            success: false,
            message: "Sorry, something went wrong. Please try again later."
         }
       }
      orgId = data.id

   } catch (error) {
      console.log(error)
      return {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }
   return {
      success: true,
      message: "Organization created successfully.",
      data: orgId
   };

}