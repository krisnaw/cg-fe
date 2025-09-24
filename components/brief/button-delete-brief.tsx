"use client"
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {deleteBrief} from "@/app/action/brief/brief.detele.action";

export function ButtonDeleteBrief({briefId}: { briefId: number }) {
   const onSubmitHandler = async () => {
      await deleteBrief(briefId)
   }
   return (
       <form onSubmit={onSubmitHandler}>
          <input type="hidden" name="briefId" value={briefId}/>
          <Button variant="destructive" size="icon" type="submit"><Trash/></Button>
       </form>
   )
}