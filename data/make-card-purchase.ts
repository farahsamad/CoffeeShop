import { db } from "@/lib/db";
import { PaymentMethod } from "@prisma/client";

interface CardPurchaseProps {
  userId: string;
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
}

export const makeCardPurchase = async ({
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
}: CardPurchaseProps) => {
  try {
    console.log("userId: ", userId);
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("phone: ", phone);
    console.log("nameOnCard: ", nameOnCard);
    console.log("cardNumber: ", cardNumber);
    console.log("cardExpire: ", cardExpire);
    console.log("cvv: ", cvv);
    console.log("city: ", city);
    console.log("Address: ", Address);
    console.log("deliveryDate: ", deliveryDate);
    console.log("note: ", note);
    const discount = 10;
    const Tax = 10;
    const subTotal = 10;
    const total = 10;
    const createPayment = await db.payment.create({
      data: {
        userId,
        method: PaymentMethod.Card,
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
        discount,
        Tax,
        subTotal,
        total,
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
