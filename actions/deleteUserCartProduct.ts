"use server";

import { deleteUserCartProductsDb } from "@/data/cart";

export const deleteUserCartProduct = async (userId: string) => {
  try {
    const deleteProducts = await deleteUserCartProductsDb(userId);
    return deleteProducts;
  } catch (error) {
    console.log("errrrrrrrorrr ///////////");
    return null;
  }
};
