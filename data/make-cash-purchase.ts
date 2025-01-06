import { db } from "@/lib/db";
import { PaymentMethod } from "@prisma/client";

interface CashPurchaseProps {
  userId: string;
  name: string;
  email: string;
  phone: number;
  city: string;
  Address: string;
  deliveryDate: Date;
  note?: string;
}

export const makeCashPurchase = async ({
  userId,
  name,
  email,
  phone,
  city,
  Address,
  deliveryDate,
  note,
}: CashPurchaseProps) => {
  try {
    const createPayment = await db.payment.create({
      data: {
        userId,
        method: PaymentMethod.Cash,
        name,
        email,
        phone,
        city,
        Address,
        deliveryDate,
        note,
      },
    });
    return createPayment;
  } catch (error) {
    console.log(
      "//////////////////////////////////////////////////////////////////////////////////////////////////////////"
    );
    return null;
  }
};
