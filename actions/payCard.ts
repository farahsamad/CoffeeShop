"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { CardPaymentSchema, CashPaymentSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { currentSession, currentUser } from "@/lib/auth";
import { makeCashPurchase } from "@/data/make-cash-purchase";
import { makeCardPurchase } from "@/data/make-card-purchase";

export type PayCardState = {
  name: string;
  email: string;
  phone: number;
  nameOnCard: string;
  cardNumber: number;
  cardExpire: string;
  cvv: string;
  city: string;
  Address: string;
  deliveryDate: Date;
  note?: string;
  success?: string;
  errors?: PayCardErrors;
  callbackUrl?: string | null;
};

export type PayCardErrors = {
  name?: string;
  email?: string;
  phone?: string;
  nameOnCard?: string;
  cardNumber?: string;
  cardExpire?: string;
  cvv?: string;
  city?: string;
  Address?: string;
  deliveryDate?: string;
  other?: string;
};

export async function payCard(state: PayCardState, form: FormData): Promise<PayCardState> {
  const session = await currentSession();
  if (!session) {
    console.log("session didn't exist");
    return redirect("/login");
  }

  const data = Object.fromEntries(form);
  const validatedFields = CardPaymentSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: PayCardErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof PayCardErrors;
      errors[key] = issue.message;
    });

    return { ...state, success: "", errors };
  }
  const {
    name,
    email,
    phone: phoneString,
    nameOnCard,
    cardNumber: cardNumberString,
    cardExpire,
    cvv,
    city,
    Address,
    deliveryDate: deliveryDateString,
    note,
  } = validatedFields.data;

  const phone = parseInt(phoneString.replace(/\s/g, ""), 10);
  const cardNumber = parseInt(cardNumberString.replace(/\s/g, ""), 10);
  const deliveryDate = new Date(deliveryDateString);

  console.log("phoneString: ", phoneString);
  console.log("phone: ", phone);
  console.log("nameOnCard: ", nameOnCard);
  console.log("cardNumberString: ", cardNumberString);
  console.log("cardNumber: ", cardNumber);
  console.log("cardExpire: ", cardExpire);
  console.log("cvv: ", cvv);

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

  const existPurchase = await makeCardPurchase({
    userId,
    name,
    email,
    phone,
    nameOnCard,
    cardNumber,
    cardExpire,
    cvv,
    city,
    Address,
    deliveryDate,
    note,
  });

  if (!existPurchase) {
    const errors: PayCardErrors = { other: "Payment failed!" };
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
    nameOnCard,
    cardNumber,
    cardExpire,
    cvv,
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
