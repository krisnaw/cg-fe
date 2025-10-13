"use server"

import {z} from "zod";
import {ActionResponse} from "@/lib/types";

const briefDiscussionSchema = z.object({
  briefId: z.coerce.number().int().positive(),
  userId: z.array(z.string()),
  message: z.string().trim().min(1, "Message is required"),
});

export async function store(formData: FormData): Promise<ActionResponse> {
  // const parsed = briefDiscussionSchema.safeParse({
  //   briefId: formData.get("briefId"),
  //   message: formData.get("message"),
  // });
  //
  // if (!parsed.success) {
  //   return {
  //     success: false,
  //     message: "Invalid data",
  //     error: z.treeifyError(parsed.error)
  //   }
  // }
  //
  // await db.insert(briefDiscussion).values({
  //   briefId: parsed.data.briefId,
  //   userId: "1",
  //   message: parsed.data.message,
  // })

  return {
    success: true,
    message: "Message sent successfully"
  }

}
