"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { ForgotPasswordSchema } from "@/schemas";

export type ForgotPasswordState = {
  email: string;
  success?: boolean | string;
  errors?: ForgotPasswordErrors;
  callbackUrl?: string | null;
};

export type ForgotPasswordErrors = {
  email?: string;
  other?: string;
};

export async function forgotPassword(
  state: ForgotPasswordState,
  form: FormData
): Promise<ForgotPasswordState> {
  const data = Object.fromEntries(form);
  // console.log(values);
  const validatedFields = ForgotPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: ForgotPasswordErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof ForgotPasswordErrors;
      errors[key] = issue.message;
    });
    // const errors = validatedFields.error.formErrors;
    // const errors:LoginErrors = validatedFields.error.issues.reduce((acc, issue) => {
    //   acc[issue.path[0]] = issue.message;
    //   return acc;
    // }, {} as Record<string, string>);

    return { ...state, success: false, errors };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    const errors: ForgotPasswordErrors = { other: "Email does not exist!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
  return {
    email,
    success: "Reset email sent!",
    callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    errors: {},
  };
}
