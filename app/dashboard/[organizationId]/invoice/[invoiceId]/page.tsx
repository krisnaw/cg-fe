import {redirect} from "next/navigation";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {getBriefsByInvoiceId} from "@/db/query/brief.query";
import {getInvoiceByOrgAndId} from "@/db/query/invoice.query";

type Props = {
   params: Promise<{ organizationId: string, invoiceId: string }>
}

const STATUS_BADGE_MAP: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
   draft: "secondary",
   sent: "default",
   paid: "default",
   cancelled: "destructive",
   canceled: "destructive",
}

export default async function InvoiceDetailPage({params}: Props) {
   const {organizationId, invoiceId} = await params
   const parsedId = Number(invoiceId)

   if (Number.isNaN(parsedId)) {
      redirect(`/dashboard/${organizationId}/invoice/list`)
   }

   const [invoice, relatedBriefs] = await Promise.all([
      getInvoiceByOrgAndId(organizationId, parsedId),
      getBriefsByInvoiceId(parsedId),
   ])

   if (!invoice) {
      redirect(`/dashboard/${organizationId}/invoice/list`)
   }

   const status = invoice.status
   const writer = invoice.writerUser?.name ?? invoice.writer
   const organizationName = invoice.organization?.name ?? organizationId

   return (
       <div className="grid gap-8">
         <Card>
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
               <div className="space-y-1">
                  <CardTitle>Invoice #{invoice.id}</CardTitle>
                  <CardDescription>
                     Created {invoice.createdAt?.toLocaleString?.() ?? String(invoice.createdAt ?? "—")} · Updated {invoice.updatedAt?.toLocaleString?.() ?? String(invoice.updatedAt ?? "—")}
                  </CardDescription>
               </div>
               <Badge variant={STATUS_BADGE_MAP[status] ?? "outline"} className="capitalize self-start">
                  {status}
               </Badge>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-6 pt-6">
               <div className="grid gap-2">
                  <span className="text-sm text-muted-foreground">Organization</span>
                  <span className="font-medium">{organizationName}</span>
               </div>
               <div className="grid gap-2">
                  <span className="text-sm text-muted-foreground">Writer</span>
                  <span className="font-medium">{writer}</span>
               </div>
               <div className="grid gap-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-medium capitalize">{status}</span>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Related Briefs</CardTitle>
               <CardDescription>Briefs linked to this invoice.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
               {relatedBriefs?.length ? (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Name</TableHead>
                           <TableHead>Organization</TableHead>
                           <TableHead>Writer</TableHead>
                           <TableHead>Status</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {relatedBriefs.map((brief) => (
                            <TableRow key={brief.id}>
                               <TableCell className="font-medium">{brief.name}</TableCell>
                               <TableCell>{brief.organization?.name ?? organizationName}</TableCell>
                               <TableCell>{brief.writerUser?.name ?? brief.writer ?? "—"}</TableCell>
                               <TableCell className="capitalize">{brief.status}</TableCell>
                            </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               ) : (
                  <p className="text-sm text-muted-foreground">No related briefs for this invoice.</p>
               )}
            </CardContent>
         </Card>
       </div>
   )
}
