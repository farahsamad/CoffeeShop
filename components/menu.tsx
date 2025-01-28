"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
// import { useLocation, useOutletContext } from "react-router";
// import "../../component/Styles/Menu.css";
import "@/styles/menu.css";
import Footer from "./footer";
import { IoIosArrowUp } from "react-icons/io";
// import { Coffee, ProductsType } from "../../data/coffee";
import { useMyContext } from "@/context/context";
import CoffeeTypeCart from "./coffee-type-cart";
import { ProductDetails } from "./cart";
import CoffeeTypeCartSkeleton from "./coffee-type-cart-skeleton";

const Menu: React.FC = () => {
  const [products, setProducts] = useState<ProductDetails[] | null>(null);
  const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: ProductDetails[] }>({});
  const menuContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { barVisibility } = useMyContext();
  const arrowDown = useRef<HTMLDivElement>(null);
  const firstDiv = useRef<HTMLDivElement>(null);
  const observe = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("/api/product", { next: { revalidate: false } });
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);

          // Group products by type
          const grouped = data.products.reduce(
            (acc: { [key: string]: ProductDetails[] }, product: ProductDetails) => {
              if (!acc[product.productTypeName]) {
                acc[product.productTypeName] = [];
              }
              acc[product.productTypeName].push(product);
              return acc;
            },
            {}
          );
          setGroupedProducts(grouped);
        } else {
          console.error("Error: ", response.statusText);
        }
      } catch (error) {
        console.error("Error here: ", error);
      }
    }
    getProducts();
  }, []);

  const lastDiv2 = useCallback((msg: HTMLDivElement | null) => {
    if (observe.current) observe.current.disconnect();
    observe.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === false) {
          if (arrowDown.current) arrowDown.current.style.display = "block";
        } else {
          if (arrowDown.current) arrowDown.current.style.display = "none";
        }
      },
      {
        root: firstDiv.current,
      }
    );
    if (msg) {
      observe.current.observe(msg);
    }
  }, []);

  return (
    <div ref={firstDiv}>
      <div className={`main-home-page-container mt-[100px] ${barVisibility ? "" : "bar-visible"}`}>
        <div className={`home-page-container`}>
          <div className="absolute w-1/6 h-[100vh] invisible" ref={lastDiv2}></div>
          <div className="main-menu-page-container relative">
            <div className="menu-page-container">
              <div className="first-section-menu-container">
                <div className="menu-sentence">Menu</div>
                <hr />
              </div>
              <div className="second-section-menu-container relative overflow-hidden">
                <div className="first-part-menu"></div>
                <div className="second-part-menu mt-11">
                  <Suspense fallback={<CoffeeTypeCartSkeleton />}>
                    {products !== null ? (
                      Object.keys(groupedProducts).map((val, key) => (
                        <CoffeeTypeCart
                          key={`key-${key}`}
                          value={val}
                          index={key}
                          groupedProducts={groupedProducts}
                          menuContainerRefs={menuContainerRefs}
                          lastIndex={Object.keys(groupedProducts).length - 1}
                        />
                      ))
                    ) : (
                      <CoffeeTypeCartSkeleton />
                    )}
                  </Suspense>
                </div>
              </div>
            </div>
            <div
              className="scroll-down-button-container"
              ref={arrowDown}
              onClick={() => {
                if (firstDiv.current) firstDiv.current.scrollIntoView({ behavior: "smooth" });
                if (arrowDown.current) arrowDown.current.style.display = "none";
              }}
              style={{ display: "none" }}
            >
              <IoIosArrowUp
                id="arrow-up-button"
                className="fixed right-3 bg-white rounded-full text-slate-500 animate-bounce w-7 h-7 cursor-pointer z-50 border !border-slate-500 bottom-4 md:!bottom-2"
              />
            </div>
          </div>
          <div className="footer-pages-container  -mx-[10px]  mb-[64px]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
