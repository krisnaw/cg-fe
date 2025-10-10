// table.query.ts
// table.schema.ts
// table.types.ts

import type {InferSelectModel} from "drizzle-orm";
import {user} from "@/db/schema/auth-schema";
import {briefActivities} from "@/db/schema/brief-activities.schema";

export type BriefActivityWithUser = InferSelectModel<typeof briefActivities> & {
  actorUser: InferSelectModel<typeof user> | null
};

