"use server"

import {eq} from "drizzle-orm"
import {z} from "zod"
import {revalidatePath} from "next/cache"

import {db} from "@/db/db-connection"
import {briefs, briefSelectSchema} from "@/db/schema/brief.schema"
import {ActionResponse} from "@/lib/types"
import {BRIEF_STATUS} from "@/lib/brief-status";
import Knock from "@knocklabs/node";
import {briefActivities} from "@/db/schema/brief-activities.schema";
import {BRIEF_ACTIVITY_MESSAGES} from "@/lib/brief-activity-messages";
import {realtime} from "@/lib/realtime";

const knock = new Knock({apiKey: process.env.KNOCK_SECRET_API_KEY});
const BRIEF_WORKFLOW = "brief-was-created"

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
        status: BRIEF_STATUS.SUBMITTED,
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

    await storeBriefActivity(updated)
    await sendBriefSubmittedNotification(updated)
    await realtime.notification.alert.emit("Hello world")
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

async function storeBriefActivity(brief: z.infer<typeof briefSelectSchema>) {
  try {
    await db.insert(briefActivities).values({
      briefId: brief.id,
      actor: brief.writer,
      message: BRIEF_ACTIVITY_MESSAGES.brief_draft_submitted,
    })
  } catch (error) {
    console.error("Failed to store brief activity for draft submission", error)
  }
}

async function sendBriefSubmittedNotification(brief: z.infer<typeof briefSelectSchema>) {
  try {
    const payload = {
      title: brief.name,
      subject: "Draft submitted and ready for review",
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
    console.error("Failed to send Knock notification for brief submission", error)
  }
}
