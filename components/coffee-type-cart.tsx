import { foamOptionTypes, icedOptionTypes, waterOptionTypes } from "@prisma/client";
import React, { useEffect, useState } from "react";
import CoffeeProductCart from "./coffee-product-cart";
import { ProductDetails } from "./cart";

interface CoffeeTypeCartProps {
  value: string;
  groupedProducts: {
    [key: string]: ProductDetails[];
  };
}

const CoffeeTypeCart = ({ value, groupedProducts }: CoffeeTypeCartProps) => {
  const [containerId, setContainerId] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // console.log("hash: ", hash);
      var element = hash.split("#").join("");
      // console.log("element one: ", element);
      element = element.split("%20").join(" ");
      if (element === containerId) {
        const elementId = document.getElementById(element);
        // console.log("element two: ", element);
        // console.log("document.getElementById(elementId): ", document.getElementById(element));
        if (elementId) {
          elementId.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
          );
        }
      }
    }
  }, [containerId, value]);
  useEffect(() => {
    if (value.includes(" ")) {
      setContainerId(value.replace(/ /g, "-"));
    } else {
      setContainerId(value);
    }
  }, [value]);
  return (
    <div className="coffee-type-container" key={`type-${value}`}>
      <div className="hot-coffees-sentence">
        <div className="menu-sentence" id={containerId}>
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
