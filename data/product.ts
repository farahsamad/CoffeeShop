import prisma from "@/lib/prisma";

interface addProductToDbProps {
  productName: string;
  productImage: string;
  productPrice: number;
  productTypeName: string;
}

export const getProducts = async () => {
  console.log("Fetching products from database...");
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        productTypeName: "asc",
      },
    });
    console.log("products", products);
    return products;
  } catch (error) {
    console.log("unknown Error getting products");
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
    const addProduct = await prisma.product.create({
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
