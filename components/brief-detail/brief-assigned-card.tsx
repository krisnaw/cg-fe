import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {BriefWithUsers} from "@/db/types/brief.types";

interface BriefAssignedCardProps {
   brief: BriefWithUsers
}

export function BriefAssignedCard({brief}: BriefAssignedCardProps) {
   const showManager = Boolean(brief.manager)
   const showWriter = Boolean(brief.writer)

   return (
       <Card>
          <CardHeader>
             <CardTitle>
                Assigned
             </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
             {showManager && (
                 <div className="flex items-center gap-4">
                    <Avatar className="border">
                       <AvatarImage src={brief.managerUser?.image ?? ""} alt="Image"/>
                       <AvatarFallback>{brief.managerUser?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                       <p className="text-sm leading-none font-medium">
                          {brief.managerUser?.name}
                       </p>
                       <p className="text-muted-foreground text-xs">Manager</p>
                    </div>
                 </div>
             )}

             {showWriter && (
                 <div className="flex items-center gap-4">
                    <Avatar className="border">
                       <AvatarImage src={brief.writerUser?.image ?? ""} alt="Image"/>
                       <AvatarFallback>{brief.writerUser?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                       <p className="text-sm leading-none font-medium">
                          {brief.writerUser?.name}
                       </p>
                       <p className="text-muted-foreground text-xs">Writer</p>
                    </div>
                 </div>
             )}
          </CardContent>
       </Card>
   )
}
