"use server"

import {eq} from "drizzle-orm"
import {z} from "zod"
import {revalidatePath} from "next/cache"

import {db} from "@/db/db-connection"
import {briefs, briefSelectSchema} from "@/db/schema/brief.schema"
import {ActionResponse} from "@/lib/types"
import {BRIEF_STATUS} from "@/lib/brief-status";
import Knock from "@knocklabs/node";

const updateStatusSchema = z.object({
   briefId: z.number(),
   status: z.string()
})

const knock = new Knock({ apiKey: process.env.KNOCK_SECRET_API_KEY });
const BRIEF_WORKFLOW = "brief-was-created"

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

      if (status === BRIEF_STATUS.REQUEST_REVISION) {
         await sendRequestRevisionNotification(updated)
      }

      if (status === BRIEF_STATUS.RESUBMITTED) {
         await sendResubmittedNotification(updated)
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

async function sendRequestRevisionNotification(brief: z.infer<typeof briefSelectSchema>) {
   try {
      if (!brief.writer) {
         return
      }

      const payload = {
         title: brief.name,
         subject: "Revision requested on your draft",
         deadline: brief.dueDate?.toDateString?.() ?? "",
         price: `${brief.currency} ${brief.price}`,
         url: `${process.env.APP_URL}/dashboard/${brief.organizationId}/brief/${brief.id}`,
      }

      await knock.workflows.trigger(BRIEF_WORKFLOW, {
         data: payload,
         actor: brief.manager ?? undefined,
         recipients: [brief.writer],
      })
   } catch (error) {
      console.error("Failed to send Knock notification for revision request", error)
   }
}

async function sendResubmittedNotification(brief: z.infer<typeof briefSelectSchema>) {
   try {
      if (!brief.manager) {
         return
      }

      const payload = {
         title: brief.name,
         subject: "Updated draft resubmitted for review",
         deadline: brief.dueDate?.toDateString?.() ?? "",
         price: `${brief.currency} ${brief.price}`,
         url: `${process.env.APP_URL}/dashboard/${brief.organizationId}/brief/${brief.id}`,
      }

      await knock.workflows.trigger(BRIEF_WORKFLOW, {
         data: payload,
         actor: brief.writer ?? undefined,
         recipients: [brief.manager],
      })
   } catch (error) {
      console.error("Failed to send Knock notification for resubmitted draft", error)
   }
}

