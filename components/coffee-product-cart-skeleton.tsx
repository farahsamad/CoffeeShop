import React from "react";
import { ProductDetails } from "./cart";
import { Skeleton } from "./ui/skeleton";

const CoffeeProductCartSkeleton = () => {
  return (
    <div>
      <div className="first-cup">
        <div className="first-cup-image">
          <Skeleton className="w-[150px] h-[150px] rounded-full" />
        </div>
        <div className="first-cup-name cursor-pointer min-h-fit text-center">
          <Skeleton className="w-40  h-5 rounded-lg mt-2" />
        </div>
      </div>
    </div>
  );
};

export default CoffeeProductCartSkeleton;
