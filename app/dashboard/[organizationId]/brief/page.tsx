import {getBriefByOrgId} from "@/db/query/brief.query";
import SearchInput from "@/app/dashboard/[organizationId]/brief/search-input";
import {Suspense} from "react";
import {ItemGroup} from "@/components/ui/item";
import {BriefItem} from "@/components/brief/brief-item";

type BriefProps = {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
   params: Promise<{ organizationId: string }>
}

export default async function Page({searchParams, params}: BriefProps) {
   const {organizationId} = await params

   const search = (await searchParams).search as string ?? ""
   const sort = (await searchParams).sort as string ?? "asc"
   const status = (await searchParams).status as string | undefined
   const briefs = await getBriefByOrgId(organizationId, search, sort, status)

   return (
     <div className="space-y-6">
       <SearchInput />
       <Suspense fallback={<div>Loading...</div>}>
         <ItemGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {briefs.map((brief) => (
             <BriefItem key={brief.id} brief={brief} />
           ))}
         </ItemGroup>
       </Suspense>

     </div>
   )
}
