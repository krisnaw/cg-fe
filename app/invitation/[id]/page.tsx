import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import ButtonDeclinedInvitation from "@/components/invitation/button-declined-invitation";
import {redirect} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import ButtonAcceptInvitation from "@/components/invitation/button-accept-invitation";

export default async function Invitation({params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return redirect(`/login?token=${id}`)
  }

  // User must be logged in to access this page.
  // if not logged in, redirect to the login page with a token added to the url
  let data

  try {
    data = await auth.api.getInvitation({
      query: {
        id: id, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    console.log(data)
  } catch (error) {
    console.log(error)
    data = null
  }

  if (!data) {
    return (
        <div>
          Invitation not found.
        </div>
    )
  }

  return (
      <div>
        <Card className="min-w-sm">
          <CardHeader>
            <CardTitle>
              You have been invited to join a organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="font-medium list-disc list-inside space-y-2">
              <li>
                Organization name: {data.organizationName}
              </li>
              <li>
                Invited by: {data.inviterEmail}
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <ButtonDeclinedInvitation invitationId={id}/>
            <ButtonAcceptInvitation  invitationId={id}/>
          </CardFooter>
        </Card>
      </div>
  )
}