"use client"

import {Button} from "@/components/ui/button"
import {Trash} from "lucide-react";
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle,} from "@/components/ui/item"

type DeleteBriefFormProps = {
  briefId: number
}

export function DeleteBriefForm({briefId}: DeleteBriefFormProps) {
  return (
    <form>
      <input type="hidden" name="briefId" value={briefId}/>
      <Item variant="outline" className="border-destructive max-w-xl">
        <ItemContent>
          <ItemTitle className="text-destructive">Delete brief</ItemTitle>
          <ItemDescription className="text-destructive">
            Remove this brief permanently. This action cannot be undone.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="destructive" type="submit">
            <Trash/>
            Delete brief
          </Button>
        </ItemActions>
      </Item>

    </form>
  )
}
