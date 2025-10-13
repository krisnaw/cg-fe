"use client"

import {useActionState} from "react";
import TextareaAutosize from "react-textarea-autosize";
import {toast} from "sonner";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import {InputGroup, InputGroupAddon, InputGroupButton,} from "@/components/ui/input-group"
import {ActionResponse, initialState, SessionUserType} from "@/lib/types";
import type {BriefWithUsers} from "@/db/types/brief.types";
import {deleteDiscussion, store} from "@/app/action/brief-discussion/brief-discussion.create.action";
import {Spinner} from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {BriefDiscussionWithUser} from "@/db/types/brief-discussion.types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function BriefDiscussionCard({brief, discussions, user}: { brief: BriefWithUsers, discussions: BriefDiscussionWithUser[], user: SessionUserType }) {
  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_: ActionResponse, formData: FormData) => {
    const payload = {
      message: formData.get("message") as string,
      briefId: Number(formData.get("briefId")),
      userId: formData.get("userId") as string,
    }
    const result = await store(payload);
    if (!result.success) {
      toast.error(result.message);
    }
    toast.success(result.message);
    return result;
  }, initialState)

  return (
    <Item variant="outline" className="shadow rounded-xl">
      <ItemHeader>
        <ItemTitle>Discussion</ItemTitle>
      </ItemHeader>

      <ItemContent>

        <ItemGroup>
          {discussions.map((message) => (
            <Item key={message.id}>
              {message.user?.image ? (
                <ItemMedia>
                  <Avatar>
                    <AvatarImage src={message.user.image} alt={message.user.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </ItemMedia>
              ) : null}

              <ItemContent className="gap-1">
                <ItemTitle>{message.user?.name}</ItemTitle>
                <ItemDescription>
                  {message.message}
                </ItemDescription>
              </ItemContent>
              <ItemActions className="flex">
                <ItemDescription>{message.createdAt.toLocaleDateString()}</ItemDescription>
                {user.id == message.userId ?
                  (
                    <Button
                      onClick={() => deleteDiscussion(message.id)}
                      variant="ghost" size="icon-sm" className="rounded-full text-destructive">
                      <TrashIcon />
                    </Button>
                  ) : null}
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>


      </ItemContent>

      <ItemSeparator/>

      <ItemFooter>
        <form action={formAction} className="w-full">
          <input type="hidden" name="briefId" value={brief.id}/>
          <input type="hidden" name="userId" value={user.id}/>
          <InputGroup>
            <TextareaAutosize
              name="message"
              data-slot="input-group-control"
              className="flex field-sizing-content min-h-8 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
              placeholder="Write a message..."
              minRows={3}
              required
              disabled={isPending}
            />
            <InputGroupAddon align="block-end" className="border-t border-gray-200">
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
