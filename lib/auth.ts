import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/db/db-connection"; // your drizzle instance
import * as schema from "@/db/schema/auth-schema";
import {nextCookies} from "better-auth/next-js";
import {organization} from "better-auth/plugins";
import {ac, admin, manager, member, owner, writer} from "./permissions"
import {sendResetPasswordNotification} from "@/app/action/email/send-reset-password.action";

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
            console.log(data);
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
      sendResetPassword: async ({user, url, token}, request) => {
         const resetURL = `${process.env.RAILWAY_PUBLIC_DOMAIN}${url}`;
         await sendResetPasswordNotification({
            to: user.email.trim(),
            url: resetURL,
         });
      },
   },
   database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
         ...schema,
         user: schema.user,
      }
   }),
});
