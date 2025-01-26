"use server";

import { redirect } from "next/navigation";
import { CashPaymentSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { currentSession } from "@/lib/auth";
import { makeCashPurchase } from "@/data/make-cash-purchase";
import { ProductDetails } from "@/components/cart";
import { PayCardCashState, PayCashCardErrors } from "./payCard";

export async function payCash(payload: {
  state: PayCardCashState;
  form: FormData;
  subTotalPrice: number;
  totalPrice: number;
  taxesPrice: number;
  discount: number;
  cartProducts: ProductDetails[];
}): Promise<PayCardCashState> {
  const { state, form, subTotalPrice, totalPrice, taxesPrice, discount, cartProducts } = payload;
  // ... existing logic
  // const updatedState = { ...state, subTotalPrice, totalPrice, taxesPrice, discount };
  const session = await currentSession();
  if (!session) {
    console.log("session didn't exist");
    return redirect("/login");
  }

  const data = Object.fromEntries(form);
  const validatedFields = CashPaymentSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: PayCashCardErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof PayCashCardErrors;
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
    subTotalPrice,
    totalPrice,
    taxesPrice,
    discount,
    cartProducts,
  });

  if (!existPurchase) {
    const errors: PayCashCardErrors = { other: "Payment failed!" };
    return {
      ...state,
      success: "",
      errors,
    };
  }

  console.log("user succeed to make cash payment");

  return {
    name: existPurchase.createPayment.name,
    email,
    phone,
    city,
    Address,
    deliveryDate,
    note,
    paymentId: existPurchase.createPayment.id,
    success: "Payment succeeded!",
    callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    errors: {},
  };
}

// if (result?.ok) {
// return { ...state, success: true, callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT };
