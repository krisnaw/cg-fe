import {integer, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import {briefs} from "@/db/schema/brief.schema";
import {user} from "@/db/schema/auth-schema";
import {relations} from "drizzle-orm";

export const briefActivities = pgTable('brief_activities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  briefId: integer("brief_id")
    .notNull()
    .references(() => briefs.id, {onDelete: "cascade"}),

  actor: text("actor")
    .references(() => user.id, {onDelete: "set null"}),

  message: text("message").notNull(),
  type: text("type").default("brief_updated"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const briefActivitiesRelations = relations(briefActivities, ({one}) => ({
  actorUser: one(user, {
    fields: [briefActivities.actor],
    references: [user.id],
  }),
}));