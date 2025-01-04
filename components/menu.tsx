"use client";

import React, { useCallback, useEffect, useRef } from "react";
// import { useLocation, useOutletContext } from "react-router";
// import "../../component/Styles/Menu.css";
import "@/styles/menu.css";
import Footer from "./footer";
import LoadingImage from "./ui/loading-image";
import { FaArrowCircleUp } from "react-icons/fa";
import Link from "next/link";
// import { Coffee, ProductsType } from "../../data/coffee";
import { Coffee, ProductsType } from "@/data/coffee";
import { useMyContext } from "@/context/context";

interface homeProps {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

interface coffeeInfo {
  product_id: number;
  product_name: string;
  product_image: string;
  coffeeType_name: string;
}

const Menu: React.FC = () => {
  const coffeeInstance = new Coffee();
  var products = coffeeInstance.coffeeProducts;
  const { barVisibility, aboutRef, pageShowHeader, sectionsRef } = useMyContext();
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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // console.log("hash: ", hash);
      var element = hash.split("#").join("");
      // console.log("element one: ", element);
      element = element.split("%20").join(" ");
      const elementId = document.getElementById(element);
      // console.log("element two: ", element);
      // console.log(
      //   "document.getElementById(elementId): ",
      //   document.getElementById(element)
      // );
      if (elementId) {
        elementId.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(
          "",
          document.title,
          window.location.pathname + window.location.search
        );
      }
    }
  }, []);

  return (
    <div ref={firstDiv}>
      <div className={`main-home-page-container mt-[100px] ${barVisibility ? "" : "bar-visible"}`}>
        {/* <div className={`home-page-container`}>
        <div className="main-menu-page-container relative">
          <div className="menu-page-container">
            <div className="first-section-menu-container">
              <div className="menu-sentence">Menu</div>
              <hr />
            </div>
            <div className="second-section-menu-container relative">
              <div className="absolute w-1/6 h-1/8 invisible" ref={lastDiv2}>
                Hello
              </div>
              <div className="first-part-menu"></div>
              <div className="second-part-menu">
                <div className="hot-coffees">
                  <div className="hot-coffees-sentence">
                    <div className="menu-sentence"> Hot Coffees</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <NavLink to={`/menu/1/cappuccino`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/cappuccino.png")}
                              imageAlt="Cappuccino"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Cappuccino
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/2/caramel-frappe`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/caramel-frappe.png")}
                              imageAlt="Caramel Frappe"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Caramel Frappe
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/3/Chocolate-frappe`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/Chocolate-frappe.jpg")}
                              imageAlt="Chocolate Frappe"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Chocolate Frappe
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/4/espresso`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/espresso.jpg")}
                              imageAlt="Espresso"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Espresso
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/5/flat-white`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/flat-white.jpeg")}
                              imageAlt="Flat White"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Flat White
                          </div>
                        </NavLink>
                      </div>
                      <div className="first-cup">
                        <NavLink to={`/menu/6/hot-coffee`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/hot-coffee.jpg")}
                              imageAlt="Hot Coffee"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Hot Coffee
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/7/latte-coffee`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/latte-coffee.png")}
                              imageAlt="Latte Coffee"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Latte Coffee
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/8/Machiato`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/Machiato.jpg")}
                              imageAlt="Machiato"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Machiato
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <NavLink to={`/menu/9/mocha-coffee`}>
                          <div className="first-cup-image">
                            <LoadingImage
                              src={require("../../component/image/mocha-coffee.jpeg")}
                              imageAlt="Mocha"
                            />
                          </div>
                          <div className="first-cup-name cursor-pointer min-h-fit text-center">
                            Mocha
                          </div>
                        </NavLink>
                      </div>

                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/turkish-coffee.jpg")}
                            imageAlt=""
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Turkish Coffee
                        </div>
                      </div>

                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/white-chocolate-mochas.png")}
                            imageAlt="White Chocolate Mocha"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          White Chocolate Mocha
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cold-coffees">
                  <div className="cold-coffees-sentence">
                    <div className="menu-sentence">Cold Coffees</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-americano.jpg")}
                            imageAlt="Iced Americano"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Americano
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-chocolate-frappe-coffee.png")}
                            imageAlt="Iced Chocolate Frappe Coffee"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Chocolate Frappe Coffee
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-coffee.jpeg")}
                            imageAlt="Iced coffee"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Coffee
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-flat-white.png")}
                            imageAlt="Iced Flat White"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Flat White
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-latte.jpg")}
                            imageAlt="Iced Latte"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Latte
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-machiato.png")}
                            imageAlt="Iced Machiato"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Machiato
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-mochas.jpeg")}
                            imageAlt="Iced Mochas"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Mochas
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-shaken-espresso.jpeg")}
                            imageAlt="Iced Shaken Espresso"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Shaken Espresso
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="iced-tea">
                  <div className="iced-tea-sentence">
                    <div className="menu-sentence">Iced Tea</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-chai-tea.jpg")}
                            imageAlt="Iced Chai Tea"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Chai Tea
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-lemon-tea.png")}
                            imageAlt="Iced Lemon Tea"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Lemon Tea
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-matcha.jpg")}
                            imageAlt="Iced Matcha"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Matcha
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/iced-peach-tea.png")}
                            imageAlt="Iced Peach Tea"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Iced Peach Tea
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hot-tea">
                  <div className="hot-tea-sentence">
                    <div className="menu-sentence">Hot Tea</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/chai-tea.jpg")}
                            imageAlt="Chai Tea"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Chai Tea
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/green-tea.png")}
                            imageAlt="Green Tea"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Green Tea
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/tea-milk.jpg")}
                            imageAlt="Milk Tea"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Milk Tea
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hot-chocolate">
                  <div className="hot-chocolate-sentence">
                    <div className="menu-sentence"> Hot Chocolate</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/hot-chocolate.jpg")}
                            imageAlt="Hot Chocolate"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Hot Chocolate
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/white-hot-chocolate.png")}
                            imageAlt="White hot chocolate"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          White hot chocolate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="juice">
                  <div className="juice-sentence">
                    <div className="menu-sentence">Juice</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/apple-juice.png")}
                            imageAlt="Apple Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Apple Juice
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/carrot-juice.jpeg")}
                            imageAlt="Carrot Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Carrot Juice
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/mango-juice.png")}
                            imageAlt="Mango Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Mango Juice
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/orange-juice.png")}
                            imageAlt="Orange Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Orange Juice
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/pomegranate-juice.jpg")}
                            imageAlt="Pomegranate Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Pomegranate Juice
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/raspberry-juice.png")}
                            imageAlt="Raspberry Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center top-0">
                          Raspberry Juice
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image ">
                          <LoadingImage
                            src={require("../../component/image/strawberry-juice.png")}
                            imageAlt="Strawberry Juice"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Strawberry Juice
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="milk">
                  <div className="milk-sentence">
                    <div className="menu-sentence">Milk</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/cold-milk.png")}
                            imageAlt="Cold Milk"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Cold Milk
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/steamed-milk.jpg")}
                            imageAlt="Steamed Milk"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Steamed Milk
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/vanilla-cream-milk.png")}
                            imageAlt="Vanilla Cream Milk"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Vanilla Cream Milk
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="water-sparkling">
                  <div className="water-sparkling-sentence">
                    <div className="menu-sentence">Water and Sparkling</div>
                    <hr />
                  </div>
                  <div className="coffees-content">
                    <div className="coffees-content-container">
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/water.png")}
                            imageAlt="Cup Of Water"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Cup Of Water
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/sparkling-water.png")}
                            imageAlt="Sparkling Water"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Sparkling Water
                        </div>
                      </div>
                      <div className="first-cup">
                        <div className="first-cup-image">
                          <LoadingImage
                            src={require("../../component/image/water-bottle.jpg")}
                            imageAlt="Water bottle"
                          />
                        </div>
                        <div className="first-cup-name cursor-pointer min-h-fit text-center">
                          Water bottle
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="scroll-down-button-container"
            ref={arrowDown}
            onClick={() => {
              if (firstDiv.current)
                firstDiv.current.scrollIntoView({ behavior: "smooth" });
              if (arrowDown.current) arrowDown.current.style.display = "none";
            }}
            style={{ display: "none" }}
          >
            <FontAwesomeIcon
              icon={faArrowCircleUp}
              className="fixed bottom-2 right-3 bg-black rounded-full
               text-white animate-bounce w-7 h-7 cursor-pointer"
            />
          </div>
        </div>
        <Footer></Footer>
      </div> */}
        <div className={`home-page-container`}>
          <div className="absolute w-1/6 h-[100vh] invisible" ref={lastDiv2}></div>
          <div className="main-menu-page-container relative">
            <div className="menu-page-container">
              <div className="first-section-menu-container">
                <div className="menu-sentence">Menu</div>
                <hr />
              </div>
              <div className="second-section-menu-container relative">
                <div className="first-part-menu"></div>
                <div className="second-part-menu">
                  {/* {Object.entries(coffeeInstance.coffeeProducts).forEach
                  (([key, coffeeType]) => {
                    <div className={key} key={key}>
                      <div className="hot-coffees-sentence">
                        <div className="menu-sentence">{coffeeType.name}</div>
                        <hr />
                      </div>
                      <div className="coffees-content">
                        <div className="coffees-content-container">
                          {coffeeType.products.forEach(
                            (product: ProductsType, index: number) => {
                              <div className="name">{product.name}</div>;
                              <div className="name">{index}</div>;
                              // <div className="first-cup" key={index}>
                              //   <NavLink
                              //     to={`/menu/${product.id}/${product.name}`}
                              //   >
                              //     <div className="first-cup-image">
                              //       <LoadingImage
                              //         src={require(`../../component/image/${product.image}`)}
                              //         imageAlt={product.name}
                              //       />
                              //     </div>
                              //     <div className="first-cup-name cursor-pointer min-h-fit text-center">
                              //       {product.name}
                              //     </div>
                              //   </NavLink>
                              // </div>;
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  })
                } */}

                  {Object.entries(coffeeInstance.coffeeProducts).map(([key, coffeeType]) => (
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
                  ))}
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
              <FaArrowCircleUp
                id="arrow-up-button"
                className="fixed bottom-2 right-3 bg-black rounded-full
               text-white animate-bounce w-7 h-7 cursor-pointer z-50"
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
