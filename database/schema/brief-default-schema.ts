import {integer, numeric, pgTable, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {organization} from "@/database/schema/auth-schema";

export const briefDefault = pgTable('brief_default', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   organizationId: text("organization_id")
       .notNull()
       .references(() => organization.id, {onDelete: "cascade"}),
   currency: varchar('currency').notNull().default('USD'),
   price: numeric('price', { precision: 10, scale: 2 }).notNull().default('0.00'),
   wordCount: integer('word_count').notNull().default(0),
   createdAt: timestamp("created_at").defaultNow().notNull(),
   updatedAt: timestamp("updated_at")
       .defaultNow()
       .$onUpdate(() => /* @__PURE__ */ new Date())
       .notNull(),
});