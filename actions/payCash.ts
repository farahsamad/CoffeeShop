"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { CashPaymentSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { currentSession, currentUser } from "@/lib/auth";
import { makeCashPurchase } from "@/data/make-cash-purchase";

export type PayCashState = {
  name: string;
  email: string;
  phone: number;
  city: string;
  Address: string;
  deliveryDate: Date;
  note?: string;
  success?: string;
  errors?: PayCashErrors;
  callbackUrl?: string | null;
};

export type PayCashErrors = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  Address?: string;
  deliveryDate?: string;
  other?: string;
};

export async function payCash(state: PayCashState, form: FormData): Promise<PayCashState> {
  const session = await currentSession();
  if (!session) {
    console.log("session didn't exist");
    return redirect("/login");
  }

  const data = Object.fromEntries(form);
  const validatedFields = CashPaymentSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: PayCashErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof PayCashErrors;
      errors[key] = issue.message;
    });

    return { ...state, success: "", errors };
  }
  const {
    name,
    email,
    phone: phoneString,
    city,
    Address,
    deliveryDate: deliveryDateString,
    note,
  } = validatedFields.data;

  const phone = parseInt(phoneString.replace(/\s/g, ""), 10);
  const deliveryDate = new Date(deliveryDateString);

  const sessionEmail = session?.user.email;

  if (!sessionEmail) {
    console.log("sessionEmail didn't exist");
    return redirect("/login");
  }
  console.log("sessionEmail: ", sessionEmail);
  const existingUser = await getUserByEmail(sessionEmail);
  console.log("existingUser: ", existingUser);

  if (!existingUser || !existingUser.email) {
    console.log("existingUser didn't exist");
    return redirect("/login");
  }
  const userId = existingUser.id;

  const existPurchase = await makeCashPurchase({
    userId,
    name,
    email,
    phone,
    city,
    Address,
    deliveryDate,
    note,
  });

  if (!existPurchase) {
    const errors: PayCashErrors = { other: "Payment failed!" };
    return {
      ...state,
      success: "",
      errors,
    };
  }

  console.log("user succeed to make cash payment");

  return {
    name,
    email,
    phone,
    city,
    Address,
    deliveryDate,
    note,
    success: "Payment succeeded",
    callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    errors: {},
  };
}

// if (result?.ok) {
// return { ...state, success: true, callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT };
