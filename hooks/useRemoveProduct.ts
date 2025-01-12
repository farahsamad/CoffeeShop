import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProductDetails } from "@/components/cart";
import { useCallback } from "react";

interface handleRemoveProductCartDbProps {
  productId: string;
}

export const useRemoveProduct = () => {
  const session = useCurrentUser();
  const handleRemoveProductCartDb = useCallback(
    async ({ productId }: handleRemoveProductCartDbProps) => {
      console.log("handleRemoveProductCartDb");
      if (!session?.id) return null;
      const userId = session.id;
      const response = await fetch("/api/removeProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, userId }),
      });
      if (response.ok) {
        const update = await response.json();
        console.log("Product removed");
      } else {
        console.error("Failed to update cart:", await response.text());
      }
    },
    [session]
  );
  return { handleRemoveProductCartDb };
};
