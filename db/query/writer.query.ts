"use server"

import {db} from "@/db/db-connection";

export async function getUserByRoleAndOrgId(organizationId: string, role: string) {
   return await db.query.member.findMany({
      with: {
         user: true,
      },
      where: (member, {eq, and, like}) =>
          and(eq(member.organizationId, organizationId), like(member.role, `%${role}%`)),
   });
}