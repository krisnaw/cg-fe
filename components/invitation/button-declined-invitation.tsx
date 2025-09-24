"use client"
import {Button} from "@/components/ui/button";
import {declineInvitation} from "@/app/action/invitation/invitation.action";
import {useActionState} from "react";
import {ActionResponse} from "@/lib/types";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function ButtonDeclinedInvitation({invitationId}: { invitationId: string }) {
  const router = useRouter()
  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData: FormData) => {
    const submitData = {
      invitationId: formData.get("invitationId") as string,
    }
    const res = await declineInvitation(submitData)
    if (!res.success) {
      toast.error(res.message)
    }
    toast.success(res.message)
    router.push("/dashboard")
    return res
  }, {
    success: false,
    message: ""
  })

  return (
      <form action={formAction}>
        <input type="hidden" name="invitationId" value={invitationId} />
        <Button disabled={isPending} variant="destructive">Decline</Button>
      </form>
  )
}