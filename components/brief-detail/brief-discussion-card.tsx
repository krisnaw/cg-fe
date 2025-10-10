"use client"
import {Item, ItemContent, ItemFooter, ItemHeader, ItemMedia, ItemSeparator, ItemTitle,} from "@/components/ui/item"
import {InputGroup, InputGroupAddon, InputGroupButton,} from "@/components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize"
import {Empty, EmptyHeader, EmptyMedia, EmptyTitle,} from "@/components/ui/empty"
import {MessageCircleIcon} from "lucide-react";

export function BriefDiscussionCard() {
   return (
     <Item variant="outline" className="shadow rounded-xl">
       <ItemHeader>
         <ItemTitle>Discussion</ItemTitle>
       </ItemHeader>
       <ItemMedia />
       <ItemContent>
         <Empty>
           <EmptyHeader>
             <EmptyMedia variant="icon">
               <MessageCircleIcon />
             </EmptyMedia>
             <EmptyTitle>No discussion found</EmptyTitle>
           </EmptyHeader>
         </Empty>

       </ItemContent>

       <ItemSeparator />

       <ItemFooter>
         <InputGroup>
           <TextareaAutosize
             data-slot="input-group-control"
             className="flex field-sizing-content min-h-8 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
             placeholder="Autoresize textarea..."
           />
           <InputGroupAddon align="block-end">
             <InputGroupButton className="ml-auto" size="sm" variant="default">
               Send
             </InputGroupButton>
           </InputGroupAddon>
         </InputGroup>
       </ItemFooter>

     </Item>
   )
}
