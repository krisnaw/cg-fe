import {PitchRequestList} from "@/components/pitch-request/pitch-request-list"

export default async function Page({params,}: { params: Promise<{ organizationId: string }> }) {
   const {organizationId} = await params
  return (
    <div className="space-y-8">
      <PitchRequestList organizationId={organizationId} />
    </div>
  )
}
