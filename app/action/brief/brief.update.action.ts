"use server"

import {eq} from "drizzle-orm"
import {z} from "zod"

import {db} from "@/db/db-connection"
import {briefs, briefUpdateSchema} from "@/db/schema/brief.schema"
import {ActionResponse} from "@/lib/types"

export type BriefUpdateData = z.infer<typeof briefUpdateSchema>

export async function updateBrief(data: BriefUpdateData): Promise<ActionResponse> {
   const validated = briefUpdateSchema.safeParse(data)
   if (!validated.success) {
      return {
         success: false,
         message: "Invalid data",
         error: z.treeifyError(validated.error),
      }
   }

   const {id, ...payload} = validated.data
   const sanitizedPayload = Object.fromEntries(
       Object.entries(payload).filter(([, value]) => value !== undefined)
   ) as Partial<BriefUpdateData>

   await db
       .update(briefs)
       .set({
          ...sanitizedPayload,
          updatedAt: new Date(),
       })
       .where(eq(briefs.id, id)).returning()

   return {
      success: true,
      message: "Brief updated successfully",
   }
}
