"use server"

import {eq} from "drizzle-orm"
import {z} from "zod"
import {revalidatePath} from "next/cache"

import {db} from "@/db/db-connection"
import {briefs} from "@/db/schema/brief.schema"
import {ActionResponse} from "@/lib/types"
import {BRIEF_STATUS} from "@/lib/brief-status";

const updateStatusSchema = z.object({
   briefId: z.number(),
   status: z.string()
})

export async function updateBriefStatus(input: z.infer<typeof updateStatusSchema>): Promise<ActionResponse> {
   const parsed = updateStatusSchema.safeParse(input)

   if (!parsed.success) {
      return {
         success: false,
         message: "Invalid status update",
         error: z.treeifyError(parsed.error),
      }
   }

   const {briefId, status} = parsed.data

   try {
      const [updated] = await db
          .update(briefs)
          .set({
             status,
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
         message: "Brief status updated",
      }
   } catch (error) {
      console.error("Failed to update brief status", error)
      return {
         success: false,
         message: "Failed to update status",
      }
   }
}

const closeBriefSchema = z.object({
   briefId: z.number(),
})

export async function closeBrief(input: z.infer<typeof closeBriefSchema>): Promise<ActionResponse> {
   const parsed = closeBriefSchema.safeParse(input)

    if (!parsed.success) {
        return {
            success: false,
            message: "Invalid close request",
            error: z.treeifyError(parsed.error),
        }
    }

    const {briefId} = parsed.data

    try {
        const [updated] = await db
            .update(briefs)
            .set({
                status: BRIEF_STATUS.CLOSED,
                closedAt: new Date(),
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
            message: "Brief closed",
        }
    } catch (error) {
        console.error("Failed to close brief", error)
        return {
            success: false,
            message: "Failed to close brief",
        }
    }
}
