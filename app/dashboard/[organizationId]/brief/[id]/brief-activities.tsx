import {UserIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Item, ItemContent, ItemHeader, ItemTitle} from "@/components/ui/item";
import {BriefActivityWithUser} from "@/db/types/brief-activities.types";

export default function BriefActivities({activities}: {activities: BriefActivityWithUser[]}) {
  return (
    <Item variant="outline" className="shadow rounded-xl">
      <ItemHeader>
        <ItemTitle>
          Brief Activities
        </ItemTitle>
      </ItemHeader>
      <ItemContent className="max-h-96 overflow-auto">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {activities.map((activity) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full ring-8 ring-white bg-gray-400',
                    )}
                  >
                    <UserIcon aria-hidden="true" className="size-5 text-white" />
                  </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.message}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={activity.createdAt.toDateString()}>{activity.createdAt.toDateString()}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ItemContent>
    </Item>

  )
}
