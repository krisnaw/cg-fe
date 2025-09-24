import {db} from "@/db/db-connection";
import {eq} from "drizzle-orm";
import {briefs} from "@/db/schema/brief.schema";
import type {BriefWithUsers} from "@/db/types/brief.types";

export async function getBriefByOrgId(organizationId: string, search: string, sort: string = 'asc') {
   const briefs= db.query.briefs.findMany({
      with: {
         managerUser: true,
         writerUser: true,
      },
      where: (brief, {eq, and, ilike}) =>
          and(eq(brief.organizationId, organizationId), search ?ilike(brief.name, `%${search}%`) : undefined),
      orderBy: (brief, {asc, desc}) =>
          sort == 'asc' ? asc(brief.dueDate) : desc(brief.dueDate),
      limit: 10,
   })
   return briefs as unknown as BriefWithUsers[]
}

export async function getAllBriefs() {
   return db.select().from(briefs);
}

export async function getBriefById(id: number) {
   const brief = db.query.briefs.findFirst({
      where: eq(briefs.id, id),
      with: {
         managerUser: true,
         writerUser: true,
      }
   });

   if (!brief) {
      return null;
   }

   return brief as unknown as BriefWithUsers
}
