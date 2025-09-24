"use client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createOrganization} from "@/app/action/member/organization/organization.create.action";

export default function CreateOrgForm({userId} : {userId : string}) {

  // TODO: Use action state
  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    await createOrganization(name, userId)
  }
  return (
      <form onSubmit={onSubmitForm}>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>
              Create Organization
            </CardTitle>
            <CardDescription>
              If you are a company, you can create an organization to manage your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label>
                Organization Name
              </Label>
              <div className="mt-2">
                <Input name="name" id="name" type="text" placeholder="Enter organization name" required/>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
  )
}