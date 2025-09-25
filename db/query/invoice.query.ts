"use server"

import {db} from "@/db/db-connection";
import {and, eq} from "drizzle-orm";
import {invoice} from "@/db/schema/invoice.schema";

export async function getDraftInvoiceByOrgIdAndWriterId(OrganizationId: string, writerId: string) {
   return db.query.invoice.findFirst({
      where: and(
          eq(invoice.organizationId, OrganizationId),
          eq(invoice.writer, writerId),
          eq(invoice.status, "draft")
      ),
   })
}
