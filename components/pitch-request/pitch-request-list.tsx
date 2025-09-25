import Link from "next/link"
import {ArrowUpRight, CalendarDays, Filter, ListFilter, Search, Tag} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Input} from "@/components/ui/input"
import {Separator} from "@/components/ui/separator"

const pitchRequests = [
  {
    id: "req-3042",
    name: "Multi-channel Awareness Pitch",
    requester: "Patricia Copper",
    status: "In review",
    due: "Nov 30, 2024",
    category: "Product launch",
    budget: "$25k - $35k",
    updated: "2h ago",
  },
  {
    id: "req-3038",
    name: "Series B investor roadshow",
    requester: "Jordan Blake",
    status: "Draft",
    due: "Dec 12, 2024",
    category: "Investor relations",
    budget: "$15k - $20k",
    updated: "Yesterday",
  },
  {
    id: "req-3029",
    name: "Lifecycle nurture refresh",
    requester: "Sasha O'Neil",
    status: "Approved",
    due: "Oct 25, 2024",
    category: "Lifecycle",
    budget: "$8k - $12k",
    updated: "Oct 10, 2024",
  },
  {
    id: "req-3022",
    name: "Agency onboarding toolkit",
    requester: "Dylan Nash",
    status: "Scheduled",
    due: "Nov 05, 2024",
    category: "Enablement",
    budget: "$5k - $7k",
    updated: "Oct 09, 2024",
  },
]

const statusVariants: Record<string, string> = {
  Approved: "bg-emerald-100 text-emerald-700",
  Draft: "bg-muted text-muted-foreground",
  "In review": "bg-amber-100 text-amber-800",
  Scheduled: "bg-blue-100 text-blue-800",
}

export function PitchRequestList({organizationId} : {organizationId : string}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pitch requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Pitch requests</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Track intake, review status, and handoffs for upcoming pitches. Use filters to focus on
              the requests that need your attention today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" type="button">
              <Filter className="size-4" />
              Saved views
            </Button>
            <Button asChild>
              <Link href={`/dashboard/${organizationId}/pitch-request/create`}>
                <ArrowUpRight className="size-4" />
                New pitch request
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Requests awaiting review
            </CardTitle>
            <CardDescription className="text-3xl font-semibold text-foreground">
              6
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Active campaigns</CardTitle>
            <CardDescription className="text-3xl font-semibold text-foreground">
              4
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. approval time</CardTitle>
            <CardDescription className="text-3xl font-semibold text-foreground">
              2.5 days
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <CardTitle>All requests</CardTitle>
            <CardDescription>Filter by status, owner, or timeline to spot blockers.</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-56">
              <Search className="text-muted-foreground absolute left-3 top-2.5 size-4" />
              <Input className="pl-9" placeholder="Search by requester, title, or ID" />
            </div>
            <Button variant="outline" type="button">
              <ListFilter className="size-4" />
              Status
            </Button>
            <Button variant="outline" type="button">
              <CalendarDays className="size-4" />
              Timeline
            </Button>
            <Button variant="outline" type="button">
              <Tag className="size-4" />
              Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/60 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-6 py-3 font-medium">Request</th>
                  <th className="px-6 py-3 font-medium">Requester</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Due</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Budget</th>
                  <th className="px-6 py-3 font-medium">Last update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {pitchRequests.map(request => (
                  <tr key={request.id} className="hover:bg-muted/40">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <Link
                          href={`/app/dashboard/%5BorganizationId%5D/pitch-request/${request.id}`}
                          className="font-medium text-foreground transition hover:text-primary"
                        >
                          {request.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">ID {request.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{request.requester}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusVariants[request.status]}`}
                      >
                        <span className="size-2 rounded-full bg-current" />
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{request.due}</td>
                    <td className="px-6 py-4">{request.category}</td>
                    <td className="px-6 py-4">{request.budget}</td>
                    <td className="px-6 py-4 text-muted-foreground">{request.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Workflow tips</p>
        <Separator className="my-4" />
        <ul className="list-disc space-y-2 pl-5">
          <li>Group requests by status to see where work is queued up.</li>
          <li>Create saved views for campaigns, regions, or partner teams.</li>
          <li>Archive completed pitches once assets are delivered.</li>
        </ul>
      </div>
    </div>
  )
}
