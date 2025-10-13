"use server"
import {db} from "@/db/db-connection";
import {desc, eq} from "drizzle-orm";
import {briefDiscussion} from "@/db/schema/brief-discussion.schema";

export async function getDiscussionByBriefId(briefId: number) {
  const discussions = await db.query.briefDiscussion.findMany({
    where: eq(briefDiscussion.briefId, briefId),
    orderBy: [desc(briefDiscussion.createdAt)],
  })

  return discussions ?? null;
}
