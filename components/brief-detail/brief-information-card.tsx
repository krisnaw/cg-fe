"use client"
import {Item, ItemContent, ItemFooter, ItemHeader, ItemTitle} from "@/components/ui/item";
import {BriefStatusBadge} from "@/components/brief/brief-status-badge"
import {ButtonClose} from "@/components/brief-action/button-close"
import {ButtonRequestRevision} from "@/components/brief-action/button-request-revision"
import {ButtonResubmit} from "@/components/brief-action/button-resubmit"
import {SubmitDraft} from "@/components/brief-action/submit-draft"
import type {BriefWithUsers} from "@/db/types/brief.types"
import {BRIEF_STATUS} from "@/lib/brief-status";
import {CalendarDays, Pilcrow, RefreshCcw} from "lucide-react";

export function BriefInformationCard({brief}: { brief: BriefWithUsers }) {
  return (
    <Item variant="muted" className="shadow rounded-xl">
      <ItemHeader>
        <ItemTitle> Brief Information</ItemTitle>
      </ItemHeader>

      <ItemContent>
        <div className="grid gap-2.5">
          <div className="w-full inline-flex items-center gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Due date</span>
              <CalendarDays size={18} className="text-muted-foreground" />
            </dt>
            <dd className="text-sm/6 text-gray-500 font-medium">
              {brief.dueDate.toDateString()}
            </dd>
          </div>

          <div className=" w-full inline-flex items-center gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <RefreshCcw size={18} className="text-muted-foreground" />
            </dt>
            <dd className="text-sm/6">
              <BriefStatusBadge status={brief.status} briefId={brief.id}/>
            </dd>
          </div>

          <div className=" w-full inline-flex items-center gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Word count</span>
              <Pilcrow size={18} className="text-muted-foreground" />
            </dt>
            <dd className="text-sm/6 text-gray-500">{brief.wordCount}</dd>
          </div>
        </div>
      </ItemContent>

      <ItemFooter>
        {brief.status === BRIEF_STATUS.PROGRESS && (
          <>
            <SubmitDraft briefId={brief.id} draftUrl={brief.draftURL} />
          </>
        )}
        {brief.status === BRIEF_STATUS.REQUEST_REVISION && (
          <>
            <ButtonResubmit briefId={brief.id}  />
          </>
        )}
        {(brief.status == BRIEF_STATUS.SUBMITTED || brief.status === BRIEF_STATUS.RESUBMITTED) && (
          <>
            <ButtonClose briefId={brief.id} />
            <ButtonRequestRevision briefId={brief.id} />
          </>
        )}
      </ItemFooter>

    </Item>
  )
}
