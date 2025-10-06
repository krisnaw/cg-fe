import {getBriefByOrgId} from "@/db/query/brief.query";
import {BriefItem} from "@/components/brief/brief-item";
import {ItemGroup} from "@/components/ui/item";
import SearchInput from "@/app/dashboard/[organizationId]/brief/search-input";

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
       <ItemGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         {briefs.map((brief) => (
           <BriefItem key={brief.id} brief={brief} />
         ))}
       </ItemGroup>
     </div>
   )
}
