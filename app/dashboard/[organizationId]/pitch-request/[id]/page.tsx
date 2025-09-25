import Link from "next/link"

import {PitchRequestDetail} from "@/components/pitch-request/pitch-request-detail"

export default function Page() {
  return (
    <div className="space-y-8">

      <PitchRequestDetail />

      <div className="rounded-xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Next steps</p>
        <p className="mt-2">
          Kickoff meeting scheduled? Capture decisions in the <Link href="#" className="text-primary">
            pitch handoff note
          </Link>{" "}
          so production can start without delays.
        </p>
      </div>
    </div>
  )
}
