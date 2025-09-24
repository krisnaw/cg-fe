"use client"

import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {inviteMember} from "@/app/action/member/member.invite.action";
import {useActionState} from "react";
import {ActionResponse, InvitationType} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {Badge} from "@/components/ui/badge";

type InvitationListProps = {
  organizationId: string;
  invitations: InvitationType[];
};

export default function InvitationList({organizationId, invitations}: InvitationListProps) {

  const getStatusVariant = (status: InvitationType["status"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "pending":
        return "secondary"
      case "accepted":
        return "default"
      default:
        return "outline"
    }
  }

  const formatStatus = (status: InvitationType["status"]) => status.replace(/_/g, " ")

  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData: FormData) => {
    const data = {
      email: formData.get("email") as string,
      organizationId: organizationId,
    }
    const res = await inviteMember(data)
    if (!res.success) {
      toast.error(res.message)
      return {
        success: false,
        message: res.message
      }
    }
    toast.success(res.message)
    return res;
  }, {
    success: false,
    message: ""
  })

  return (
      <Card>
        <CardHeader>
          <CardTitle>Pending invites</CardTitle>
          <CardDescription>Track outstanding invitations for this organization.</CardDescription>
          <CardAction>
            <form action={formAction} className="inline-flex gap-2">
              <Input required name="email" id="email" type="email" placeholder="Enter email"/>
              <Button disabled={isPending} type={"submit"}>
                Submit
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations.length ? (
                  invitations.map((invitation) => (
                      <TableRow key={invitation.id}>
                        <TableCell>{invitation.email}</TableCell>
                        <TableCell className="capitalize">{invitation.role ?? "-"}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(invitation.status)} className="capitalize">
                            {formatStatus(invitation.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{invitation.expiresAt?.toDateString()}</TableCell>
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No pending invitations.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
