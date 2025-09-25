import Link from "next/link"

import { PitchRequestForm } from "@/components/pitch-request/pitch-request-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Page() {
  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/pitch-request">Pitch requests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PitchRequestForm mode="create" />

      <div className="rounded-xl border bg-muted/40 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Need help?</p>
        <p className="mt-2">
          Review our <Link href="#" className="text-primary">pitch intake guide</Link> for scope examples and
          best practices.
        </p>
      </div>
    </div>
  )
}
