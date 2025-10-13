"use client"

import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {getBriefStatusLabel, getBriefStatusText} from "@/lib/brief-status";
import {useRouter} from "next/navigation";
import {useRealtime} from "@upstash/realtime/client";
import {RealtimeEvents} from "@/lib/realtime";

type BriefStatusBadgeProps = {
  status: string
}

export function BriefStatusBadge({status}: BriefStatusBadgeProps) {
  const router = useRouter()

  useRealtime<RealtimeEvents>({
    events: {
      notification: {
        alert: (data) => {
          console.log(data)
          router.refresh()
        },
      },
    },
  })

  const label = getBriefStatusLabel(status) ?? "border-slate-200 bg-slate-50 text-slate-600"

  return (
    <Badge className={cn("capitalize", label)}>
      {getBriefStatusText(status)}
    </Badge>
  )
}
