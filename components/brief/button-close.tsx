"use client"

import {useTransition} from "react"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

import {Button} from "@/components/ui/button"
import {closeBrief} from "@/app/action/brief/brief.status.action"

type ButtonCloseProps = {
   briefId: number
}

export function ButtonClose({briefId}: ButtonCloseProps) {
   const router = useRouter()
   const [isPending, startTransition] = useTransition()

   const handleClick = () => {
      startTransition(async () => {
         const result = await closeBrief({briefId})

         if (!result.success) {
            toast.error(result.message)
            return
         }

         toast.success(result.message)
         router.refresh()
      })
   }

   return (
       <Button type="button" variant="destructive" disabled={isPending} onClick={handleClick}>
          Close Brief
       </Button>
   )
}

