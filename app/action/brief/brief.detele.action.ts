"use server"

import {db} from "@/db/db-connection";
import {briefs} from "@/db/schema/brief-schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

export async function deleteBrief(briefId: number) : Promise<void> {
    await db.delete(briefs).where(eq(briefs.id, briefId));
    revalidatePath("/", "layout");
}