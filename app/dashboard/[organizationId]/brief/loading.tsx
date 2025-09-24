import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle>Briefs</CardTitle>
          <CardDescription>Newest requests appear first.</CardDescription>
        </div>
        <CardAction>
          <Button asChild>
            <Link href="/dashboard/">Create brief</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                          <TableCell>
                              <Skeleton className="h-4 w-8" />
                          </TableCell>
                          <TableCell>
                              <Skeleton className="h-4 w-48" />
                          </TableCell>
                          <TableCell>
                              <Skeleton className="h-4 w-32" />
                          </TableCell>
                          <TableCell>
                              <Skeleton className="h-4 w-32" />
                          </TableCell>
                          <TableCell className="text-right">
                              <div className="flex flex-wrap items-center justify-end gap-2">
                                  <Skeleton className="h-8 w-16" />
                                  <Skeleton className="h-8 w-16" />
                              </div>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </CardContent>
    </Card>
  );
}

