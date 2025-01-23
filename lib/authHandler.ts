"use client";

import { fetchCartProducts } from "@/components/auth/login-form";
import { ProductDetails } from "@/components/cart";
import { useMyContext } from "@/context/context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect } from "react";

const AuthEventsHandler = () => {
  const { updatePerformed } = useMyContext();
  const user = useCurrentUser();

  useEffect(() => {
    if (user?.id) {
      if (localStorage.getItem("AddToCart") === null) {
        console.log("authHandler user?.id: ", user?.id);
        fetchCartProducts(user.id).then((saved_products) => {
          console.log("saved_products here:", saved_products);
          if (saved_products) {
            // const p = { id: string;
            //   productName: string;
            //   productImage: string;
            //   productTypeName: string;
            //   product_size: string;
            //   waterOption?: waterOptionTypes | null;
            //   icedOption?: icedOptionTypes | null;
            //   foamOption?: foamOptionTypes | null;
            //   product_quantity: number;
            //             productPrice: number;
            //           }
            saved_products.map((product) => {
              const item: ProductDetails = {
                id: product.product.id,
                productName: product.product.productName,
                productImage: product.product.productImage,
                productTypeName: product.product.productTypeName,
                product_size: product.productSizes,
                waterOption: product.waterOption,
                icedOption: product.icedOption,
                foamOption: product.foamOption,
                product_quantity: product.productQuantity,
                productPrice: product.product.productPrice,
              };
              if (localStorage.getItem("AddToCart") !== null) {
                const new_saved_products: ProductDetails[] = JSON.parse(
                  localStorage.getItem("AddToCart")!
                );
                new_saved_products.push(item);
                localStorage.setItem("AddToCart", JSON.stringify(new_saved_products));
              } else {
                const new_items: ProductDetails[] = [];
                new_items.push(item);
                localStorage.setItem("AddToCart", JSON.stringify(new_items));
              }
              updatePerformed();
            });

            // setCartProducts(saved_products);
          } else {
            updatePerformed();
          }
        });
      }
    }
  }, [user?.id]);

  return null;
};

export default AuthEventsHandler;
