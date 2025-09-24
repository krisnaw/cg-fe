import type {InferSelectModel} from "drizzle-orm";

import {briefs} from "@/database/schema/brief-schema";
import {user} from "@/database/schema/auth-schema";

export type BriefWithUsers = InferSelectModel<typeof briefs> & {
  managerUser: InferSelectModel<typeof user> | null
  writerUser: InferSelectModel<typeof user> | null
};
