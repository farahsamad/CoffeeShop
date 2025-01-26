"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/prisma";
import { ResetPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/reset-password-token";

export type ResetPasswordState = {
  password: string;
  confirmPassword: string;
  token: string;
  success?: boolean | string;
  errors?: ResetPasswordErrors;
  callbackUrl?: string | null;
};

export type ResetPasswordErrors = {
  password?: string;
  confirmPassword?: string;
  token?: string;
  other?: string;
};

export async function resetPassword(
  state: ResetPasswordState,
  form: FormData
): Promise<ResetPasswordState> {
  const data = Object.fromEntries(form);
  // console.log(values);
  const validatedFields = ResetPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: ResetPasswordErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof ResetPasswordErrors;
      errors[key] = issue.message;
    });
    // const errors = validatedFields.error.formErrors;
    // const errors:LoginErrors = validatedFields.error.issues.reduce((acc, issue) => {
    //   acc[issue.path[0]] = issue.message;
    //   return acc;
    // }, {} as Record<string, string>);

    return { ...state, success: false, errors };
  }

  const { password, confirmPassword, token } = validatedFields.data;
  if (!token) {
    const errors: ResetPasswordErrors = { other: "Missing token!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  if (password !== confirmPassword) {
    const errors: ResetPasswordErrors = { other: "Password don't match" };
    return {
      ...state,
      success: false,
      errors,
    };
  }
  // console.log(values);
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    const errors: ResetPasswordErrors = { other: "Invalid token!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    const errors: ResetPasswordErrors = { other: "Token has expired!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    const errors: ResetPasswordErrors = { other: "Email does not exist!" };
    return {
      ...state,
      success: false,
      errors,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return {
    password,
    confirmPassword,
    token,
    success: "Password updated!",
    callbackUrl: state.callbackUrl,
    errors: {},
  };
}
