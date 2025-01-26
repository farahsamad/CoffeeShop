import { db } from "@/lib/db";

interface addProductToDbProps {
  productName: string;
  productImage: string;
  productPrice: number;
  productTypeName: string;
}

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      orderBy: {
        productTypeName: "asc",
      },
    });
    console.log("products", products);
    return products;
  } catch (error) {
    console.log("//////////////////////////////////////////");
    return null;
  }
};

export const addProductToDb = async ({
  productName,
  productImage,
  productPrice,
  productTypeName,
}: addProductToDbProps) => {
  try {
    const addProduct = await db.product.create({
      data: {
        productName,
        productImage,
        productPrice,
        productTypeName,
      },
    });
    return addProduct;
  } catch (error) {
    console.log(
      "//////////////////////////////////////////////////////////////////////////////////////"
    );
    return null;
  }
};
