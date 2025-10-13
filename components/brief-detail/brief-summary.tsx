import {Item, ItemActions, ItemContent, ItemHeader, ItemTitle} from "@/components/ui/item";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Pencil} from "lucide-react";
import type {BriefWithUsers} from "@/db/types/brief.types";

export function BriefSummary({organizationId, brief}: { organizationId: string, brief: BriefWithUsers }) {
  return (
    <Item variant="outline" className="shadow rounded-xl">

      <ItemHeader className="border-b border-gray-200 pb-4">
        <ItemTitle className="text-xl font-medium">
          {brief.name}
        </ItemTitle>
        <ItemActions>
          <Button variant="outline" size="icon-sm" asChild>
            <Link href={`/dashboard/${organizationId}/brief/${brief.id}/edit`}>
              <Pencil/>
            </Link>
          </Button>
        </ItemActions>
      </ItemHeader>

      <ItemContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{__html: brief.description}}></div>
        </div>
      </ItemContent>

    </Item>
  )
}