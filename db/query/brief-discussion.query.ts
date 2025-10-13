"use server"
import {db} from "@/db/db-connection";
import {asc, eq} from "drizzle-orm";
import {briefDiscussion} from "@/db/schema/brief-discussion.schema";

export async function getDiscussionByBriefId(briefId: number) {
  const discussions = await db.query.briefDiscussion.findMany({
    with: {
      user: true,
    },
    where: eq(briefDiscussion.briefId, briefId),
    orderBy: [asc(briefDiscussion.createdAt)],
  })

  return discussions ?? null;
}
