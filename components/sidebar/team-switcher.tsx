"use client"

import * as React from "react"
import {AudioWaveform, ChevronsUpDown} from "lucide-react"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,} from "@/components/ui/sidebar"
import {setActiveOrgAction} from "@/app/action/auth/set-active-org.action";
import {OrganizationType} from "@/lib/types";

export function TeamSwitcher({organizationId, organizations}: { organizationId: string | undefined, organizations: OrganizationType[] }) {
   const {isMobile} = useSidebar()
   const activeTeam = organizations?.find((item) => item.id === organizationId)

   return (
       <SidebarMenu>
          <SidebarMenuItem>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                         <AudioWaveform className="size-4"/>
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                     {activeTeam ? activeTeam.name : "Select Organization"}
                  </span>
                      </div>
                      <ChevronsUpDown className="ml-auto"/>
                   </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    align="start"
                    side={isMobile ? "bottom" : "right"}
                    sideOffset={4}
                >
                   <DropdownMenuLabel className="text-muted-foreground text-xs">
                      Organizations
                   </DropdownMenuLabel>
                   {organizations?.map((org) => (
                       <DropdownMenuItem key={org.id} onClick={async () => {
                          await setActiveOrgAction(org.id)
                       }} className="gap-2 p-2">
                          <div className="flex size-6 items-center justify-center rounded-md border">
                             <AudioWaveform className="size-3.5 shrink-0"/>
                          </div>
                          {org.name}
                       </DropdownMenuItem>
                   ))}
                </DropdownMenuContent>
             </DropdownMenu>
          </SidebarMenuItem>
       </SidebarMenu>
   )
}
