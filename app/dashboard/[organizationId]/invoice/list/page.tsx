import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {getInvoiceByOrgId} from "@/db/query/invoice.query";

type Props = {
   params: Promise<{ organizationId: string }>
}

export default async function InvoiceAddressPage({params}: Props) {

   const {organizationId} = await params
   const invoices = await getInvoiceByOrgId(organizationId)
   const invoiceRecord = invoices.at(0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Address</CardTitle>
        <CardDescription>
          Update your invoice address for Stripe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invoiceRecord ? (
            <form className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="invoice-id">Invoice ID</Label>
                <Input id="invoice-id" defaultValue={String(invoiceRecord.id)} readOnly />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="invoice-organization">Organization</Label>
                <Input id="invoice-organization" defaultValue={invoiceRecord.organizationId ?? ""} readOnly />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="invoice-writer">Writer</Label>
                <Input id="invoice-writer" defaultValue={invoiceRecord.writer ?? ""} readOnly />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="invoice-status">Status</Label>
                <Input id="invoice-status" defaultValue={invoiceRecord.status ?? ""} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="invoice-created">Created</Label>
                  <Input
                      id="invoice-created"
                      defaultValue={invoiceRecord.createdAt ? invoiceRecord.createdAt.toISOString() : ""}
                      readOnly
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="invoice-updated">Updated</Label>
                  <Input
                      id="invoice-updated"
                      defaultValue={invoiceRecord.updatedAt ? invoiceRecord.updatedAt.toISOString() : ""}
                      readOnly
                  />
                </div>
              </div>
            </form>
        ) : (
            <p className="text-sm text-muted-foreground">No invoices found for this organization.</p>
        )}
      </CardContent>
    </Card>
  );
}
