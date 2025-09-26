import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

type Props = {
   params: Promise<{ organizationId: string }>
}

export default async function InvoiceAddressPage({params}: Props) {

   const {organizationId} = await params

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Address</CardTitle>
        <CardDescription>
          Update your invoice address for Stripe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address1">Address Line 1</Label>
            <Input id="address1" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="address2">Address Line 2</Label>
            <Input id="address2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="zip">ZIP/Postal Code</Label>
              <Input id="zip" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="country">Country</Label>
              <Input id="country" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
