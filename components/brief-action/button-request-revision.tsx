"use client"

import {useTransition} from "react"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import {updateBriefStatus} from "@/app/action/brief/brief.status.action"
import {BRIEF_STATUS} from "@/lib/brief-status";
import {Spinner} from "@/components/ui/spinner";

type ButtonRequestRevisionProps = {
   briefId: number
}

export function ButtonRequestRevision({briefId}: ButtonRequestRevisionProps) {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()

   const handleClick = () => {
      startTransition(async () => {
         const result = await updateBriefStatus({briefId, status: BRIEF_STATUS.REQUEST_REVISION})

         if (!result.success) {
            toast.error(result.message)
            return
         }

         toast.success(result.message)
         router.refresh()
      })
   }

   return (
       <Button type="button" variant="outline" onClick={handleClick} disabled={isPending}>
          Request Revision {isPending ? <Spinner /> : null}
       </Button>
   )
}

