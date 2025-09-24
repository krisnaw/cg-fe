"use client"

import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Trash} from "lucide-react";

type DeleteBriefFormProps = {
   briefId: number
}

export function DeleteBriefForm({briefId}: DeleteBriefFormProps) {
   return (
       <form>
          <input type="hidden" name="briefId" value={briefId}/>
          <Card className="border-destructive">
             <CardHeader >
                <CardTitle className="text-destructive">Delete brief</CardTitle>
                <CardDescription className="text-destructive">
                   Remove this brief permanently. This action cannot be undone.
                </CardDescription>
                <CardAction>
                   <Button variant="destructive" type="submit">
                      <Trash />
                      Delete brief
                   </Button>
                </CardAction>
             </CardHeader>
          </Card>
       </form>
   )
}
