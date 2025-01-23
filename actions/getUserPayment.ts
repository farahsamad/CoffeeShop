"use server";

import { getUserPayments } from "@/data/payment";
import { currentSession } from "@/lib/auth";

export const getUserPayment = async (userId: string) => {
  try {
    const session = await currentSession();
    const data = await getUserPayments(userId);
    console.log("returnedValue: ", data);
    return data;
  } catch (error) {
    console.log("errorrrrr /////////////////");
    return null;
  }
};
