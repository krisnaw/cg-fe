"use client"

import {FormEvent, useTransition} from "react";
import {useParams, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button"
import {Trash} from "lucide-react";
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle,} from "@/components/ui/item"
import {deleteBrief} from "@/app/action/brief/brief.detele.action";

type DeleteBriefFormProps = {
  briefId: number
}

export function DeleteBriefForm({briefId}: DeleteBriefFormProps) {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      await deleteBrief(briefId);
      const organizationId = params?.organizationId as string | undefined;
      if (organizationId) {
        router.push(`/dashboard/${organizationId}/brief`);
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="briefId" value={briefId}/>
      <Item variant="outline" className="border-destructive">
        <ItemContent>
          <ItemTitle className="text-destructive">Delete brief</ItemTitle>
          <ItemDescription className="text-destructive">
            Remove this brief permanently. This action cannot be undone.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="destructive" type="submit" disabled={isPending} aria-busy={isPending}>
            <Trash/>
            Delete brief
          </Button>
        </ItemActions>
      </Item>

    </form>
  )
}
