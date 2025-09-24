"use server"

import {ActionResponse} from "@/lib/types";
import {briefInsertSchema, briefs} from "@/db/schema/brief.schema";
import {z} from "zod";
import {db} from "@/db/db-connection";
import {BRIEF_STATUS} from "@/lib/brief-status";

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
      await db.insert(briefs).values(validate.data).returning()

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
