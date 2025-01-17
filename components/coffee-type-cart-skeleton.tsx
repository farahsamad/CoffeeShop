import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import CoffeeProductCartSkeleton from "./coffee-product-cart-skeleton";

const CoffeeTypeCartSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <div className="coffee-type-container" key={cn("skeleton", index)}>
          <div className="hot-coffees-sentence">
            <div className="menu-sentence">
              <Skeleton className="w-40 h-5 rounded-lg mb-2" />
            </div>
            {/* <hr /> */}
          </div>
          <div className="coffees-content">
            <div className="coffees-content-container md:ml-px lg:!mx-0">
              {[0, 1, 2, 3, 4].map((index) => (
                <CoffeeProductCartSkeleton key={`key-${index}`} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CoffeeTypeCartSkeleton;
