import {CreateBriefForm} from "@/components/brief/create-brief-form";
import {getUserByRoleAndOrgId} from "@/db/query/writer.query";
import {Suspense} from "react";

export default async function Page({params,}: { params: Promise<{ organizationId: string }> }) {
  const { organizationId } = await params;

   const writers = await getUserByRoleAndOrgId(organizationId, "writer")
   const managers = await getUserByRoleAndOrgId(organizationId, "manager")
  return (
      <Suspense fallback={<div>Loading</div>}>
         <CreateBriefForm
             writers={writers}
             managers={managers}
             organizationId={organizationId} />
      </Suspense>
  )
}
