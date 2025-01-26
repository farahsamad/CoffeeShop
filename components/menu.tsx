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

// interface homeProps {
//   barVisibility: boolean;
//   aboutRef: React.RefObject<HTMLDivElement>;
//   pageShowHeader: boolean;
//   sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
// }

const Menu: React.FC = () => {
  const [products, setProducts] = useState<ProductDetails[] | null>(null);
  const [groupedProducts, setGroupedProducts] = useState<{ [key: string]: ProductDetails[] }>({});
  const menuContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        console.log("before response");
        const response = await fetch("/api/product", { next: { revalidate: false } });
        console.log("after response");
        if (response.ok) {
          console.log("response ok: ", response);
          const data = await response.json();
          console.log("data are: ", data.products);
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
  // const coffeeInstance = new Coffee();
  // var products = coffeeInstance.coffeeProducts;
  const { barVisibility } = useMyContext();
  //   const barsVisibility = useOutletContext<homeProps>();
  //   const pageShowHeader = barsVisibility.pageShowHeader;
  //   const barVisibility = barsVisibility.barVisibility;
  const arrowDown = useRef<HTMLDivElement>(null);
  const firstDiv = useRef<HTMLDivElement>(null);
  const observe = useRef<IntersectionObserver | null>(null);

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

  // useEffect(() => {
  //   let lastScrollTop = 0;
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
  //     if (scrollTop < lastScrollTop) {
  //       // Scroll up
  //       document.getElementById("arrow-up-button")?.classList.remove("bottom-2");
  //       document.getElementById("arrow-up-button")?.classList.add("bottom-2");
  //     } else {
  //       // Scroll down
  //       document.getElementById("arrow-up-button")?.classList.remove("bottom-2");
  //       document.getElementById("arrow-up-button")?.classList.add("bottom-2");
  //     }
  //     lastScrollTop = scrollTop;
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Object.entries(coffeeInstance.coffeeProducts).forEach(([key, coffeeType]) => {
  //   console.log(`Category: ${coffeeType.name}`);
  //   coffeeType.products.forEach((product: ProductsType, index: number) => {
  //     console.log(
  //       `Product ${index + 1}: ${product.name}, ID: ${product.id}, Image: ${
  //         product.image
  //       }`
  //     );
  //   });
  // });

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
                  {/* {Object.entries(coffeeInstance.coffeeProducts).map(([key, coffeeType]) => (
                    <div className={key} key={key}>
                      <div className="hot-coffees-sentence">
                        <div className="menu-sentence" id={coffeeType.name}>
                          {coffeeType.name}
                        </div>
                        <hr />
                      </div>
                      <div className="coffees-content">
                        <div className="coffees-content-container">
                          {coffeeType.products.map((product: ProductsType, index: number) => {
                            var coffeeState: coffeeInfo = {
                              product_id: product.id,
                              product_name: product.name,
                              product_image: product.image,
                              coffeeType_name: coffeeType.name,
                            };
                            return (
                              <div key={index}>
                                <div className="first-cup" key={index}>
                                  <Link
                                    href={{
                                      pathname: `/menu/${product.id}/${product.name}`,
                                      query: {
                                        product_id: product.id,
                                        product_name: product.name,
                                        product_image: product.image,
                                        coffeeType_name: coffeeType.name,
                                      },
                                    }}

                                    // state={coffeeState}
                                  >
                                    <div className="first-cup-image">
                                      <LoadingImage
                                        src={`/image/${product.image}`}
                                        imageAlt={product.name}
                                      />
                                    </div>
                                    <div className="first-cup-name cursor-pointer min-h-fit text-center">
                                      {product.name}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))} */}
                  {/* <Suspense fallback={<CoffeeTypeCartSkeleton />}>
                    {products &&
                      Object.keys(groupedProducts).map((val, key) => (
                        <CoffeeTypeCart
                          key={`key-${key}`}
                          value={val}
                          groupedProducts={groupedProducts}
                        />
                      ))}
                  </Suspense> */}
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
                  {/* <Suspense fallback={<CoffeeTypeCartSkeleton />}>
                    {products !== null &&
                      Object.keys(groupedProducts).map((val, key) => (
                        <CoffeeTypeCart
                          key={`key-${key}`}
                          value={val}
                          groupedProducts={groupedProducts}
                        />
                      ))}
                  </Suspense> */}
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
