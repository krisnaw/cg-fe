import {relations, sql} from "drizzle-orm";
import {check, integer, numeric, pgTable, text, timestamp, varchar} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema, createUpdateSchema} from "drizzle-zod";
import {organization, user} from "@/db/schema/auth-schema";
import {z} from "zod";

export const briefs = pgTable('briefs', {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),

   organizationId: text("organization_id")
       .notNull()
       .references(() => organization.id, {onDelete: "cascade"}),

   name: varchar('name').notNull(),
   description: varchar('description').notNull(),
   status: varchar('status').notNull().default('draft'),

   currency: varchar('currency').notNull().default('USD'),
   price: numeric('price', { precision: 10, scale: 2 }).notNull().default('0.00'),

   dueDate: timestamp('due_date').notNull(),
   closedAt: timestamp('closed_at'),

   wordCount: integer('word_count').notNull().default(0),
   draftURL: text('draft_url'),

   manager: text("manager")
       .references(() => user.id, {onDelete: "set null"}),

   writer: text("writer")
       .references(() => user.id, {onDelete: "set null"}),

   createdAt: timestamp("created_at").defaultNow().notNull(),
   updatedAt: timestamp("updated_at")
       .defaultNow()
       .$onUpdate(() => /* @__PURE__ */ new Date())
       .notNull(),
}, (table) => ({
   managerDiffersFromWriter: check(
       "briefs_manager_writer_distinct",
       sql`${table.manager} IS DISTINCT FROM ${table.writer}`,
   ),
}));

export const briefSelectSchema = createSelectSchema(briefs);

export const briefInsertSchema = createInsertSchema(briefs).superRefine((values, ctx) => {
   if (values.manager === values.writer) {
      ctx.addIssue({
         code: "custom",
         message: "Manager and writer must be different",
         path: ["writer"],
      });
   }
});

export const briefUpdateSchema = createUpdateSchema(briefs).extend({
   id: z.number(),
});

export const briefRelations = relations(briefs, ({one}) => ({
   managerUser: one(user, {
      fields: [briefs.manager],
      references: [user.id],
   }),
   writerUser: one(user, {
      fields: [briefs.writer],
      references: [user.id],
   }),
   organization: one(organization, {
      fields: [briefs.organizationId],
      references: [organization.id],
   }),
}));
