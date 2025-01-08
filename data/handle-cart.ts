import { ProductDetails } from "@/components/cart";
import { getUserCartProductsById, updateCartInDb } from "./cart";
import { currentSession } from "@/lib/auth";

export const handleUpdateCartDb = async () => {
  const session = await currentSession();
  if (localStorage.getItem("AddToCart")) {
    const storedCartProducts = localStorage.getItem("AddToCart");
    if (storedCartProducts) {
      const parsedCartProducts: ProductDetails[] = JSON.parse(storedCartProducts);
      parsedCartProducts.map(async (product) => {
        if (!session?.user.id) return null;
        const userId = session?.user.id;
        await updateCartInDb({ product, userId });
      });
    }
  }
};

export const getCartProductsInDb = async () => {
  const session = await currentSession();
  if (localStorage.getItem("AddToCart") != null) {
    localStorage.removeItem("AddToCart");
  }
  if (!session?.user.id) return null;
  const userId = session?.user.id;
  const saved_products = await getUserCartProductsById(userId);
  localStorage.setItem("AddToCart", JSON.stringify(saved_products));
};
