"use server"
import {db} from "@/db/db-connection";
import {desc, eq} from "drizzle-orm";
import {briefActivities} from "@/db/schema/brief-activities.schema";

export async function getActivitiesByBriefId(briefId: number) {
  const activities = await db.query.briefActivities.findMany({
    with: {
      actorUser: true,
    },
    where: eq(briefActivities.briefId, briefId),
    orderBy: [desc(briefActivities.createdAt)],
  })

  return activities ?? null;
}
