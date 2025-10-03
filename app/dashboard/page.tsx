import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {CheckCircle2Icon, SearchIcon} from "lucide-react";
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle,} from "@/components/ui/item"
import {Button} from "@/components/ui/button";

import {InputGroup, InputGroupAddon, InputGroupInput,} from "@/components/ui/input-group"

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
      <div className="space-y-6">
         <Alert className="max-w-sm">
            <CheckCircle2Icon />
            <AlertTitle>Select organization</AlertTitle>
            <AlertDescription>
               Please select an organization from the sidebar.
            </AlertDescription>
         </Alert>

        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Basic Item</ItemTitle>
            <ItemDescription>
              A simple item with title and description.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>

        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
  )
}
