"use server"

import {ActionResponse} from "@/lib/types";
import {briefInsertSchema, BriefModel, briefs} from "@/db/schema/brief.schema";
import {z} from "zod";
import {db} from "@/db/db-connection";
import {BRIEF_STATUS} from "@/lib/brief-status";
import Knock from "@knocklabs/node";
import {getUserByRoleAndOrgId} from "@/db/query/writer.query";
import {Resend} from "resend";
import PasswordResetEmail from "@/components/email/password-reset.email";

const knock = new Knock({ apiKey: process.env.KNOCK_SECRET_API_KEY });
const work_flow = "brief-was-created"
const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendKnockNotification(brief: BriefModel) {
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

export async function sendEmailNotification(brief: BriefModel) {
   const url = `${process.env.APP_URL}/dashboard/${brief.organizationId}/brief/${brief.id}`
   await resend.emails.send({
      from: `${process.env.APP_NAME} <onboarding@resend.dev>`,
      to: 'krisna.w2010@gmail.com',
      subject: 'Reset Password Notification',
      react: PasswordResetEmail({ resetUrl: url}),
   });
}