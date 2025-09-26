import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {getInvoiceByOrgId} from "@/db/query/invoice.query";

type Props = {
   params: Promise<{ organizationId: string }>
}

const STATUS_BADGE_MAP: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
   draft: "secondary",
   sent: "default",
   paid: "default",
   cancelled: "destructive",
   canceled: "destructive",
}

export default async function InvoiceListPage({params}: Props) {

   const {organizationId} = await params
   const invoices = await getInvoiceByOrgId(organizationId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>
          Track organization invoices and their status at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Writer</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Badge variant={STATUS_BADGE_MAP[item.status] ?? "outline"} className="capitalize">
                           {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.writerUser?.name ?? item.writer}</TableCell>
                      <TableCell>{item.createdAt?.toLocaleString?.() ?? String(item.createdAt)}</TableCell>
                      <TableCell>{item.updatedAt?.toLocaleString?.() ?? String(item.updatedAt)}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
              <TableCaption>{invoices.length} invoice{invoices.length > 1 ? "s" : ""} found.</TableCaption>
            </Table>
        ) : (
            <p className="text-sm text-muted-foreground">No invoices found for this organization.</p>
        )}
      </CardContent>
    </Card>
  );
}
