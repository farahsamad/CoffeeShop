import React, { useEffect, useState } from "react";
import "@/styles/navbar.css";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";

interface productDetails {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  coffeeType_name: string;
  product_size: string;
  product_water: string;
  product_ice: string;
  product_foam: string;
  product_quantity: number;
  product_price: number;
}

function FixedFooter() {
  // const cartNumber: productDetails[] = JSON.parse(localStorage.getItem("AddToCart")!) || [];

  const [cartNumber, setCartNumber] = useState<productDetails[]>([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("AddToCart") || "[]");
    setCartNumber(cartItems);
  }, []);

  return (
    <div
      id="fixed-footer"
      className="bg-gray-500 fixed bottom-0 w-full h-[64px] text-white cursor-pointer transform z-[100]"
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
