"use server"

import {z} from "zod";
import {auth} from "@/lib/auth";

const RegisterSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6),
  token: z.string().optional()
})

type RegisterData = z.infer<typeof RegisterSchema>;

export async function signUp(formData: RegisterData) {

  const validate = RegisterSchema.safeParse(formData);

  if (!validate.success) {
    return {
      success: false,
      message: "Invalid data",
      error: z.treeifyError(validate.error)
    }
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: validate.data.name,
        email: validate.data.email,
        password : validate.data.password,
      },
    });
  } catch (error) {
    console.log(error)
    return  {
      success: false,
      message: "Sorry, something went wrong. Please try again later."
    }
  }

  return {
    success: true,
    message: "Account created successfully"
  }
}