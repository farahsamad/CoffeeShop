"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

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
export type SignupState = {
  name: string;
  email: string;
  password: string;
  success?: boolean | string;
  errors?: SignupErrors;
};
export type SignupErrors = {
  email?: string;
  password?: string;
  name?: string;
  other?: string;
};

export async function signup(state: SignupState, form: FormData): Promise<SignupState> {
  const data = Object.fromEntries(form);
  // const result = LoginSchema.safeParse(data);
  // const values: z.infer<typeof LoginSchema> = {
  //   email: form.get("email"),
  //   password: form.get("password") as string,
  // };

  const validatedFields = SignupSchema.safeParse(data);

  if (!validatedFields.success) {
    // const errors = validatedFields.error.formErrors;
    const errors: SignupErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof SignupErrors;
      errors[key] = issue.message;
    });

    return { ...state, success: false, errors };
  }

  // Process validated form inputs here
  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const errors: SignupErrors = { other: "Email already in use!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // const verificationToken = await generateVerificationToken(email)

  // await sendVerificationTokenByEmail(verificationToken.email, verificationToken.token);

  // Assuming some process is done and it's successful
  return { email, password, name, success: "Confirmation email sent!", errors: {} };
}
