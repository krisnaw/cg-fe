import { Clock, FileText, LinkIcon, Mail, Pencil, Share2, Tag, Users } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const detail = {
  title: "Multi-channel Awareness Pitch",
  status: "In review",
  submittedAt: "Oct 08, 2024 at 9:42 AM",
  summary:
    "A cross-channel launch pitch introducing the new smart security suite. Focus on peace-of-mind messaging and bundle pricing for the Q4 seasonal push.",
  requester: {
    name: "Patricia Copper",
    email: "pcopper@copperventures.com",
    department: "Growth marketing",
  },
  owner: {
    name: "Dylan Nash",
    role: "Creative strategist",
  },
  organization: "Copper & Co. Ventures",
  category: "Product launch",
  budget: "$25,000 - $35,000",
  dueDate: "Nov 30, 2024",
  objectives: [
    "Establish the new product positioning across paid and owned channels.",
    "Drive landing page traffic that converts to qualified demo requests.",
    "Enable sales with visual storytelling assets for the Q4 pipeline.",
  ],
  keyMessages: [
    "Security that travels with you across every device.",
    "Unified control with the Copper Home mobile app.",
    "Launch bundle: 20% off through Dec 31.",
  ],
  audience: [
    "Tech-forward parents with young families.",
    "Early adopters who prioritize home automation.",
    "Working professionals in metro areas who value convenience.",
  ],
  deliverables: [
    "30-second hero video and 15-second cutdown.",
    "Three paid social variations across Meta and TikTok.",
    "Landing page hero refresh with updated copy.",
    "Sales one-pager for account executives.",
  ],
  references: [
    {
      label: "Concept-outline-v2.pdf",
      href: "#",
    },
    {
      label: "Insight-summary.xlsx",
      href: "#",
    },
    {
      label: "Persona-playbook-notes",
      href: "#",
    },
  ],
  success: [
    "1M+ paid impressions across Meta and TikTok.",
    "20K landing page visits with 8% demo conversion.",
    "Positive brand recall uplift in post-campaign study.",
  ],
  notes:
    "Customer insights deck already approved. Align with product marketing on channel mix before presenting to leadership.",
  activity: [
    {
      id: 1,
      actor: "Patricia Copper",
      initials: "PC",
      action: "submitted the request",
      timestamp: "Oct 08, 2024 at 9:42 AM",
    },
    {
      id: 2,
      actor: "Dylan Nash",
      initials: "DN",
      action: "added creative requirements",
      timestamp: "Oct 09, 2024 at 11:08 AM",
    },
    {
      id: 3,
      actor: "Morgan Liang",
      initials: "ML",
      action: "requested budget clarification",
      timestamp: "Oct 09, 2024 at 3:17 PM",
    },
  ],
  collaborators: [
    { id: 1, name: "Dylan Nash", role: "Creative strategist", initials: "DN" },
    { id: 2, name: "Morgan Liang", role: "Finance partner", initials: "ML" },
    { id: 3, name: "Sasha O'Neil", role: "Video production", initials: "SO" },
  ],
}

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-100 text-amber-800"

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${tone}`}>
      <span className="size-2 rounded-full bg-current" />
      {status}
    </span>
  )
}

export function PitchRequestDetail() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <StatusBadge status={detail.status} />
          <h1 className="text-2xl font-semibold tracking-tight">{detail.title}</h1>
          <p className="text-sm text-muted-foreground">
            {detail.summary}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button">
            <Share2 className="size-4" />
            Share
          </Button>
          <Button variant="outline" type="button">
            <FileText className="size-4" />
            Export brief
          </Button>
          <Button type="button">
            <Pencil className="size-4" />
            Edit request
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Key details and submission metadata</CardDescription>
              </div>
              <div className="text-xs text-muted-foreground">
                Submitted {detail.submittedAt}
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs uppercase text-muted-foreground">Requester</p>
                <div className="space-y-1">
                  <p className="font-medium">{detail.requester.name}</p>
                  <p className="text-sm text-muted-foreground">{detail.requester.department}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4" />
                    {detail.requester.email}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase text-muted-foreground">Pitch owner</p>
                <div className="space-y-1">
                  <p className="font-medium">{detail.owner.name}</p>
                  <p className="text-sm text-muted-foreground">{detail.owner.role}</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase text-muted-foreground">Organization</p>
                <div className="space-y-1">
                  <p className="font-medium">{detail.organization}</p>
                  <p className="text-sm text-muted-foreground">{detail.category}</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase text-muted-foreground">Budget & timeline</p>
                <div className="space-y-1">
                  <p className="font-medium">{detail.budget}</p>
                  <p className="text-sm text-muted-foreground">Final deliverables due {detail.dueDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objectives</CardTitle>
              <CardDescription>Desired outcomes and measurement</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {detail.objectives.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key messages</CardTitle>
              <CardDescription>Guardrails for tone, positioning, and storytelling</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {detail.keyMessages.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Tag className="mt-0.5 size-4 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target audience</CardTitle>
              <CardDescription>Segments that should guide creative direction</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {detail.audience.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Users className="mt-0.5 size-4 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deliverables</CardTitle>
              <CardDescription>Requested outputs to scope the pitch</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {detail.deliverables.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <FileText className="mt-0.5 size-4 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success indicators</CardTitle>
              <CardDescription>How the team will measure impact</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                {detail.success.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 size-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Context, dependencies, and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{detail.notes}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaborators</CardTitle>
              <CardDescription>People actively involved in shaping the pitch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {detail.collaborators.map(person => (
                <div key={person.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{person.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-muted-foreground">{person.role}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" type="button" className="pl-0">
                <Users className="size-4" />
                Manage access
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reference files</CardTitle>
              <CardDescription>Supporting context to review before kickoff</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {detail.references.map(reference => (
                <a
                  key={reference.label}
                  href={reference.href}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm transition hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="size-4 text-muted-foreground" />
                    <span>{reference.label}</span>
                  </div>
                  <LinkIcon className="size-4 text-muted-foreground" />
                </a>
              ))}
              <Button variant="outline" size="sm" type="button" className="w-full">
                Add reference
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Automatic updates are posted as the request progresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {detail.activity.map(item => (
                <div key={item.id} className="relative pl-9">
                  <span className="absolute left-1 top-1 size-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{item.actor}</span> {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
                <Clock className="size-4" />
                Activity updates are visible to collaborators and reviewers.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
