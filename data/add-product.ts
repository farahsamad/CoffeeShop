import { db } from "@/lib/db";

interface addProductToDbProps {
  productName: string;
  productImage: string;
  productPrice: number;
  productTypeName: string;
}

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
