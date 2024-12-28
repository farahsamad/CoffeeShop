import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z
    .string()
    .min(8, { message: "At least 8 characters required!" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .trim(),

  // password: z.string().min(6, {
  //   message: "Minimum 6 characters required!",
  // }),
  name: z.string().min(1, {
    message: "name is required!",
  }),
});
