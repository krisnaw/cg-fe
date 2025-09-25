import { CalendarDays, Paperclip, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const defaultValues = {
  name: "Multi-channel Awareness Pitch",
  requester: "Patricia Copper",
  organization: "Copper & Co. Ventures",
  category: "Product Launch",
  budget: "$25,000 - $35,000",
  dueDate: "2024-11-30",
  status: "Draft",
  objectives:
    "Introduce the new smart home security suite across digital and offline channels.",
  keyMessages:
    "Focus on peace-of-mind, unified control, and the introductory bundle pricing.",
  audience:
    "Young professionals in metro areas, tech-forward parents, and early adopters.",
  deliverables:
    "30-second hero video, 3x static social posts, 1 landing page refresh, influencer toolkit.",
  success: "Reach 1M impressions, 20K landing page visits, 1.5K qualified leads",
  notes:
    "We already have completed market research assets; reference the Q3 insight deck when ideating.",
}

type PitchRequestFormProps = {
  mode?: "create" | "edit"
}

export function PitchRequestForm({ mode = "create" }: PitchRequestFormProps) {
  const isEdit = mode === "edit"

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? "Edit pitch request" : "Create a new pitch request"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Provide the brief, desired outcomes, and supporting context so the creative team can scope
            and ideate quickly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button">
            Save as draft
          </Button>
          <Button type="submit">
            {isEdit ? "Save changes" : "Send request"}
          </Button>
        </div>
      </div>

      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Request overview</CardTitle>
            <CardDescription>
              Add the essentials so reviewers understand the high-level intent and expectations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Pitch title</Label>
                <Input
                  id="name"
                  placeholder="What should we call this pitch?"
                  defaultValue={isEdit ? defaultValues.name : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requester">Requester</Label>
                <Input
                  id="requester"
                  placeholder="Who is submitting the request?"
                  defaultValue={isEdit ? defaultValues.requester : ""}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="organization">Organization / Client</Label>
                <Input
                  id="organization"
                  placeholder="Customer or organization this pitch supports"
                  defaultValue={isEdit ? defaultValues.organization : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Campaign category</Label>
                <Input
                  id="category"
                  placeholder="Launch, retention, awareness, etc."
                  defaultValue={isEdit ? defaultValues.category : ""}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget range</Label>
                <Input
                  id="budget"
                  placeholder="Example: $25,000 - $40,000"
                  defaultValue={isEdit ? defaultValues.budget : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Final deliverable due</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="dueDate"
                    type="date"
                    defaultValue={isEdit ? defaultValues.dueDate : ""}
                    className="[&::-webkit-calendar-picker-indicator]:hidden"
                  />
                  <Button type="button" variant="outline" size="icon" aria-label="Open calendar">
                    <CalendarDays className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals and messaging</CardTitle>
            <CardDescription>
              Share the desired outcomes, audience, and positioning to align teams from the start.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="objectives">Primary objectives</Label>
              <Textarea
                id="objectives"
                placeholder="What does success look like?"
                className="min-h-24"
                defaultValue={isEdit ? defaultValues.objectives : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyMessages">Key messages</Label>
              <Textarea
                id="keyMessages"
                placeholder="Important messages or proof points to highlight"
                className="min-h-24"
                defaultValue={isEdit ? defaultValues.keyMessages : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target audience</Label>
              <Textarea
                id="audience"
                placeholder="Who are we talking to?"
                className="min-h-24"
                defaultValue={isEdit ? defaultValues.audience : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="success">Success indicators</Label>
              <Textarea
                id="success"
                placeholder="KPIs, deliverable checklist, or review criteria"
                className="min-h-24"
                defaultValue={isEdit ? defaultValues.success : ""}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deliverables</CardTitle>
            <CardDescription>
              Outline the expected outputs so teams can right-size the scope early.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deliverables">Requested deliverables</Label>
              <Textarea
                id="deliverables"
                placeholder="List channels, formats, or assets requested"
                className="min-h-32"
                defaultValue={isEdit ? defaultValues.deliverables : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>Reference files</Label>
              <div className="flex flex-col gap-3 rounded-lg border border-dashed p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-muted/60">
                    <UploadCloud className="size-4" />
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Upload supporting files</p>
                    <p className="text-xs text-muted-foreground">
                      Drop files here or click to browse. PDFs, decks, docs, and images are supported.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" type="button">
                    Choose files
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    Paste link
                  </Button>
                </div>
                {isEdit ? (
                  <div className="flex flex-col gap-2 rounded-md border bg-muted/40 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Paperclip className="size-4" />
                        <span>Concept-outline-v2.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm" type="button">
                        Replace
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Paperclip className="size-4" />
                        <span>Insight-summary.xlsx</span>
                      </div>
                      <Button variant="ghost" size="sm" type="button">
                        Replace
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional context</CardTitle>
            <CardDescription>
              Capture call notes, dependencies, or anything reviewers should keep in mind.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Special considerations</Label>
              <Textarea
                id="notes"
                placeholder="Share constraints, required collaborators, or background information"
                className="min-h-32"
                defaultValue={isEdit ? defaultValues.notes : ""}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Submitters will receive a confirmation email with next steps once the request is reviewed.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save changes" : "Send request"}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
