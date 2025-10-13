"use server"

import {z} from "zod";
import {ActionResponse} from "@/lib/types";
import {briefDiscussion, briefDiscussionInsertSchema} from "@/db/schema/brief-discussion.schema";
import {db} from "@/db/db-connection";
import {revalidatePath} from "next/cache";

const briefDiscussionSchema = z.object({
  briefId: z.number(),
  userId: z.string(),
  message: z.string().trim().min(1, "Message is required"),
});

export type payloadData = z.infer<typeof briefDiscussionInsertSchema>;

export async function store(formData: payloadData): Promise<ActionResponse> {
  const parsed = briefDiscussionSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid data",
      error: z.treeifyError(parsed.error)
    }
  }

  await db.insert(briefDiscussion).values(parsed.data)
  revalidatePath("/", "layout")

  return {
    success: true,
    message: "Message sent successfully"
  }

}
