"use server"

import {z} from "zod";
import {ActionResponse} from "@/lib/types";
import {db} from "@/db/db-connection";
import {briefs} from "@/db/schema/brief.schema";
import {BRIEF_STATUS} from "@/lib/brief-status";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

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

      // TODO: CREATE/UPDATE invoice
      // TODO: Send knock notification
      // TODO: Send email notification

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
