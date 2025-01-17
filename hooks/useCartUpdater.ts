import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProductDetails } from "@/components/cart";
import { updateCartInDb } from "@/data/cart";
import { useCallback } from "react";

export const useCartUpdater = () => {
  const session = useCurrentUser();
  const handleUpdateCartDb = useCallback(async () => {
    console.log("handleUpdateCartDb");
    if (localStorage.getItem("AddToCart")) {
      console.log("AddToCart");
      const storedCartProducts = localStorage.getItem("AddToCart");
      if (storedCartProducts) {
        console.log("storedCartProducts");
        const parsedCartProducts: ProductDetails[] = JSON.parse(storedCartProducts);
        parsedCartProducts.forEach(async (product, index) => {
          if (!session?.id) return null;
          const userId = session.id;
          // const update = await updateCartInDb({ product, userId });
          // console.log("update: ", update);
          const response = await fetch("/api/updateCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product, userId }),
          });
          if (response.ok) {
            console.log("update performed in hooks");
            const update = await response.json();
            console.log("update in hooks", update);
            console.log("update: ", update);
            if (index === parsedCartProducts.length - 1) {
              localStorage.removeItem("AddToCart");
              console.log("removeItem");
            }
          } else {
            console.error("Failed to update cart:", await response.text());
          }
        });
      }
    }
  }, [session]);
  return { handleUpdateCartDb };
};
