import Link from "next/link";

import {TableCell, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {BriefStatusBadge} from "@/components/brief/brief-status-badge";
import {ButtonDeleteBrief} from "@/components/brief/button-delete-brief";
import {Button} from "@/components/ui/button";
import {ArrowRight, Pencil} from "lucide-react";
import {type BriefWithUsers} from "@/db/types/brief.types";
import LoadingIndicator from "@/components/loading-indicator";

export type BriefItemProps = {
  brief: BriefWithUsers
  organizationId: string
}

export function BriefItem({brief, organizationId}: BriefItemProps) {
  return (
    <TableRow>
      <TableCell>{brief.name}</TableCell>
      <TableCell>
        <div className="flex -space-x-2 overflow-hidden">
          <Tooltip>
            <TooltipTrigger>
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={brief.managerUser?.image ?? ""}
                className="inline-block size-10 rounded-full outline -outline-offset-1 outline-black/5 ring-2 ring-white"
              />
            </TooltipTrigger>
            <TooltipContent>
              Manager: {brief.managerUser?.name ?? ""}
            </TooltipContent>
          </Tooltip>

          {brief.writerUser && (
            <Tooltip>
              <TooltipTrigger>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={brief.writerUser.image ?? ""}
                  className="inline-block size-10 rounded-full outline -outline-offset-1 outline-black/5 ring-2 ring-white"
                />
              </TooltipTrigger>
              <TooltipContent>
                Writer: {brief.writerUser?.name ?? ""}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TableCell>
      <TableCell>
        <BriefStatusBadge status={brief.status}/>
      </TableCell>
      <TableCell>{brief.dueDate?.toDateString?.() ?? "-"}</TableCell>
      <TableCell className="text-right">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonDeleteBrief briefId={brief.id}/>
            </TooltipTrigger>
            <TooltipContent>Delete brief</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size="icon">
                <Link href={`/dashboard/${organizationId}/brief/${brief.id}/edit`}>
                  <Pencil />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit brief</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link href={`/dashboard/${organizationId}/brief/${brief.id}`}>
                   <LoadingIndicator><ArrowRight/></LoadingIndicator>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View brief</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  )
}
