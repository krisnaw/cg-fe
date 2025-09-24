import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import MemberList from "@/components/organization/member/member-list";
import InvitationList from "@/components/organization/member/invitation-list";
import {redirect} from "next/navigation";
import OrganizationInfo from "@/components/organization/organization-info";

export default async function Page({params,}: { params: Promise<{ organizationId: string }> }) {
   const {organizationId} = await params;

   const requestHeaders = await headers();
   const session = await auth.api.getSession({
      headers: requestHeaders,
   });

   if (!session) {
      return redirect("/login")
   }

   const organizations = await auth.api.getFullOrganization({
      query: {
         organizationId: organizationId,
      },
      headers: requestHeaders,
   })

   if (!organizations) {
      return redirect("/dashboard")
   }

   const ownerPermission = await auth.api.hasPermission({
      headers: requestHeaders,
      body: {
         permissions: {
            organization: ["update"],
         },
      },
   })

   const isOwner = ownerPermission.success

   
   return (
       <div className="space-y-6">
          {isOwner && (
              <OrganizationInfo name={organizations.name} organizationId={organizationId} />
          )}
          <MemberList members={organizations.members}/>
          <InvitationList organizationId={organizationId} invitations={organizations.invitations}/>
       </div>
   );
}
