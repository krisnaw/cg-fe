"use client"
import {useState, useTransition} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {MemberType} from "@/lib/types";
import {MemberRoles} from "@/components/organization/member/member-roles";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {deleteMemberAction} from "@/app/action/member/member.delete.action";

export default function MemberList({members}: { members: MemberType[] }) {

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const onDeleteMember = (memberId: string, organizationId: string) => {
    setDeletingId(memberId)
    startTransition(async () => {
      try {
        await deleteMemberAction(memberId, organizationId)
      } finally {
        setDeletingId(null)
      }
    })
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>
             Members
          </CardTitle>
          <CardDescription>
            Manage the people with access to this organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                 <TableHead>JoinedAt</TableHead>
                <TableHead className="text-right">Role</TableHead>
                 <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                  <TableRow key={member.id}>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {member.user.image ? (
                              <AvatarImage
                                  src={member.user.image}
                                  alt={member.user.name ?? member.user.email ?? undefined}
                              />
                          ) : (
                              <AvatarFallback>CN</AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium leading-tight">{member.user.name}</span>
                        </div>
                      </div>
                    </TableCell>

                     <TableCell className="text-muted-foreground">
                        {new Date(member.createdAt).toDateString()}
                     </TableCell>

                    <TableCell className="flex justify-end">
                      <MemberRoles memberId={member.id} organizationId={member.organizationId} roles={member.role} />
                    </TableCell>

                     <TableCell className="text-right">
                        <Button
                            variant="destructive"
                            size="icon"
                            disabled={isPending && deletingId === member.id}
                            onClick={() => onDeleteMember(member.id, member.organizationId)}
                        >
                           <Trash />
                        </Button>
                     </TableCell>

                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
