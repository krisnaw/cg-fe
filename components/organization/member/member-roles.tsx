"use client"

import * as React from "react"

import {Button} from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {memberUpdateRole} from "@/app/action/member/member.update.action";
import {Ellipsis} from "lucide-react";
import {Badge} from "@/components/ui/badge";

type MemberRolesProps = {
  memberId: string
  organizationId: string
  roles: string
}

export function MemberRoles({memberId, organizationId, roles}: MemberRolesProps) {
  const rolesOptions = roles.split(",")
  const onCheckedChangeHandler = async (role: string) => {
    if (rolesOptions.includes(role)) {
      rolesOptions.splice(rolesOptions.indexOf(role), 1)
    } else {
      rolesOptions.push(role)
    }
    rolesOptions.sort()
    await memberUpdateRole(memberId, organizationId, rolesOptions)
  }


  // TODO: Use action state
  return (
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          {rolesOptions.map((role) => (
              <Badge key={role} variant="outline" className="uppercase">{role}</Badge>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
               <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Manager member roles</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuCheckboxItem checked={rolesOptions.includes("manager")}
                                      onCheckedChange={() => onCheckedChangeHandler("manager")}>
              Manager
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={rolesOptions.includes("writer")}
                                      onCheckedChange={() => onCheckedChangeHandler("writer")}>
              Writer
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  )
}
