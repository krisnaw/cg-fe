"use server"

import {z} from "zod";
import {ActionResponse} from "@/lib/types";
import {db} from "@/db/db-connection";
import {briefs, briefSelectSchema} from "@/db/schema/brief.schema";
import {BRIEF_STATUS} from "@/lib/brief-status";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import {invoice} from "@/db/schema/invoice.schema";
import {getDraftInvoiceByOrgIdAndWriterId} from "@/db/query/invoice.query";
import {briefActivities} from "@/db/schema/brief-activities.schema";
import {BRIEF_ACTIVITY_MESSAGES} from "@/lib/brief-activity-messages";
import {realtime} from "@/lib/realtime";

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

      await storeBriefClosedActivity(updated)
      await realtime.notification.alert.emit("Hello world")
      revalidatePath("/", "layout")

      // TODO: CREATE/UPDATE invoice
      await updateOrCreateInvoice(updated)
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

async function updateOrCreateInvoice(brief: z.infer<typeof briefSelectSchema>) {
   const getDraftInvoice = await getDraftInvoiceByOrgIdAndWriterId(brief.organizationId, brief.writer!)
   if (getDraftInvoice) {
      await db.transaction(async (trx) => {
         await db.update(briefs).set({invoiceId: getDraftInvoice.id,}).where(eq(briefs.id, brief.id)).returning()
      })
   } else {
      await db.transaction(async (trx) => {
         // Create invoice
         const [inserted] = await db.insert(invoice).values({
            organizationId: brief.organizationId,
            writer: brief.writer!
         }).returning();

         // update briefs
         await db.update(briefs).set({invoiceId: inserted.id,}).where(eq(briefs.id, brief.id)).returning();
      })
   }
}

async function storeBriefClosedActivity(brief: z.infer<typeof briefSelectSchema>) {
   try {
      await db.insert(briefActivities).values({
         briefId: brief.id,
         actor: brief.manager,
         message: BRIEF_ACTIVITY_MESSAGES.brief_closed,
      })
   } catch (error) {
      console.error("Failed to store brief activity for closing brief", error)
   }
}
