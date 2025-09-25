import {integer, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import {organization, user} from "@/db/schema/auth-schema";
import {createInsertSchema, createSelectSchema, createUpdateSchema} from "drizzle-zod";
import {z} from "zod";

export const invoice = pgTable('invoice', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),

   organizationId: text("organization_id")
       .notNull()
       .references(() => organization.id, {onDelete: "cascade"}),

   writer: text("writer")
       .references(() => user.id, {onDelete: "set null"}).notNull(),


   status: text("status").notNull().default('draft'),


   createdAt: timestamp("created_at").defaultNow().notNull(),
   updatedAt: timestamp("updated_at")
       .defaultNow()
       .$onUpdate(() => /* @__PURE__ */ new Date())
       .notNull(),
});

export const invoiceSelectSchema = createSelectSchema(invoice);

export const invoiceInsertSchema = createInsertSchema(invoice)

export const invoiceUpdateSchema = createUpdateSchema(invoice).extend({id: z.number()});