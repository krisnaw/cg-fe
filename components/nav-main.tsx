"use client"

import {ChevronRight, type LucideIcon} from "lucide-react"
import {usePathname} from "next/navigation"

import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"


type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: NavSubItem[]
}

type NavSubItem = {
  title: string
  url: string
  isActive?: boolean
}

export function NavMain({items, organizationId}: { items: NavItem[], organizationId: string }) {
  const pathname = usePathname()

  const appendOrgId = (url: string) => {
    return url.replace(/^\/dashboard/, `/dashboard/${organizationId}`)
  }

  const isPathActive = (url: string) => {
    if (!pathname) {
      return false
    }

    return pathname === url || pathname.startsWith(`${url}/`)
  }

  const menu = items.map((item) => {
    const itemUrl = appendOrgId(item.url)
    const subItems = item.items?.map((subItem) => {
      const subItemUrl = appendOrgId(subItem.url)

      return {
        ...subItem,
        url: subItemUrl,
        isActive: isPathActive(subItemUrl),
      }
    })
    const hasActiveChild = subItems?.some((subItem) => subItem.isActive)

    return {
      ...item,
      url: itemUrl,
      items: subItems,
      isActive: hasActiveChild || isPathActive(itemUrl),
    }
  })

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Organization</SidebarGroupLabel>
      <SidebarMenu>
        {menu.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
