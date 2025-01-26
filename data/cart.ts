import { ProductDetails } from "@/components/cart";
import prisma from "@/lib/prisma";

import { foamOptionTypes, icedOptionTypes, waterOptionTypes } from "@prisma/client";

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
    const isProductAddedToCartProducts = await prisma.addedToCartProducts.findFirst({
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
      const isProductAddedToCart = await prisma.addedToCart.create({
        data: {
          userId,
          discount,
          Tax,
          subTotal,
          total,
        },
      });
      console.log("isProductAddedToCart: ", isProductAddedToCart);

      const addProductToCart = await prisma.addedToCartProducts.create({
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
    const userCartProducts = await prisma.addedToCartProducts.findMany({
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
    const isProductAddedToCartProducts = await prisma.addedToCartProducts.findFirst({
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
      const removeProductAddedToCartProducts = await prisma.addedToCartProducts.delete({
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
    const deletedUserCartProducts = await prisma.addedToCart.deleteMany({
      where: {
        userId,
      },
    });
    return deletedUserCartProducts;
  } catch (error) {
    console.log("prisma error//////////");
    return null;
  }
};
