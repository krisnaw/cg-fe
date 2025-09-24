import {boolean, integer, pgTable, text, timestamp, unique} from 'drizzle-orm/pg-core';
import {user} from "@/database/schema/auth-schema";

// Table to represent a one-to-one chat between two users
export const chat = pgTable('chat', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    user1Id: text('user1_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    user2Id: text('user2_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
    uniqueUserPair: unique('unique_user_pair').on(table.user1Id, table.user2Id),
}));

// Table for messages within a chat
export const message = pgTable('message', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    chatId: integer('chat_id')
        .notNull()
        .references(() => chat.id, { onDelete: 'cascade' }),
    senderId: text('sender_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    sentAt: timestamp('sent_at').notNull().defaultNow(),
    isRead: boolean('is_read').notNull().default(false),
});

// Type definitions for TypeScript
export type ChatType = typeof chat.$inferSelect;
export type InsertChat = typeof chat.$inferInsert;
export type SelectChat = typeof chat.$inferSelect;
export type InsertMessage = typeof message.$inferInsert;
export type SelectMessage = typeof message.$inferSelect;