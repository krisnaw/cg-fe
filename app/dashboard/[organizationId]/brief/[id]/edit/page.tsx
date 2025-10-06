import {redirect} from "next/navigation"

import {EditBriefForm} from "@/components/brief-form/edit-brief-form"
import {getBriefById} from "@/db/query/brief.query"
import {getUserByRoleAndOrgId} from "@/db/query/writer.query"
import {DeleteBriefForm} from "@/components/brief-form/delete-brief-form";

export default async function Page({
                                      params,
                                   }: {
   params: Promise<{ organizationId: string; id: string }>
}) {
   const {id, organizationId} = await params
   const brief = await getBriefById(Number(id))

   if (!brief) {
      redirect(`/dashboard/${organizationId}/brief`)
   }

   const [managers, writers] = await Promise.all([
      getUserByRoleAndOrgId(organizationId, "manager"),
      getUserByRoleAndOrgId(organizationId, "writer"),
   ])

   return (
       <div className="space-y-10">
          <EditBriefForm brief={brief} managers={managers} writers={writers}/>
          <DeleteBriefForm briefId={brief.id}/>
       </div>
   )
}
