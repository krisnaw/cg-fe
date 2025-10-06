"use client"

import {useActionState, useState} from "react";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {upsertBriefDefaultSettings} from "@/app/action/brief-default/brief-default.upsert.action";
import {ActionResponse} from "@/lib/types";
import BriefPrice from "@/components/brief-form/brief-price";

interface BriefDefaultFormProps {
   organizationId: string
   defaultCurrency: string
   defaultPrice: number,
   defaultWordCount: number,
}
export function BriefDefaultForm({
                                    organizationId,
                                    defaultCurrency,
                                    defaultPrice,
                                    defaultWordCount = 0,
                                 }: BriefDefaultFormProps) {

  const [currency, setCurrency] = useState<string>(defaultCurrency);
   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData) => {
      const payload = {
         organizationId: formData.get("organizationId") as string,
         currency: formData.get("currency") as string,
         price: Number(formData.get("price")),
         wordCount: Number(formData.get("wordCount")) || 0,
      };

      const response = await upsertBriefDefaultSettings(payload);

      if (!response.success) {
         toast.error(response.message);
         return response;
      }

      toast.success(response.message);
      return response;
   }, {
      success: false,
      message: "",
   });

  return (
    <form action={formAction}>
      <input type="hidden" name="organizationId" value={organizationId} />
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Default Brief Settings</CardTitle>
          <CardDescription>
            Set the default currency and price for new briefs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <BriefPrice currency={currency} setCurrency={setCurrency} price={defaultPrice} />
            <div className="grid gap-3">
              <Label htmlFor="wordcount">Word Count</Label>
              <Input
                id="wordcount"
                name="wordCount"
                type="number"
                min={0}
                defaultValue={defaultWordCount ?? 0}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            Save
            {isPending && <Loader2 className="ml-2 size-4 animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
