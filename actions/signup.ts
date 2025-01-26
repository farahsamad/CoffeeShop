"use server";

import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";

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
  userId?: string;
  name: string;
  email: string;
  password: string;
  verificationCode?: boolean;
  success: boolean | string;
  errors?: SignupErrors;
  callbackUrl?: string | null;
};
export type SignupErrors = {
  userId?: string;
  email?: string;
  password?: string;
  name?: string;
  verificationCode?: string;
  other?: string;
};

export async function signup(state: SignupState, form: FormData): Promise<SignupState> {
  console.log("start//////////////////////////");
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
  const { email, password, name, code } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  console.log("existingUser: ", existingUser);

  if (existingUser) {
    if (!code) {
      const errors: SignupErrors = { other: "Email already in use!" };
      return {
        ...state,
        success: false,
        errors,
      };
    }
  }
  if (existingUser && existingUser.email && !existingUser.emailVerified) {
    console.log("existing user but email not verified");
    if (code) {
      const existingToken = await getVerificationTokenByToken(code);
      if (!existingToken) {
        const errors: SignupErrors = { other: "Token does not exist!" };
        return {
          ...state,
          success: false,
          errors,
        };
      }
      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
        const errors: SignupErrors = { other: "Token has expired!" };
        return {
          ...state,
          success: false,
          errors,
        };
      }

      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          emailVerified: new Date(),
          email: existingToken.email,
        },
      });

      await prisma.verificationToken.delete({
        where: { id: existingToken.id },
      });
      console.log("//////////existingUser email verified");
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
              const credentialsErrors: SignupErrors = { other: "Invalid credentials" };
              return {
                ...state,
                success: false,
                errors: credentialsErrors,
              };
            default:
              const defaultErrors: SignupErrors = { other: "Something went wrong!" };
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
        userId: existingUser?.id,
        email,
        password,
        name,
        verificationCode: false,
        success: "Signin success!",
        callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
        errors: {},
      };
    } else {
      console.log("//////////existingUser email not verified and no code");
      const errors: SignupErrors = { other: "Token does not exist!" };
      return {
        ...state,
        success: false,
        errors,
      };
    }
  }

  // console.log("start//////////////////////////");
  // const data = Object.fromEntries(form);
  // const validatedFields = SignupSchema.safeParse(data);
  // if (!validatedFields.success) {
  //   const errors: SignupErrors = {};
  //   validatedFields.error.issues.forEach((issue) => {
  //     const key = issue.path[0] as keyof SignupErrors;
  //     errors[key] = issue.message;
  //   });

  //   return { ...state, success: false, errors };
  // }
  // const { email, password, name, code } = validatedFields.data;
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const existingUser = await getUserByEmail(email);
  // console.log("existingUser: ", existingUser);
  // if (existingUser) {
  //   const errors: SignupErrors = { other: "Email already in use!" };
  //   return {
  //     ...state,
  //     success: false,
  //     errors,
  //   };
  // }
  console.log("no code and no existing user");
  console.log("no code &&&&& no existing user");
  console.log("name: ", name);
  console.log("email: ", email);
  console.log("hashedPassword: ", hashedPassword);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully");
  } catch (error: any) {
    console.error("Error creating user:", error.message);
  }

  console.log("//////////existingUser email not verified");
  const verificationToken = await generateVerificationToken(email);
  console.log("//////////verificationToken: ", verificationToken);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  console.log("//////////sendVerificationEmail");
  return {
    email,
    password,
    name,
    verificationCode: true,
    success: "Confirmation email sent!",
    errors: {},
  };
}
