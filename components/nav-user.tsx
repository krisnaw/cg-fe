"use client"

import * as React from "react"
import {BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles} from "lucide-react"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import Link from "next/link";
import {signOutAction} from "@/app/action/auth/sign-out.action";
import {toast} from "sonner";

export type NavUserPayload = {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
}

type NavUserProps = {
  user?: NavUserPayload | null
}

const getInitials = (value?: string | null) => {
  if (!value) {
    return "CN"
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return "CN"
  }

  const parts = trimmed.split(" ").filter(Boolean)
  if (parts.length === 0) {
    return "CN"
  }

  const initials = parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  return initials || "CN"
}

export function NavUser({user}: NavUserProps) {
  const {isMobile} = useSidebar()
  const [isPending, startTransition] = React.useTransition()


  const displayUser = user ?? null
  const avatarFallback = React.useMemo(() => getInitials(displayUser?.name), [displayUser?.name])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              disabled={!displayUser}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={displayUser?.image ?? ""} alt={displayUser?.name ?? "User avatar"} />
                <AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayUser?.name}</span>
                <span className="truncate text-xs">{displayUser?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={displayUser?.image ?? ""} alt={displayUser?.name ?? "User avatar"} />
                  <AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayUser?.name}</span>
                  <span className="truncate text-xs">{displayUser?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/dashboard/account" className="flex items-center gap-2">
                  <BadgeCheck />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault()
                 signOutAction().then(r => toast.success("Logged out successfully"))
              }}
            >
              <LogOut className="mr-2" />
               Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
