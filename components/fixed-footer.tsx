import React, { useEffect, useState } from "react";
import "@/styles/navbar.css";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";
import { ProductDetails } from "./cart";
import { useMyContext } from "@/context/context";

function FixedFooter() {
  // const cartNumber: ProductDetails[] = JSON.parse(localStorage.getItem("AddToCart")!) || [];
  const { barVisibility, aboutRef, pageShowHeader, sectionsRef, update, updatePerformed } =
    useMyContext();

  const [cartNumber, setCartNumber] = useState<ProductDetails[]>([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("AddToCart") || "[]");
    setCartNumber(cartItems);
  }, [update]);

  return (
    <div
      id="fixed-footer"
      className="bg-gray-500 fixed bottom-0 w-full h-[64px] text-white cursor-pointer transform z-[100] shadow-2xl shadow-emerald-200"
    >
      <div id="cart-icon-container" className="h-full w-full flex justify-end items-center pr-4">
        <div id="cart-icon" className="relative inline-block h-full w-fit">
          <Link href="/cart">
            <FaShoppingBasket className="cart-icon pt-[12px] h-12 w-7" />
          </Link>{" "}
          <div
            id="cart-products-number"
            className="absolute top-[8px] right-[-8px] text-xs !text-[12px] rounded-full px-[5px] py-0 text-white bg-gray-600"
          >
            {cartNumber.length > 0 ? cartNumber.length : 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixedFooter;
