"use server"

import {eq} from "drizzle-orm";
import {z} from "zod";

import {db} from "@/db/db-connection";
import {briefDefault} from "@/db/schema/brief-default.schema";
import {ActionResponse} from "@/lib/types";
import {getBriefDefaultByOrgId} from "@/db/query/brief-default.query";
import {revalidatePath} from "next/cache";

const briefDefaultSchema = z.object({
  organizationId: z.string().min(1),
  currency: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  wordCount: z.coerce.number().min(0),
});

export type BriefDefaultPayload = z.infer<typeof briefDefaultSchema>;

export async function upsertBriefDefaultSettings(payload: BriefDefaultPayload): Promise<ActionResponse> {
  const parsed = briefDefaultSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid data submitted",
      error: z.treeifyError(parsed.error),
    };
  }

  const {organizationId, currency, price, wordCount} = parsed.data;

  const existing = await getBriefDefaultByOrgId(organizationId);

  const normalizedPrice = price.toFixed(2);

  if (existing) {
    await db
      .update(briefDefault)
      .set({
        currency,
        price: normalizedPrice,
        wordCount,
        updatedAt: new Date(),
      })
      .where(eq(briefDefault.id, existing.id));
  } else {
    await db.insert(briefDefault).values({
      organizationId,
      currency,
      price: normalizedPrice,
      wordCount,
    });
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    message: "Default brief settings saved",
  };
}
