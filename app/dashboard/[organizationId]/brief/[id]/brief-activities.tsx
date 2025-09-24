import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

type Activity = {
   id: string;
   actor: string;
   role: "Manager" | "Writer" | "System";
   action: string;
   detail?: string;
   timestamp: string;
};

const mockActivities: Activity[] = [
   {
      id: "1",
      actor: "Jordan Steele",
      role: "Manager",
      action: "updated the deadline",
      detail: "Shifted launch to Sep 29 at 9:00 AM PST",
      timestamp: "Today, 10:40 AM",
   },
   {
      id: "2",
      actor: "BriefSense",
      role: "System",
      action: "synced with Jira",
      detail: "Ticket CGP-233 now marked as In Progress",
      timestamp: "Today, 9:15 AM",
   },
   {
      id: "3",
      actor: "Priya Ghosh",
      role: "Writer",
      action: "left feedback on requirements",
      detail: "Requested clarification on the partner asset specs",
      timestamp: "Today, 8:02 AM",
   },
   {
      id: "4",
      actor: "Tanya Hidalgo",
      role: "Writer",
      action: "uploaded draft outline",
      detail: "Outline includes updated brand tone guidance",
      timestamp: "Yesterday, 5:32 PM",
   },
   {
      id: "5",
      actor: "Jordan Steele",
      role: "Manager",
      action: "shared reference deck",
      detail: "Attached campaign learnings from Q2 refresh",
      timestamp: "Yesterday, 2:11 PM",
   },
   {
      id: "6",
      actor: "BriefSense",
      role: "System",
      action: "notified stakeholders",
      detail: "Sent Slack update to #cgp-briefs channel",
      timestamp: "Mon, 4:57 PM",
   },
   {
      id: "7",
      actor: "Jordan Steele",
      role: "Manager",
      action: "created the brief",
      detail: "Imported previous messaging pillars from CGP-198",
      timestamp: "Mon, 3:05 PM",
   },
];

const roleBadgeVariants: Record<Activity["role"], string> = {
   Manager: "bg-blue-100 text-blue-800",
   Writer: "bg-emerald-100 text-emerald-800",
   System: "bg-slate-200 text-slate-800",
};

export default function BriefActivities() {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Activities</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="relative max-h-80 space-y-6 overflow-y-auto overflow-x-visible border-l pl-6 pr-4">
               {mockActivities.map((activity, index) => (
                  <div key={activity.id} className="relative space-y-1">
                     <span
                        className={cn(
                           "absolute -left-[30px] top-1/2 z-10 h-[13px] w-[13px] -translate-y-1/2 rounded-full border-2 border-background",
                           index === 0 ? "bg-primary" : "bg-muted"
                        )}
                     />
                     <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{activity.actor}</span>
                        <Badge className={cn("text-xs", roleBadgeVariants[activity.role])}>{activity.role}</Badge>
                     </div>
                     <p className="text-sm text-muted-foreground">{activity.action}</p>
                     {activity.detail ? (
                        <p className="text-sm text-muted-foreground">{activity.detail}</p>
                     ) : null}
                     <p className="text-xs uppercase tracking-wide text-muted-foreground/80">
                        {activity.timestamp}
                     </p>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
