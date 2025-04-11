import { db } from "@/lib/prisma";

export const checkCouponCode = async (couponCode: string) => {
  try {
    const existingCoupon = await db.couponDiscount.findFirst({
      where: { couponCode },
    });
    return existingCoupon;
  } catch (error) {
    return null;
  }
};
