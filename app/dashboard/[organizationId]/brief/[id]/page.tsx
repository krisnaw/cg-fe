import {redirect} from "next/navigation";
import {getBriefById} from "@/db/query/brief.query";
import {BriefActivities} from "@/components/brief-detail/brief-activities";
import {BriefInformationCard} from "@/components/brief-detail/brief-information-card";
import {BriefAssignedCard} from "@/components/brief-detail/brief-assigned-card";
import {BriefDiscussionCard} from "@/components/brief-discussion/brief-discussion-card";
import {getActivitiesByBriefId} from "@/db/query/brief-activities.query";
import {BriefSummary} from "@/components/brief-detail/brief-summary";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export default async function BriefDetailPage({params}: { params: Promise<{ organizationId: string, id: number }> }) {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  const {organizationId, id} = await params;

  const [brief, activities] = await Promise.all([
    getBriefById(id),
    getActivitiesByBriefId(id)
  ]);

  if (!brief) {
    redirect(`/dashboard/${organizationId}/brief`);
  }

  return (
    <div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2 grid gap-8">
          <BriefSummary organizationId={organizationId} brief={brief} />
          {session?.user ? <BriefDiscussionCard brief={brief} user={session?.user} /> : null}
        </div>

        <div className="lg:col-start-3 lg:row-end-1 grid gap-8">
          <BriefInformationCard brief={brief}/>

          <BriefAssignedCard brief={brief}/>

          <BriefActivities activities={activities} />
        </div>
      </div>
    </div>
  );
}
