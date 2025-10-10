"use client"

import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {BriefWithUsers} from "@/db/types/brief.types";
import {ButtonGroup} from "@/components/ui/button-group";
import {ArrowRight, Pencil} from "lucide-react";
import Link from "next/link";
import {BriefStatusBadge} from "@/components/brief/brief-status-badge";
import {stripTags} from "@/lib/stripHTMLTag";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export function BriefItem({brief } : {brief: BriefWithUsers} ) {
  return (
    <Item variant="outline" className="rounded-xl">

      <ItemHeader className="border-b border-gray-200 pb-4 h-18 flex items-start">
        <ItemTitle className="text-lg font-medium">
          {brief.name}
        </ItemTitle>
        <ItemActions className="flex flex-col">
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm" asChild>
                  <Link href={`/dashboard/${brief.organizationId}/brief/${brief.id}/edit`}>
                    <Pencil />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit brief</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm" asChild>
                  <Link href={`/dashboard/${brief.organizationId}/brief/${brief.id}`}>
                    <ArrowRight />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View brief</TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </ItemActions>
      </ItemHeader>

      <ItemContent>
        <ItemDescription>
          {stripTags(brief.description)}
        </ItemDescription>
      </ItemContent>

      <ItemFooter className="flex justify-betweenn items-center">
        <ItemMedia>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar className="hidden sm:flex">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="hidden sm:flex">
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </ItemMedia>
        <BriefStatusBadge status={brief.status} />
      </ItemFooter>

    </Item>
  )
}
