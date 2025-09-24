import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {getBriefStatusLabel, getBriefStatusText} from "@/lib/brief-status";

type BriefStatusBadgeProps = {
  status: string
}

export function BriefStatusBadge({status}: BriefStatusBadgeProps) {
  const label = getBriefStatusLabel(status) ?? "border-slate-200 bg-slate-50 text-slate-600"

  return (
    <Badge className={cn("capitalize", label)}>
      {getBriefStatusText(status)}
    </Badge>
  )
}
