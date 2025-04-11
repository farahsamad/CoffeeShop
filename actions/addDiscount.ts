"use server";

import { checkCouponCode } from "@/data/discount";

export const addDiscount = async (couponCode: string) => {
  try {
    const checkDiscount = await checkCouponCode(couponCode);
    return checkDiscount;
  } catch (error) {
    console.log("errrrrrrrorrr ///////////");
    return null;
  }
};
