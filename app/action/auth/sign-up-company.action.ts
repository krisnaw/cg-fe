"use server";

import {z} from "zod";
import {auth} from "@/lib/auth";

const BaseRegisterSchema = z.object({
   name: z.string().min(3),
   email: z.email(),
   password: z.string().min(6),
   password_confirmation: z.string().min(6),
   token: z.string().optional(),
});

const RegisterCompanySchema = BaseRegisterSchema.extend({
   company_name: z.string().min(3),
});

type RegisterCompanyData = z.infer<typeof RegisterCompanySchema>;

export async function signUpCompany(formData: RegisterCompanyData) {
   const validate = RegisterCompanySchema.safeParse(formData);

   if (!validate.success) {
      return {
         success: false,
         message: "Invalid data",
         error: z.treeifyError(validate.error),
      };
   }

   let userId = ""

   try {
      const result = await auth.api.signUpEmail({
         body: {
            name: validate.data.name,
            email: validate.data.email,
            password: validate.data.password,
         },
      });

      userId = result.user.id

   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: "Sorry, something went wrong. Please try again later.",
      };
   }

   return {
      success: true,
      message: "Account created successfully",
      data: userId,
   };
}
