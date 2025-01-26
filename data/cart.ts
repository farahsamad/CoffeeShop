import { ProductDetails } from "@/components/cart";
import { db } from "@/lib/prisma";
// import { foamOptionTypes, icedOptionTypes, waterOptionTypes } from "@prisma/client";

interface CardPurchaseProps {
  product: ProductDetails;
  userId: string;
}

interface RemoveProductProps {
  productId: string;
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
    console.log("isProductAddedToCartProducts : ", isProductAddedToCartProducts);
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
      console.log("isProductAddedToCart: ", isProductAddedToCart);

      const addProductToCart = await db.addedToCartProducts.create({
        data: {
          ProductId: product.id,
          userId,
          AddedToCartId: isProductAddedToCart.id,
          productQuantity: product.product_quantity,
          waterOption: product.waterOption as "No_Water" | "Water" | null,
          icedOption: product.icedOption as "Light_Ice" | "Extra_Ice" | "No_Ice" | null,
          foamOption: product.foamOption as "Light_Foam" | "Extra_Foam" | "No_Foam" | null,
        },
      });
      console.log("addProductToCart: ", addProductToCart);
      return addProductToCart;
    }
    if (isProductAddedToCartProducts) {
      return true;
    }
    console.log("already updateCartInDb////////////");
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
    console.log(
      "///////////////////////////////////////////////////////////////////////////////////////////////Error updating cart:",
      error
    );
    return null;
  }
};

export const removeProductFromCartFromDb = async ({ productId, userId }: RemoveProductProps) => {
  try {
    const isProductAddedToCartProducts = await db.addedToCartProducts.findFirst({
      where: {
        ProductId: productId,
        userId,
      },
      include: {
        product: true,
        addedToCart: true,
      },
    });
    console.log("isProductAddedToCartProducts : ", isProductAddedToCartProducts);
    if (isProductAddedToCartProducts) {
      const removeProductAddedToCartProducts = await db.addedToCartProducts.delete({
        where: {
          id: isProductAddedToCartProducts.id,
        },
      });
      console.log(
        "removeProductAddedToCartProducts////////////:",
        removeProductAddedToCartProducts
      );
      return removeProductAddedToCartProducts;
    }
    if (!isProductAddedToCartProducts) {
      return "Product not found";
    }
    console.log("already updateCartInDb////////////");
    return null;
  } catch (error) {
    console.log("Error updating cart:", error);
    return null;
  }
};

export const deleteUserCartProductsDb = async (userId: string) => {
  try {
    const deletedUserCartProducts = await db.addedToCart.deleteMany({
      where: {
        userId,
      },
    });
    return deletedUserCartProducts;
  } catch (error) {
    console.log("db error//////////");
    return null;
  }
};
