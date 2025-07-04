import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
  code: z.optional(z.string()),
  // rememberMe: z.optional(z.boolean()),
  rememberMe: z.optional(
    z.preprocess((value) => {
      if (typeof value === "string") {
        if (value === "true") {
          return true;
        } else if (value === "false") {
          return false;
        }
      }
      return value;
    }, z.boolean())
  ),
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
  code: z.optional(z.string()),
});

export const CashPaymentSchema = z.object({
  name: z.string().min(2, { message: "Name is required!" }),
  email: z.string().email({ message: "Email is required!" }),
  phone: z.string().min(10, { message: "Phone number is required!" }),
  city: z
    .string()
    .min(1, { message: "City is required!" })
    .regex(/^[a-zA-Z\s]+$/, "Not valid city"),
  Address: z
    .string()
    .min(15, { message: "Address is required!" })
    .regex(/^[a-zA-Z0-9\s,.'-]{15,}$/, "Not valid address"),
  deliveryDate: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Date is required!"),
  note: z.string(),
});

export const CardPaymentSchema = z.object({
  name: z.string().min(2, { message: "Name is required!" }),
  email: z.string().email({ message: "Email is required!" }),
  phone: z.string().min(10, { message: "Phone number is required!" }),
  nameOnCard: z.string().min(1, {
    message: "Name On Card is required!",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardExpire: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Not valid expiration date"),
  // z
  // .string()
  // .regex(/([0-9]{2})\/([0-9]{4})/, {
  //   message: "Not valid expiration date",
  // }),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  city: z
    .string()
    .min(1, { message: "City is required!" })
    .regex(/^[a-zA-Z\s]+$/, "Not valid city"),
  Address: z
    .string()
    .min(15, { message: "Address is required!" })
    .regex(/^[a-zA-Z0-9\s,.'-]{15,}$/, "Not valid address"),
  deliveryDate: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, "Date is required!"),
  // .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Date is required!"),
  note: z.string(),
});

export const AddProductSchema = z.object({
  productName: z.string().min(1, {
    message: "Product name is required!",
  }),
  productImage: z.string().min(1, {
    message: "Product image is required!",
  }),
  productPrice: z.string().min(1, {
    message: "Product price is required!",
  }),
  productTypeName: z.string().min(1, {
    message: "Product type name is required!",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "At least 8 characters required!" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .trim(),
  confirmPassword: z
    .string()
    .min(8, { message: "At least 8 characters required!" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .trim(),
  token: z.string(),
});

export const twoFactorAuthenticationSchema = z.object({
  isTwoFactorEnabled: z.optional(z.boolean()),
});
