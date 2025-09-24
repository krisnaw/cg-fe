import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@/db/db-connection"; // your drizzle instance
import * as schema from "@/db/schema/auth-schema";
import {nextCookies} from "better-auth/next-js";
import {organization} from "better-auth/plugins";
import {ac, admin, manager, member, owner, writer} from "./permissions"

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
