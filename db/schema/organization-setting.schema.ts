import {numeric, pgTable, text} from "drizzle-orm/pg-core";
import {organization} from "@/db/schema/auth-schema";

export const organization_setting = pgTable("organization_setting", {
   organizationId: text("organization_id")
       .notNull()
       .references(() => organization.id, { onDelete: "cascade" })
       .primaryKey(),
   stripe_customer_id: text("stripe_customer_id"),
   pm_type: text("pm_type"),
   pm_last_four: text("pm_last_four"),
   service_fee: numeric("service_fee").default("15"),
});
