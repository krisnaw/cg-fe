import {cn} from "@/lib/utils";
import {Item, ItemContent, ItemHeader, ItemTitle} from "@/components/ui/item";
import {BriefActivityWithUser} from "@/db/types/brief-activities.types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {UserIcon} from "lucide-react";

export default function BriefActivities({activities}: { activities: BriefActivityWithUser[] }) {
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
                  <span aria-hidden="true" className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"/>

                  <div className="relative flex space-x-3">
                    <div>
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full ring-8 ring-white bg-gray-400',
                    )}
                  >

                    {activity.actorUser?.image ?
                      (
                        <Avatar className="border">
                          <AvatarImage src={activity.actorUser?.image ?? ""} alt="Image"/>
                          <AvatarFallback>{activity.actorUser?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) :
                      (
                        <UserIcon aria-hidden="true" className="size-5 text-white"/>
                      )
                    }
                  </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          {activity.message}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={activity.createdAt.toLocaleString()}>{activity.createdAt.toDateString()}</time>
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
