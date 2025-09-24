import {eq} from "drizzle-orm";

import {db} from "@/db/db-connection";
import {briefDefault} from "@/db/schema/brief-default.schema";

export async function getBriefDefaultByOrgId(organizationId: string) {
  const [settings] = await db
    .select()
    .from(briefDefault)
    .where(eq(briefDefault.organizationId, organizationId))
    .limit(1);

  return settings ?? null;
}
