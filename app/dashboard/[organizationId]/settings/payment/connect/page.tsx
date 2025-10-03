import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {InfoIcon} from "lucide-react";

const supportedCountries = [
  {code: "US", name: "United States"},
  {code: "CA", name: "Canada"},
  {code: "GB", name: "United Kingdom"},
  {code: "AU", name: "Australia"},
  {code: "IE", name: "Ireland"},
  {code: "DE", name: "Germany"},
  {code: "FR", name: "France"},
  {code: "ES", name: "Spain"},
  {code: "IT", name: "Italy"},
  {code: "NL", name: "Netherlands"},
  {code: "SG", name: "Singapore"},
  {code: "JP", name: "Japan"},
  {code: "NZ", name: "New Zealand"},
  {code: "IN", name: "India"},
];

export default function StripeConnectSetupPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Stripe Connect onboarding</h1>
        <p className="text-muted-foreground">
          Campaign Genius uses Stripe Connect to send payouts securely. Start by
          telling us where your business operates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select your country</CardTitle>
          <CardDescription>
            Stripe needs this information to show the right onboarding
            requirements and banking fields.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country of operation</Label>
            <Select>
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Choose a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Supported countries</SelectLabel>
                  {supportedCountries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50 p-4 text-sm text-muted-foreground">
            <InfoIcon className="mt-1 size-4" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">What happens next?</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>We will redirect you to Stripe to complete the onboarding flow.</li>
                <li>Stripe collects bank details, business information, and tax forms.</li>
                <li>You&apos;ll return here to review your payout status once everything is verified.</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="button" disabled>
            Continue with Stripe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
