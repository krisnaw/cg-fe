import {integer, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import {briefs} from "@/db/schema/brief.schema";
import {user} from "@/db/schema/auth-schema";
import {createInsertSchema} from "drizzle-zod";

export const briefDiscussion = pgTable('brief_discussion', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  briefId: integer("brief_id")
    .notNull()
    .references(() => briefs.id, {onDelete: "cascade"}),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  message: text("message").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const briefDiscussionInsertSchema = createInsertSchema(briefDiscussion).omit({
  createdAt: true,
  updatedAt: true,
})