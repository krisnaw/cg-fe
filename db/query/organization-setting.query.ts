"use server"

import {db} from "@/db/db-connection";
import {eq} from "drizzle-orm";
import {organization_setting} from "@/db/schema/organization-setting.schema";

export async function getByOrgId(organizationId: string) {
   return db.query.organization_setting.findFirst({
      where: eq(organization_setting.organizationId, organizationId),
   })
}