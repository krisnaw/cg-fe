import Link from "next/link"

import {PitchRequestForm} from "@/components/pitch-request/pitch-request-form"

export default function Page() {
  return (
    <div className="space-y-8">

      <PitchRequestForm mode="edit" />

      <div className="rounded-xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Reminder</p>
        <p className="mt-2">
          Update the {" "}
          <Link href="#" className="text-primary">
            review checklist
          </Link>{" "}
          if deliverables or scope change after edits are finalized.
        </p>
      </div>
    </div>
  )
}
