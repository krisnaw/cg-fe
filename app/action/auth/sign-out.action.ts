"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export async function signOutAction(): Promise<void> {
   await auth.api.signOut({
      headers: await headers(),
   });
   redirect("/login")
}
