import React from "react";
import { ProductDetails } from "./cart";
import { Skeleton } from "./ui/skeleton";

const CoffeeProductCartSkeleton = () => {
  return (
    <div>
      <div className="first-cup">
        <div className="first-cup-image">
          <Skeleton className="sm:!w-[150px] sm:!h-[150px] w-[120px] h-[120px]  rounded-full" />
        </div>
        <div className="first-cup-name cursor-pointer min-h-fit text-center">
          <Skeleton className="sm:!w-40 lg:!w-40 w-[120px] md:!w-[130px] h-5 rounded-lg mt-2" />
        </div>
      </div>
    </div>
  );
};

export default CoffeeProductCartSkeleton;
