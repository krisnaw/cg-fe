"use server"
import {auth} from "@/lib/auth";
import {z} from "zod";

const SignInSchema = z.object({
   email: z.email(),
   password: z.string().min(2),
})

type SignInData = z.infer<typeof SignInSchema>;

export async function signInAction(signData: SignInData) {
   const validate = SignInSchema.safeParse(signData);
   if (!validate.success) {
      return {
         success: false,
         message: "Invalid data",
         error: z.treeifyError(validate.error)
      }
   }

   try {
      const data = await auth.api.signInEmail({
         body: {
            email: validate.data.email,
            password: validate.data.password,
         },
      })
      console.log(data)
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message)
      }
      return  {
         success: false,
         message: "Sorry, something went wrong. Please try again later."
      }
   }
   return {
      success: true,
      message: "Sign in successful"
   }
}