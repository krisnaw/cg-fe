"use server"
import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";

export async function memberUpdateRole(memberId: string, organizationId: string, roles: string[]) {
  try {
    const data = await auth.api.updateMemberRole({
      body: {
        role: roles, // required
        memberId: memberId,
        organizationId: organizationId,
      },
      headers: await headers(),
    });

    console.log(data)
  } catch (error) {
    console.log(error)
  }

  revalidatePath("/", "layout");
}