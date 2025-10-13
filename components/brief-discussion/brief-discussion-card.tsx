"use client"

import {useActionState, useRef, useState} from "react";
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
import {ActionResponse, SessionUserType} from "@/lib/types";
import type {BriefWithUsers} from "@/db/types/brief.types";
import {store} from "@/app/action/brief-discussion/brief-discussion.create.action";
import {Spinner} from "@/components/ui/spinner";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";

const initialState: ActionResponse = {
  success: false,
  message: "",
}



export function BriefDiscussionCard({brief, user}: { brief: BriefWithUsers, user: SessionUserType }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_: ActionResponse, formData: FormData) => {
    const payload = {
      message: formData.get("message") as string,
      briefId: Number(formData.get("briefId")),
      userId: formData.get("userId") as string,
    }
    const result = await store(payload);

    if (!result.success) {
      toast.error(result.message);
      return result;
    }

    toast.success(result.message);
    formRef.current?.reset();
    return result;
  }, initialState)


  const [messages, setMessages] = useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
    },
  ])

  return (
    <Item variant="outline" className="shadow rounded-xl">

      <ItemHeader>
        <ItemTitle>Discussion</ItemTitle>
      </ItemHeader>

      <ItemContent>

        <ItemGroup>
          {messages.map((message, index) => (
            <Item key={index}>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>Username</ItemTitle>
                <ItemDescription>
                  {message.content}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <TrashIcon />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>


      </ItemContent>

      <ItemSeparator/>

      <ItemFooter>
        <form ref={formRef} action={formAction} className="w-full">
          <input type="hidden" name="briefId" value={brief.id}/>
          <input type="hidden" name="userId" value={user.id}/>
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
