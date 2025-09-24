"use server"
import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export async function setActiveOrgAction(organizationId: string) {
   await auth.api.setActiveOrganization({
    body: {
      organizationId: organizationId,
    },
    headers: await headers(),
  });
  revalidatePath("/", "layout");

  const referer = (await headers()).get("referer") ?? null;

  if (!referer) {
     redirect(`/dashboard/${organizationId}`)
  }

  redirect(referer)
}