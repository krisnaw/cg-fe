import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {type BriefWithUsers} from "@/db/types/brief.types";
import {BriefItem} from "@/components/brief/brief-item";

type BriefListProps = {
  briefs: BriefWithUsers[]
  organizationId: string
}

export function BriefList({briefs, organizationId}: BriefListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Assigned</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {briefs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
              No briefs yet. Create your first brief to see it listed here.
            </TableCell>
          </TableRow>
        ) : (
          briefs.map(brief => (
            <BriefItem key={brief.id} brief={brief} organizationId={organizationId}/>
          ))
        )}
      </TableBody>
    </Table>
  )
}
