import { foamOptionTypes, icedOptionTypes, waterOptionTypes } from "@prisma/client";
import Link from "next/link";
import React from "react";
import LoadingImage from "./ui/loading-image";
import { ProductDetails } from "./cart";

interface CoffeeTypeCartProps {
  product: ProductDetails;
}

const CoffeeProductCart = ({ product }: CoffeeTypeCartProps) => {
  return (
    <div key={`coffee-${product.id}`}>
      <div className="first-cup">
        <Link
          href={{
            pathname: `/menu/${product.id}/${product.productName}`,
            query: {
              product_id: product.id,
              product_name: product.productName,
              product_image: product.productImage,
              product_price: product.productPrice,
              coffeeType_name: product.productTypeName,
            },
          }}

          // state={coffeeState}
        >
          <div className="first-cup-image">
            <LoadingImage src={`/image/${product.productImage}`} imageAlt={product.productName} />
          </div>
          <div className="first-cup-name cursor-pointer min-h-fit text-center">
            {product.productName}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CoffeeProductCart;
