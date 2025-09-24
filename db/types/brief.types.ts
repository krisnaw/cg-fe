import type {InferSelectModel} from "drizzle-orm";

import {briefs} from "@/db/schema/brief.schema";
import {user} from "@/db/schema/auth-schema";

export type BriefWithUsers = InferSelectModel<typeof briefs> & {
  managerUser: InferSelectModel<typeof user> | null
  writerUser: InferSelectModel<typeof user> | null
};
