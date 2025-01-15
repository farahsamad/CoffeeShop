"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserCartProductsFromDb } from "./getUserCartProducts";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
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
export type LoginState = {
  userId: string;
  email: string;
  password: string;
  name?: string;
  twoFactor?: boolean;
  success?: boolean | string;
  errors?: LoginErrors;
  callbackUrl?: string | null;
};

export type LoginErrors = {
  userId?: string;
  email?: string;
  password?: string;
  name?: string;
  twoFactor?: string;
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
  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  console.log("//////////existingUser: ", existingUser);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    const errors: LoginErrors = { other: "Email does not exist!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        const errors: LoginErrors = { other: "Invalid code!" };
        return {
          ...state,
          success: false,
          errors,
        };
      }

      if (twoFactorToken.token !== code) {
        const errors: LoginErrors = { other: "Invalid code!" };
        return {
          ...state,
          success: false,
          errors,
        };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        const errors: LoginErrors = { other: "Code expired!" };
        return {
          ...state,
          success: false,
          errors,
        };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        userId: existingUser.id,
        email,
        password,
        twoFactor: true,
        success: "user succeed to login",
        callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
        errors: {},
      };
    }
  }

  // if (!existingUser.emailVerified) {
  // }
  // if(existingUser.isTwoFactorEnabled && existingUser.email){}

  console.log("credentials: email is: ", email, "password is: ", password);

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Disable auto-redirect to handle it manually
      // redirectTo: undefined,
      // redirectTo: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

  // const saved_products = await getUserCartProductsFromDb(existingUser.id);

  // console.log("saved_products in login: ", saved_products);
  console.log("user succeed to login");
  return {
    userId: existingUser.id,
    email,
    password,
    twoFactor: false,
    success: "user succeed to login",
    callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    errors: {},
  };
}

// if (result?.ok) {
// return { ...state, success: true, callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT };
