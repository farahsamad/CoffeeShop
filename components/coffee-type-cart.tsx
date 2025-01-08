import { foamOptionTypes, icedOptionTypes, waterOptionTypes } from "@prisma/client";
import React from "react";
import CoffeeProductCart from "./coffee-product-cart";
import { ProductDetails } from "./cart";

interface CoffeeTypeCartProps {
  value: string;
  groupedProducts: {
    [key: string]: ProductDetails[];
  };
}

const CoffeeTypeCart = ({ value, groupedProducts }: CoffeeTypeCartProps) => {
  return (
    <div className="coffee-type-container" key={`type-${value}`}>
      <div className="hot-coffees-sentence">
        <div className="menu-sentence" id={value}>
          {value}
        </div>
        <hr />
      </div>
      <div className="coffees-content">
        <div className="coffees-content-container">
          {groupedProducts[value].map((product) => (
            <CoffeeProductCart key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeeTypeCart;
