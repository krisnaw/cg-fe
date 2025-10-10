import {redirect} from "next/navigation";
import {getBriefById} from "@/db/query/brief.query";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import BriefActivities from "@/app/dashboard/[organizationId]/brief/[id]/brief-activities";
import {BriefInformationCard} from "@/components/brief-detail/brief-information-card";
import {BriefAssignedCard} from "@/components/brief-detail/brief-assigned-card";
import {BriefDiscussionCard} from "@/components/brief-detail/brief-discussion-card";
import {Pencil} from "lucide-react";
import {Item, ItemActions, ItemContent, ItemHeader, ItemTitle,} from "@/components/ui/item"
import {getActivitiesByBriefId} from "@/db/query/brief-activities.query";

export default async function BriefDetailPage({params}: { params: Promise<{ organizationId: string, id: number }> }) {
  const {organizationId, id} = await params;

  const [brief, activities] = await Promise.all([
    getBriefById(id),
    getActivitiesByBriefId(id)
  ]);

  if (!brief) {
    redirect(`/dashboard/${organizationId}/brief`);
  }

  console.log(activities);

  return (
    <div>
      <div
        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2 grid gap-8">

          <Item variant="outline" className="shadow rounded-xl">

            <ItemHeader className="border-b border-gray-200 pb-4">
              <ItemTitle className="text-xl font-medium">
                {brief.name}
              </ItemTitle>
              <ItemActions>
                <Button variant="outline" size="icon-sm" asChild>
                  <Link href={`/dashboard/${organizationId}/brief/${brief.id}/edit`}>
                    <Pencil/>
                  </Link>
                </Button>
              </ItemActions>
            </ItemHeader>

            <ItemContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{__html: brief.description}}></div>
              </div>
            </ItemContent>

          </Item>
          <BriefDiscussionCard/>
        </div>

        <div className="lg:col-start-3 lg:row-end-1 grid gap-8">
          <BriefInformationCard brief={brief}/>

          <BriefAssignedCard brief={brief}/>

          <BriefActivities/>
        </div>
      </div>
    </div>
  );
}
