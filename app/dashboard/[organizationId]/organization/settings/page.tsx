import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default async function Page({params,}: { params: Promise<{ organizationId: string }> }) {
   return (
       <div className="space-y-6">
          <Card className="max-w-lg">
             <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
                <CardDescription>Manage billing details for this organization.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="space-y-2">
                   <Label htmlFor="stripeCustomerId">Stripe customer ID</Label>
                   <Input
                       id="stripeCustomerId"
                       name="stripeCustomerId"
                       placeholder="cus_12345"
                   />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="serviceFee">Service fee (%)</Label>
                   <Input
                       id="serviceFee"
                       name="serviceFee"
                       type="number"
                       step="0.01"
                       min={0}
                       placeholder="15"
                   />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="serviceFee">Freelance fee (%)</Label>
                   <Input
                       id="freelanerFee"
                       name="freelanerFee"
                       type="number"
                       step="0.01"
                       min={0}
                       placeholder="15"
                   />
                </div>
             </CardContent>
             <CardFooter>
                <Button type="button" disabled>
                   Save changes
                </Button>
             </CardFooter>
          </Card>
       </div>
   );
}
