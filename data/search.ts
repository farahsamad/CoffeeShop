import { db } from "@/lib/db";

export const searchProduct = async (search: string) => {
  try {
    const searchResult = await db.product.findMany({
      where: {
        OR: [
          {
            productName: {
              startsWith: search,
            },
          },
          {
            productTypeName: {
              startsWith: search,
            },
          },
        ],
      },
      select: {
        id: true,
        productName: true,
        productTypeName: true,
        productImage: true,
        productPrice: true,
      },
    });
    console.log("searchResult in db: ", searchResult);
    return searchResult;
  } catch (error) {
    console.log("error in search:", error);
    return null;
  }
};
