"use server";

// import { getUserCartProductsById } from "@/data/cart";

// export async function getUserCartProductsFromDb(userId: string) {
//   console.log("getCartProductsInDb");

//   try {
//     const saved_products = await getUserCartProductsById(userId);
//     console.log("saved_products: ", saved_products);
//     return saved_products;
//   } catch (error) {
//     console.log(
//       "///////////////////////////////////////////////////////////////////////////////////////////////Error in updating cart:",
//       error
//     );
//     return null;
//   }
// }
// @/actions/getUserCartProducts.ts

import { getUserCartProductsById } from "@/data/cart";

export async function getUserCartProductsFromDb(userId: string) {
  console.log("getCartProductsInDb called with userId:", userId);

  try {
    const saved_products = await getUserCartProductsById(userId);
    console.log("saved_products:", saved_products);
    return saved_products;
  } catch (error) {
    console.error("Error fetching products from database:", error);
    throw error;
  }
}
