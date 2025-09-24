"use client"
import React, {ComponentProps} from "react"
import {BookOpen, Bot, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal,} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavProjects} from "@/components/nav-projects"
import {NavSecondary} from "@/components/nav-secondary"
import {NavUser} from "@/components/nav-user"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader,} from "@/components/ui/sidebar"
import {TeamSwitcher} from "@/components/sidebar/team-switcher"
import {Separator} from "@/components/ui/separator";
import {OrganizationType} from "@/lib/types";

const data = {
   navMain: [
      {
         title: "Brief",
         url: "/dashboard/brief",
         icon: SquareTerminal,
         isActive: true,
         items: [
            {
               title: "List",
               url: "/dashboard/brief",
            },
            {
               title: "Create",
               url: "/dashboard/brief/create",
            },
            {
               title: "Settings",
               url: "#",
            },
         ],
      },
      {
         title: "Pitch request",
         url: "#",
         icon: Bot,
         items: [
            {
               title: "List",
               url: "/dashboard/pitch-request",
            },
            {
               title: "Explorer",
               url: "#",
            },
            {
               title: "Quantum",
               url: "#",
            },
         ],
      },
      {
         title: "Organization",
         url: "/dashboard/organization/member",
         icon: BookOpen,
         items: [
            {
               title: "Members",
               url: "/dashboard/organization/member",
            },

            {
               title: "Settings",
               url: "/dashboard/organization/settings",
            },
         ],
      },
      {
         title: "Settings",
         url: "#",
         icon: Settings2,
         items: [
            {
               title: "Brief Default",
               url: "/dashboard/settings/brief-default",
            },
            {
               title: "Payment",
               url: "/dashboard/settings/payment",
            },
            {
               title: "Billing",
               url: "#",
            },
            {
               title: "Limits",
               url: "#",
            },
         ],
      },
   ],
   navSecondary: [
      {
         title: "Support",
         url: "/dashboard/chat",
         icon: LifeBuoy,
      },
      {
         title: "Feedback",
         url: "#",
         icon: Send,
      },
   ],
   projects: [
      {
         name: "Portfolio",
         url: "#",
         icon: Frame,
      },
      {
         name: "Sales & Marketing",
         url: "#",
         icon: PieChart,
      },
      {
         name: "Travel",
         url: "#",
         icon: Map,
      },
   ],
}

type AppSidebarUser = {
   id?: string | null
   name?: string | null
   email?: string | null
   image?: string | null
}

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
   organizationId?: string
   user?: AppSidebarUser | null
   organizations: OrganizationType[]
}

export function AppSidebar({organizationId, user, organizations, ...props}: AppSidebarProps) {
   return (
       <Sidebar variant="inset" {...props}>
          <SidebarHeader>
             <TeamSwitcher organizationId={organizationId} organizations={organizations}/>
          </SidebarHeader>
          <Separator orientation="horizontal"/>
          <SidebarContent>

             {organizationId && <NavMain organizationId={organizationId} items={data.navMain}/>}

             <NavProjects projects={data.projects}/>

             <NavSecondary items={data.navSecondary} className="mt-auto"/>

          </SidebarContent>
          <Separator orientation="horizontal"/>
          <SidebarFooter>
             <NavUser user={user}/>
          </SidebarFooter>
       </Sidebar>
   )
}
