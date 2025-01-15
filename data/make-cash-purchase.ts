import { ProductDetails } from "@/components/cart";
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
  subTotalPrice: number;
  totalPrice: number;
  taxesPrice: number;
  discount: number;
  cartProducts: ProductDetails[];
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
  subTotalPrice,
  totalPrice,
  taxesPrice,
  discount,
  cartProducts,
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
        discount,
        Tax: taxesPrice,
        subTotal: subTotalPrice,
        total: totalPrice,
      },
    });
    cartProducts.map((product) => {
      const createPaymentProducts = db.paymentProducts.create({
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
    });

    return createPayment;
  } catch (error) {
    console.log(
      "//////////////////////////////////////////////////////////////////////////////////////////////////////////"
    );
    return null;
  }
};
