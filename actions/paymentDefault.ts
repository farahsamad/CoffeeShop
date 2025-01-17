"use server";

import { getPaymentInputsDefaultValue } from "@/data/payment";
import { currentSession } from "@/lib/auth";

export const paymentDefault = async (userId: string) => {
  try {
    const session = await currentSession();
    const data = await getPaymentInputsDefaultValue(userId);
    const returnedValue = {
      email: session?.user.email ? session?.user.email : "",
      name: session?.user.name ? session?.user.name : "",
      address: data?.Address ? data?.Address : "",
      city: data?.city ? data?.city : "",
      phone: data?.phone ? data?.phone : undefined,
    };
    console.log("returnedValue: ", returnedValue);
    return returnedValue;
  } catch (error) {
    console.log("errorrrrr /////////////////");
    return null;
  }
};
