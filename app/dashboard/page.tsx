import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {CheckCircle2Icon} from "lucide-react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  if(!session) {
    return redirect("/login")
  }

  if (session.session.activeOrganizationId) {
     redirect(`/dashboard/${session.session.activeOrganizationId}`)
  }
  return (
      <div className="flex items-center justify-center h-screen">
         <Alert className="max-w-sm">
            <CheckCircle2Icon />
            <AlertTitle>Select organization</AlertTitle>
            <AlertDescription>
               Please select an organization from the sidebar.
            </AlertDescription>
         </Alert>
      </div>
  )
}
