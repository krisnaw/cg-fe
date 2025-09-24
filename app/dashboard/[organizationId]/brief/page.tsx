import Link from "next/link"

import {Button} from "@/components/ui/button"
import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {getBriefByOrgId} from "@/db/query/brief.query";
import SearchInput from "@/app/dashboard/[organizationId]/brief/search-input";
import {BriefList} from "@/components/brief/brief-list";

type BriefProps = {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
   params: Promise<{ organizationId: string }>
}

export default async function Page({searchParams, params}: BriefProps) {
   const {organizationId} = await params

   const search = (await searchParams).search as string ?? ""
   const sort = (await searchParams).sort as string ?? "asc"
   const briefs = await getBriefByOrgId(organizationId, search, sort)

   return (
       <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
             <div className="space-y-1">
                <CardTitle>Briefs</CardTitle>
                <CardDescription>Newest requests appear first.</CardDescription>
             </div>
             <CardAction>
                <Button asChild>
                   <Link href={`/dashboard/${organizationId}/brief/create`}>Create brief</Link>
                </Button>
             </CardAction>
          </CardHeader>
          <CardContent className="space-y-6">
             <SearchInput />
             <BriefList briefs={briefs} organizationId={organizationId}/>
          </CardContent>
       </Card>
   )
}
