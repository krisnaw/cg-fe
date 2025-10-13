import type {InferSelectModel} from "drizzle-orm";

import {user} from "@/db/schema/auth-schema";
import {briefDiscussion} from "@/db/schema/brief-discussion.schema";

export type BriefDiscussionWithUser = InferSelectModel<typeof briefDiscussion> & {
  user: InferSelectModel<typeof user> | null
};
