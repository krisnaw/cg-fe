"use client"
import {Item, ItemContent, ItemFooter, ItemHeader, ItemMedia, ItemSeparator, ItemTitle,} from "@/components/ui/item"
import {InputGroup, InputGroupAddon, InputGroupButton,} from "@/components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import {Empty, EmptyHeader, EmptyMedia, EmptyTitle,} from "@/components/ui/empty"
import {MessageCircleIcon} from "lucide-react";
import {useActionState} from "react";
import {ActionResponse} from "@/lib/types";
import type {BriefWithUsers} from "@/db/types/brief.types";

export function BriefDiscussionCard({brief}: { brief: BriefWithUsers }) {
  const [state, formAction, isPending] = useActionState<ActionResponse, FormData>(async (prevState: ActionResponse, formData: FormData) => {
    const payload = {
      briefId: formData.get("briefId") as string,
      message: formData.get("message") as string,
    }
    return {success: true, message: "success"}
  }, {
    success: false,
    message: ""
  })
  return (
    <Item variant="outline" className="shadow rounded-xl">
      <ItemHeader>
        <ItemTitle>Discussion</ItemTitle>
      </ItemHeader>
      <ItemMedia/>
      <ItemContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageCircleIcon/>
            </EmptyMedia>
            <EmptyTitle>No discussion found</EmptyTitle>
          </EmptyHeader>
        </Empty>

      </ItemContent>

      <ItemSeparator/>

      <ItemFooter>
        <form action={formAction}>
          <input type="hidden" name="briefId" value={brief.id} />
          <InputGroup>
            <TextareaAutosize
              name="message"
              data-slot="input-group-control"
              className="flex field-sizing-content min-h-8 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
              placeholder="Write a message..."
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton className="ml-auto" size="sm" variant="default">
                Send
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </ItemFooter>

    </Item>
  )
}
