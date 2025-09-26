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

export async function getInvoiceByOrgId(organizationId: string, status?: string) {
   const whereConditions = [eq(invoice.organizationId, organizationId)];
   
   if (status) {
      whereConditions.push(eq(invoice.status, status));
   }
   
   return db.query.invoice.findMany({
      where: and(...whereConditions),
   })
}
