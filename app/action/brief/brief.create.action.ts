"use server"

import {ActionResponse} from "@/lib/types";
import {briefInsertSchema, briefs, briefSelectSchema} from "@/db/schema/brief.schema";
import {z} from "zod";
import {db} from "@/db/db-connection";
import {BRIEF_STATUS} from "@/lib/brief-status";
import Knock from "@knocklabs/node";
import {getUserByRoleAndOrgId} from "@/db/query/writer.query";

const knock = new Knock({ apiKey: process.env.KNOCK_SECRET_API_KEY });
const work_flow = "brief-was-created"
export type BriefData = z.infer<typeof briefInsertSchema>;


export async function createBrief(formData: BriefData): Promise<ActionResponse> {
   const validate = briefInsertSchema.safeParse(formData);
   if (!validate.success) {
      return {
         success: false,
         message: "Invalid data",
         error: z.treeifyError(validate.error),
      }
   }

   validate.data.status = validate.data.writer ? BRIEF_STATUS.PROGRESS : BRIEF_STATUS.OPEN

   try {
      const [inserted] = await db.insert(briefs).values(validate.data).returning()

      await sendKnockNotification(inserted)

      return {
         success: true,
         message: "Brief created successfully"
      }
   } catch (error) {
      console.error("Failed to create brief", error)
      return {
         success: false,
         message: "Failed to create brief",
      }
   }
}

export async function sendKnockNotification(brief: z.infer<typeof briefSelectSchema>) {
   const payload = {
      deadline: brief.dueDate.toDateString(),
      subject: "Heads up! You have open brief to claims",
      price: `${brief.currency} ${brief.price}`,
      title: brief.name,
      url: `${process.env.APP_URL}/dashboard/${brief.organizationId}/brief/${brief.id}`
   }
   if (brief.writer) {
      payload["subject"] = "You have assigned to a brief"
      await knock.workflows.trigger(work_flow, {
         data: payload,
         actor: brief.manager,
         recipients: [brief.writer],
      });
   } else {
      const writers = await getUserByRoleAndOrgId(brief.organizationId, "writer")
      const writerIds = writers?.map(writer => writer.user.id)
      await knock.workflows.trigger(work_flow, {
         data: payload,
         actor: brief.manager,
         recipients: writerIds
      })
   }
}