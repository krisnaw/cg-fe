"use client"

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {BriefStatusBadge} from "@/components/brief/brief-status-badge"
import {ButtonClose} from "@/components/brief/button-close"
import {ButtonRequestRevision} from "@/components/brief/button-request-revision"
import {ButtonResubmit} from "@/components/brief/button-resubmit"
import {SubmitDraft} from "@/components/brief/submit-draft"
import type {BriefWithUsers} from "@/db/types/brief.types"
import {BRIEF_STATUS} from "@/lib/brief-status";

export type BriefInformationCardProps = {
  brief: BriefWithUsers
}

export function BriefInformationCard({brief}: BriefInformationCardProps) {
  const dueDateValue = brief.dueDate
  const dueDate = dueDateValue
    ? dueDateValue instanceof Date
      ? dueDateValue
      : new Date(dueDateValue)
    : null
  const dueDateText = dueDate ? dueDate.toLocaleDateString() : "-"
  const dueDateIso = dueDate ? dueDate.toISOString() : undefined
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Brief Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-none gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Budget</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                 className="h-6 w-5 text-gray-400">
              <path
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </dt>
          <dd className="text-sm/6 font-medium text-gray-900">
            {brief.currency}{brief.price}
          </dd>
        </div>

        <div className="mt-4 flex w-full flex-none gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Due date</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                 className="h-6 w-5 text-gray-400">
              <path
                d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z"
              />
              <path
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </dt>
          <dd className="text-sm/6 text-gray-500">
            {dueDateIso ? (
              <time dateTime={dueDateIso}>{dueDateText}</time>
            ) : (
              dueDateText
            )}
          </dd>
        </div>

        <div className="mt-4 flex w-full flex-none gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Status</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                 className="h-6 w-5 text-gray-400">
              <path
                d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </dt>
          <dd className="text-sm/6">
            <BriefStatusBadge status={brief.status}/>
          </dd>
        </div>

        <div className="mt-4 flex w-full flex-none gap-x-4">
          <dt className="flex-none">
            <span className="sr-only">Word count</span>
            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true"
                 className="h-6 w-5 text-gray-400">
              <path
                d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </dt>
          <dd className="text-sm/6 text-gray-500">{brief.wordCount}</dd>
        </div>
      </CardContent>
      <CardFooter>
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
         {brief.status === BRIEF_STATUS.SUBMITTED || brief.status === BRIEF_STATUS.RESUBMITTED && (
             <>
                <ButtonClose briefId={brief.id} />
                <ButtonRequestRevision briefId={brief.id} />
             </>
         )}
      </CardFooter>
    </Card>
  )
}
