import type {InferSelectModel} from "drizzle-orm";

import {member, user} from "@/db/schema/auth-schema";

export type UserType = typeof user.$inferSelect;

export type MemberWithUser = InferSelectModel<typeof member> & {
  user: InferSelectModel<typeof user>;
};
