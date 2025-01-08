// import { ProductDetails } from "@/components/cart";
// import { db } from "@/lib/db";
// import { PaymentMethod } from "@prisma/client";

// interface CardPurchaseProps {
//   product: ProductDetails;
// }

// export const updateCartInDb = async ({ product }: CardPurchaseProps) => {
//   try {
//       const isProductAddedToCart = await db.addedToCartProducts.findFirst({
//         where: {
//           ProductId: product.product_id,
//         },
//       });
//       if (!isProductAddedToCart) {
//         const addProductToCart = await db.addedToCartProducts.create({
//             data: {
//                 ProductId: product.product_id,
//                 // userId:
//                 // AddedToCartId:
//                 productQuantity: product.product_quantity,
//                 waterOption: product.product_water,
//                 icedOption: product.product_ice,
//                 foamOption: product.product_foam,
//             },
//         });
//       }

//   } catch (error) {
//     console.log(
//       "//////////////////////////////////////////////////////////////////////////////////////////////////////////"
//     );
//     return null;
//   }
// };
import { ProductDetails } from "@/components/cart";
import { db } from "@/lib/db";
import { foamOptionTypes, icedOptionTypes, PaymentMethod, waterOptionTypes } from "@prisma/client";

interface CardPurchaseProps {
  product: ProductDetails;
  userId: string;
}

export const updateCartInDb = async ({ product, userId }: CardPurchaseProps) => {
  try {
    const discount = 10;
    const Tax = 10;
    const subTotal = 10;
    const total = 10;
    const isProductAddedToCartProducts = await db.addedToCartProducts.findFirst({
      where: {
        ProductId: product.id,
      },
      include: {
        product: true,
        addedToCart: true,
      },
    });
    if (!isProductAddedToCartProducts) {
      const isProductAddedToCart = await db.addedToCart.create({
        data: {
          userId,
          discount,
          Tax,
          subTotal,
          total,
        },
      });
      const addProductToCart = await db.addedToCartProducts.create({
        data: {
          ProductId: product.id,
          userId,
          AddedToCartId: isProductAddedToCart.id,
          productQuantity: product.product_quantity,
          waterOption: product.waterOption as waterOptionTypes | null,
          icedOption: product.icedOption as icedOptionTypes | null,
          foamOption: product.foamOption as foamOptionTypes | null,
        },
      });
      return addProductToCart;
    }
    return null;
  } catch (error) {
    console.log("Error updating cart:", error);
    return null;
  }
};

export const getUserCartProductsById = async (userId: string) => {
  try {
    const userCartProducts = await db.addedToCartProducts.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
        addedToCart: true,
      },
    });
    return userCartProducts;
  } catch (error) {
    console.log("Error updating cart:", error);
    return null;
  }
};
