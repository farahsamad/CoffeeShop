"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// export async function login(
//   state: z.infer<typeof LoginSchema>,
//   form: FormData
// ): Promise<{
//   success: boolean;
//   data?: z.infer<typeof LoginSchema>;
//   error?: Record<string, string>;
// }> {
//   const values: z.infer<typeof LoginSchema> = {
//     email: form.get("email") as string,
//     password: form.get("password") as string,
//   };
//   const validatedFields = LoginSchema.safeParse(values);
//   if (!validatedFields.success) {
//     const error = validatedFields.error.issues.reduce((acc, issue) => {
//       acc[issue.path[0]] = issue.message;
//       return acc;
//     }, {} as Record<string, string>);

//     return { success: false, error };
//   }
//   // Process validated form inputs here
//   const { email, password } = validatedFields.data;
//   return { success: true, data: { email, password } };
// }
export type LoginState = {
  email: string;
  password: string;
  name?: string;
  success?: boolean | string;
  errors?: LoginErrors;
};

export type LoginErrors = {
  email?: string;
  password?: string;
  name?: string;
  other?: string;
};

export async function login(state: LoginState, form: FormData): Promise<LoginState> {
  const data = Object.fromEntries(form);
  // const result = LoginSchema.safeParse(data);
  // const values: z.infer<typeof LoginSchema> = {
  //   email: form.get("email"),
  //   password: form.get("password") as string,
  // };

  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: LoginErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof LoginErrors;
      errors[key] = issue.message;
    });
    // const errors = validatedFields.error.formErrors;
    // const errors:LoginErrors = validatedFields.error.issues.reduce((acc, issue) => {
    //   acc[issue.path[0]] = issue.message;
    //   return acc;
    // }, {} as Record<string, string>);

    return { ...state, success: false, errors };
  }

  // Process validated form inputs here
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    const errors: LoginErrors = { other: "Email does not exist!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  // if (!existingUser.emailVerified) {
  // }
  // if(existingUser.isTwoFactorEnabled && existingUser.email){}

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          const credentialsErrors: LoginErrors = { other: "Invalid credentials" };
          return {
            ...state,
            success: false,
            errors: credentialsErrors,
          };
        default:
          const defaultErrors: LoginErrors = { other: "Something went wrong!" };
          return {
            ...state,
            success: false,
            errors: defaultErrors,
          };
      }
    }
  }

  return { email, password, success: true, errors: {} };
}
