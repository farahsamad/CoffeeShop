"use server";

import { removePaymentById } from "@/data/payment";

export const removePayment = async (id: string) => {
  try {
    const removedPayment = await removePaymentById(id);
    if (removedPayment) {
      console.log("removedPayment falseeeeee///////////");
      return true;
    }
    console.log("trueeeeeeee");
    return false;
  } catch (error) {
    console.log("error in removing payment//////");
    return false;
  }
};
