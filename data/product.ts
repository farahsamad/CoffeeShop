import { db } from "@/lib/db";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      orderBy: {
        productTypeName: "asc",
      },
    });
    return products;
  } catch (error) {
    console.log("//////////////////////////////////////////");
    return null;
  }
};
