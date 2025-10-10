import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {BriefWithUsers} from "@/db/types/brief.types";
import {Item, ItemContent, ItemHeader, ItemTitle,} from "@/components/ui/item"

interface BriefAssignedCardProps {
  brief: BriefWithUsers
}

export function BriefAssignedCard({brief}: BriefAssignedCardProps) {
  return (
    <Item variant="outline" className="shadow rounded-xl">

      <ItemHeader>
        <ItemTitle>Assigned</ItemTitle>
      </ItemHeader>

      <ItemContent className="grid gap-6">
        {brief.managerUser && (
          <div className="flex items-center gap-4">
            <Avatar className="border">
              <AvatarImage src={brief.managerUser?.image ?? ""} alt="Image"/>
              <AvatarFallback>{brief.managerUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm leading-none font-medium">
                {brief.managerUser?.name}
              </p>
              <p className="text-muted-foreground text-xs">Manager</p>
            </div>
          </div>
        )}

        {brief.writerUser && (
          <div className="flex items-center gap-4">
            <Avatar className="border">
              <AvatarImage src={brief.writerUser?.image ?? ""} alt="Image"/>
              <AvatarFallback>{brief.writerUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm leading-none font-medium">
                {brief.writerUser?.name}
              </p>
              <p className="text-muted-foreground text-xs">Writer</p>
            </div>
          </div>
        )}
      </ItemContent>

    </Item>
  )
}
