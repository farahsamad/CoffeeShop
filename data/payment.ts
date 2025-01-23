import { db } from "@/lib/db";

export const getUserPayments = async (userId: string) => {
  try {
    const userPayments = await db.payment.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        deliveryDate: true,
        city: true,
        Address: true,
        phone: true,
        total: true,
        paymentProducts: true,
      },
    });
    return userPayments;
  } catch (error) {
    console.log("biggggggggggggggggg error");
    return null;
  }
};

export const removePaymentById = async (id: string) => {
  try {
    const removePayment = await db.payment.delete({
      where: {
        id,
      },
    });
    return removePayment;
  } catch (error) {
    console.log("error ///////////////");
    return null;
  }
};
