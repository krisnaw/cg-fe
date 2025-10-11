import {getBriefByOrgId} from "@/db/query/brief.query";
import SearchInput from "@/app/dashboard/[organizationId]/brief/search-input";
import {Suspense} from "react";
import {ItemGroup} from "@/components/ui/item";
import {BriefItem} from "@/components/brief/brief-item";
import {Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle,} from "@/components/ui/empty"
import {InboxIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type BriefProps = {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
   params: Promise<{ organizationId: string }>
}

export default async function Page({searchParams, params}: BriefProps) {
   const {organizationId} = await params

   const search = (await searchParams).search as string ?? ""
   const sort = (await searchParams).sort as string ?? "asc"
   const status = (await searchParams).status as string | undefined
   const briefs = await getBriefByOrgId(organizationId, search, sort, status);

   return (
     <div>
       <SearchInput />

       {briefs.length === 0 && (
         <Empty>
           <EmptyMedia variant="icon">
             <InboxIcon />
           </EmptyMedia>
           <EmptyTitle>No briefs</EmptyTitle>
           <EmptyDescription>Get started by creating new briefs</EmptyDescription>
           <EmptyContent>
             <Button asChild>
               <Link href={`/dashboard/${organizationId}/brief/create`}>Create Brief</Link>
             </Button>
           </EmptyContent>
         </Empty>
       )}

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
