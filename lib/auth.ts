import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/db/db-connection"; // your drizzle instance
import * as schema from "@/db/schema/auth-schema";
import {nextCookies} from "better-auth/next-js";
import {organization} from "better-auth/plugins";
import {ac, admin, manager, member, owner, writer} from "./permissions"
import {buildMemberInvitationEmail} from "@/services/email/templates/member-invitation";
import {transporter} from "@/lib/mail-transporter";

const from_mail = '"ContentGrow" <info@krisnawijaya.com>';

export const auth = betterAuth({
   trustedOrigins: [
      "http://localhost:3000",
      `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
   ],
   plugins: [
      organization({
         ac,
         roles: {
            admin,
            owner,
            member,
            manager,
            writer
         },
         async sendInvitationEmail(data) {
            const appUrl = process.env.RAILWAY_PUBLIC_DOMAIN ?? "http://localhost:3000";
            const inviteLink = `${appUrl}/invitation/${data.id}`;
            const supportEmail = process.env.SUPPORT_EMAIL ?? "support@contentgrow.com";

            const {subject, html, text} = buildMemberInvitationEmail({
               inviteUrl: inviteLink,
               organizationName: data.organization.name ?? "your organization",
               inviterName: data.inviter?.user?.name ?? undefined,
               recipientName: "there",
               supportEmail,
            });

            await transporter.sendMail({
               from: from_mail,
               to: data.email,
               subject,
               text,
               html,
            })
         },
         organizationHooks: {
            afterCreateOrganization: async ({organization, member, user}) => {
               // Run custom logic after the organization is created
               // e.g., create default resources, send notifications
               console.log(`Organization ${organization.name} created by ${user.email}`);
               console.log(`Member ${member.email} joined the organization`);
               // TODO: Create Stripe Customer
            },

            // After accepting an invitation
            afterAcceptInvitation: async ({
                                             invitation,
                                             member,
                                             user,
                                             organization,
                                          }) => {
               // Setup user account, assign default resources
               console.log(`Invitation ${invitation.id} accepted by ${user.email}`);
               console.log(`Member ${member.email} joined the organization`);
               console.log(`Organization ${organization.name} created by ${user.email}`);
               // TODO: Notify org owner that the invitation has been accepted
            },

            afterRejectInvitation: async ({invitation, user, organization}) => {
               console.log(`Invitation ${invitation.id} rejected by ${user.email}`);
               console.log(organization)
               // TODO : Send notif
            },

         }
      }),
      nextCookies()
   ],
   emailAndPassword: {
      enabled: true,
   },
   database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
         ...schema,
         user: schema.user,
      }
   }),
});
