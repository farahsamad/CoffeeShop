import { ProductDetails } from "@/components/cart";
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
  subTotalPrice: number;
  totalPrice: number;
  taxesPrice: number;
  discount: number;
  cartProducts: ProductDetails[];
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
  subTotalPrice,
  totalPrice,
  taxesPrice,
  discount,
  cartProducts,
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
        Tax: taxesPrice,
        subTotal: subTotalPrice,
        total: totalPrice,
      },
    });
    console.log("add product to payment");
    const addedProducts = cartProducts.map(async (product) => {
      const createPaymentProducts = await db.paymentProducts.create({
        data: {
          productId: product.id,
          paymentId: createPayment.id,
          productQuantity: product.product_quantity,
          productSizes: product.product_size,
          waterOption: product.waterOption,
          icedOption: product.icedOption,
          foamOption: product.foamOption,
        },
      });
      console.log("createPaymentProducts: ", createPaymentProducts);
      console.log("add product to paymentProducts");
    });
    return { addedProducts, createPayment };
  } catch (error) {
    console.log(
      "//////////////////////////////////////////////////////////////////////////////////////////////////////////"
    );
    return null;
  }
};
