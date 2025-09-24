import {renderEmailLayout} from "./layout";

type MemberInvitationTemplateParams = {
   inviteUrl: string
   organizationName: string
   inviterName?: string
   recipientName?: string
   productName?: string
   supportEmail?: string
}

export function buildMemberInvitationEmail({
   inviteUrl,
   organizationName,
   inviterName,
   recipientName,
   productName = "ContentGrow Platform",
   supportEmail,
}: MemberInvitationTemplateParams) {
   const fallbackSupport = supportEmail ?? "support@contentgrow.com";
   const displayRecipient = recipientName ? `Hi ${recipientName},` : "Hello,";
   const displayInviter = inviterName ? `${inviterName} has invited you` : "You have been invited";

   const subject = `Invitation to join ${organizationName} on ${productName}`;

   const content = `
      <p style="margin:0 0 16px;">${displayRecipient}</p>
      <h1 style="font-size:24px;margin:0 0 16px;">Join ${organizationName}</h1>
      <p style="line-height:1.6;margin:0 0 16px;">${displayInviter} to collaborate with ${organizationName} on ${productName}. Use the button below to accept the invitation and set up your account.</p>
      <p style="text-align:center;margin:32px 0;">
         <a style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff !important;text-decoration:none;border-radius:9999px;font-weight:600;" href="${inviteUrl}" target="_blank" rel="noopener">Accept invitation</a>
      </p>
      <p style="line-height:1.6;margin:0 0 16px;">If the button does not work, copy and paste this link into your browser:</p>
      <p style="word-break:break-all;line-height:1.6;margin:0 0 16px;">${inviteUrl}</p>
      <p style="line-height:1.6;margin:0 0 16px;">If you were not expecting this invitation, you can safely ignore this email.</p>
   `;

   const {html} = renderEmailLayout({
      subject,
      content,
      productName,
      supportEmail: fallbackSupport,
      previewText: `Accept your invitation to ${organizationName}`,
   });

   const text = `${displayRecipient}\n\n${displayInviter} to collaborate with ${organizationName} on ${productName}.\n\nAccept invitation: ${inviteUrl}\n\nIf you were not expecting this email, you can ignore it.\n\nNeed help? Contact ${fallbackSupport}.`;

   return {
      subject,
      html,
      text,
   };
}

export type MemberInvitationEmail = ReturnType<typeof buildMemberInvitationEmail>;
