import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle,} from "@/components/ui/item"
import {BriefWithUsers} from "@/db/types/brief.types";
import {ButtonGroup} from "@/components/ui/button-group";
import {ArrowRight, Pencil} from "lucide-react";
import {BriefStatusBadge} from "@/components/brief/brief-status-badge";
import Link from "next/link";

export function BriefItem({brief } : {brief: BriefWithUsers} ) {
  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>
          {brief.name}
          <BriefStatusBadge status={brief.status} />
        </ItemTitle>
        <ItemDescription dangerouslySetInnerHTML={{ __html: brief.description }} />
      </ItemContent>
      <ItemActions>
        <ButtonGroup>
          <Button variant="outline" size="icon-sm" asChild>
            <Link href={`/dashboard/${brief.organizationId}/brief/${brief.id}`}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="outline" size="icon-sm" asChild>
            <Link href={`/dashboard/${brief.organizationId}/brief/${brief.id}`}>
              <ArrowRight />
            </Link>
          </Button>
        </ButtonGroup>
      </ItemActions>
      <ItemFooter>
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
      </ItemFooter>

    </Item>
  )
}
