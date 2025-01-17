import { db } from "@/lib/db";

export const getPaymentInputsDefaultValue = (userId: string) => {
  try {
    const PaymentInputsDefaultValue = db.payment.findFirst({
      where: {
        userId,
      },
      include: {
        paymentProducts: true,
      },
    });
    return PaymentInputsDefaultValue;
  } catch (error) {
    console.log("biggggggggggggggggg error");
    return null;
  }
};
