"use server"

import {eq} from "drizzle-orm"
import {z} from "zod"
import {revalidatePath} from "next/cache"

import {db} from "@/db/db-connection"
import {briefs} from "@/db/schema/brief-schema"
import {ActionResponse} from "@/lib/types"

const submitDraftSchema = z.object({
   briefId: z.coerce.number().int().positive(),
   draftUrl: z.url(),
})

export async function briefSubmitAction(formData: FormData): Promise<ActionResponse> {
   const parsed = submitDraftSchema.safeParse({
      briefId: formData.get("briefId"),
      draftUrl: formData.get("draftUrl"),
   })

   if (!parsed.success) {
      return {
         success: false,
         message: "Invalid data",
         error: z.treeifyError(parsed.error),
      }
   }

   const {briefId, draftUrl} = parsed.data

   try {
      const [updated] = await db
          .update(briefs)
       .set({
          draftURL: draftUrl,
         status: "submitted",
          updatedAt: new Date(),
       })
          .where(eq(briefs.id, briefId))
          .returning()

      if (!updated) {
         return {
            success: false,
            message: "Brief not found",
         }
      }

      revalidatePath("/", "layout")

      return {
         success: true,
         message: "Draft link submitted",
      }
   } catch (error) {
      console.error("Failed to submit draft", error)
      return {
         success: false,
         message: "Failed to submit draft",
      }
   }
}
