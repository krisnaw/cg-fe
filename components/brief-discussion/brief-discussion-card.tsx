"use client"

import {useActionState, useRef} from "react";
import {MessageCircleIcon} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import {toast} from "sonner";

import {Item, ItemContent, ItemFooter, ItemHeader, ItemMedia, ItemSeparator, ItemTitle,} from "@/components/ui/item"
import {InputGroup, InputGroupAddon, InputGroupButton,} from "@/components/ui/input-group"
import {Empty, EmptyHeader, EmptyMedia, EmptyTitle,} from "@/components/ui/empty"
import {ActionResponse} from "@/lib/types";
import type {BriefWithUsers} from "@/db/types/brief.types";
import {store} from "@/app/action/brief-discussion/brief-discussion.create.action";
import {Spinner} from "@/components/ui/spinner";

const initialState: ActionResponse = {
  success: false,
  message: "",
}

export function BriefDiscussionCard({brief}: { brief: BriefWithUsers }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_: ActionResponse, formData: FormData) => {
    const payload = {
      message: formData.get("message") as string,
      briefId: formData.get("briefId") as string,
    }
    const result = await store(formData);

    if (!result.success) {
      toast.error(result.message);
      return result;
    }

    toast.success(result.message);
    formRef.current?.reset();
    return result;
  }, initialState)

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
        <form ref={formRef} action={formAction} className="w-full">
          <input type="hidden" name="briefId" value={brief.id}/>
          <InputGroup>
            <TextareaAutosize
              name="message"
              data-slot="input-group-control"
              className="flex field-sizing-content min-h-8 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
              placeholder="Write a message..."
              minRows={1}
              required
              disabled={isPending}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton type="submit" className="ml-auto" size="sm" variant="default" disabled={isPending}>
                Send
                {isPending && <Spinner className="ml-2 size-3.5"/>}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </ItemFooter>

    </Item>
  )
}
