import {AppSidebar} from "@/components/app-sidebar"
import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import React from "react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function Layout({children}: Readonly<{ children: React.ReactNode; }>) {
   const session = await auth.api.getSession({
      headers: await headers()
   })

   if (!session) {
      return redirect("/login")
   }

   const organizations = await auth.api.listOrganizations({
      // This endpoint requires session cookies.
      headers: await headers(),
   });

   return (
       <SidebarProvider>
          <AppSidebar
              organizations={organizations}
              organizationId={session?.session.activeOrganizationId ?? ""}
              user={session?.user ?? null}
          />
          <SidebarInset>
             <header className="flex h-16 shrink-0 justify-between items-center gap-2">
                <div>
                   <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1"/>
                      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
                   </div>
                </div>
                <div className="pr-4">
                </div>
             </header>
             <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div>
                   {children}
                </div>
             </div>
          </SidebarInset>
       </SidebarProvider>
   )
}
