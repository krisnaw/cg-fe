"use client"

import {useActionState, useState} from "react"
import {Loader2} from "lucide-react"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import {briefSubmitAction} from "@/app/action/brief/brief.submit.action"
import {ActionResponse} from "@/lib/types"

type SubmitDraftProps = {
   briefId: number
   draftUrl?: string | null
}

const initialState: ActionResponse = {
   success: false,
   message: "",
}

export function SubmitDraft({briefId, draftUrl}: SubmitDraftProps) {
   const router = useRouter()
   const [open, setOpen] = useState(false)
   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData) => {
      const result = await briefSubmitAction(formData)

      if (result.success) {
         toast.success(result.message)
         setOpen(false)
         router.refresh()
      } else {
         toast.error(result.message)
      }

      return result
   }, initialState)

   return (
       <Dialog open={open} onOpenChange={(value) => !isPending && setOpen(value)}>
          <DialogTrigger asChild>
             <Button type="button">Submit Draft</Button>
          </DialogTrigger>
          <DialogContent>
             <form action={formAction} className="space-y-4">
                <input type="hidden" name="briefId" value={briefId}/>
                <DialogHeader>
                   <DialogTitle>Submit Draft</DialogTitle>
                   <DialogDescription>
                      Share the draft with stakeholders to kick off review and gather feedback.
                   </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                   <Label htmlFor="draftUrl">Draft URL</Label>
                   <Input
                       id="draftUrl"
                       name="draftUrl"
                       type="url"
                       placeholder="https://"
                       defaultValue={draftUrl ?? ""}
                       required
                       disabled={isPending}
                   />
                </div>
                <DialogFooter>
                   <DialogClose asChild>
                      <Button type="button" variant="outline" disabled={isPending}>
                         Cancel
                      </Button>
                   </DialogClose>
                   <Button type="submit" disabled={isPending}>
                      Submit Draft
                      {isPending ? <Loader2 className="ml-2 size-4 animate-spin"/> : null}
                   </Button>
                </DialogFooter>
             </form>
          </DialogContent>
       </Dialog>
   )
}
