"use client";

import React, { useEffect, useRef, useState } from "react";
import DropDown from "./ui/drop-down";
import Footer from "./footer";
import LoadingImage from "./ui/loading-image";
import { useMyContext } from "@/context/context";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductDetails } from "./cart";
// import { foamOptionTypes, icedOptionTypes, productSize, waterOptionTypes } from "@prisma/client";
import Image from "next/image";

const CoffeeProduct: React.FC = () => {
  const [size, setSize] = useState<"Short" | "Tall" | "Grand" | "Venti">();
  const [containerId, setContainerId] = useState("");
  const [isProductAddedToCart, setIsProductAddedToCart] = useState<boolean>(false);
  const [containWater, setContainWater] = useState<string>("No Water");
  const [containIce, setContainIce] = useState<string>("No Ice");
  const [containFoam, setContainFoam] = useState<string>("No Foam");
  const [circle, setCircle] = useState<boolean>(false);
  const [circleHover, setCircleHover] = useState<boolean>(false);
  const [circleIndex, setCircleIndex] = useState<number>(0);
  const [circleIndexHover, setCircleIndexHover] = useState<number>(0);
  const circleOpacity = "!opacity-100";
  const { barVisibility, updatePerformed } = useMyContext();
  const search = useSearchParams();
  const id = search.get("product_id");
  const productName = search.get("product_name");
  const productImage = search.get("product_image");
  const productTypeName = search.get("coffeeType_name");
  const productPrice = search.get("product_price");
  const [newSizePrice, setNewSizePrice] = useState<number>(
    parseFloat(productPrice ? productPrice : "")
  );
  const selectSize = useRef<HTMLDivElement>(null);

  const waterOptionType = [
    { value: "No Water", label: "No Water" },
    { value: "Water", label: "Water" },
  ];

  const icedOptionType = [
    { value: "Light Ice", label: "Light Ice" },
    { value: "Extra Ice", label: "Extra Ice" },
    { value: "No Ice", label: "No Ice" },
  ];
  const foamOptionType = [
    { value: "Light Foam", label: "Light Foam" },
    { value: "Extra Foam", label: "Extra Foam" },
    { value: "No Foam", label: "No Foam" },
  ];

  const isWater = (value: string) => {
    switch (value) {
      case "No Water":
        return "No_Water";

      case "Water":
        return "Water";

      default:
        break;
    }
  };

  const isIce = (value: string) => {
    switch (value) {
      case "Light Ice":
        return "Light_Ice";

      case "Extra Ice":
        return "Extra_Ice";

      case "No Ice":
        return "No_Ice";

      default:
        break;
    }
  };

  const isFoam = (value: string) => {
    switch (value) {
      case "Light Foam":
        return "Light_Foam";
      // return foamOptionTypes.Light_Foam;

      case "Extra Foam":
        return "Extra_Foam";
      // return foamOptionTypes.Extra_Foam;

      case "No Foam":
        return "No_Foam";
      // return foamOptionTypes.No_Foam;

      default:
        break;
    }
  };

  const handleAddToCart = () => {
    if (!isProductAddedToCart) {
      if (size === undefined) {
        if (selectSize.current) {
          selectSize.current.style.display = "block";
        }
      } else {
        const item: ProductDetails = {
          id: id ? id : "",
          productName: productName ? productName : "",
          productImage: productImage ? productImage : "",
          productTypeName: productTypeName ? productTypeName : "",
          product_size: size,
          waterOption: isWater(containWater),
          icedOption: isIce(containIce),
          foamOption: isFoam(containFoam),
          product_quantity: 1,
          productPrice: productPrice ? newSizePrice : 0,
        };

        if (localStorage.getItem("AddToCart") != null) {
          const saved_products: ProductDetails[] = JSON.parse(localStorage.getItem("AddToCart")!);
          saved_products.push(item);
          localStorage.setItem("AddToCart", JSON.stringify(saved_products));
        } else {
          const items: ProductDetails[] = [];
          items.push(item);
          localStorage.setItem("AddToCart", JSON.stringify(items));
        }
        setIsProductAddedToCart(true);
        updatePerformed();
        if (selectSize.current) selectSize.current.style.display = "none";
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (localStorage.getItem("AddToCart") != null && id !== null) {
      const saved_products: ProductDetails[] = JSON.parse(localStorage.getItem("AddToCart")!);
      const isAddedToCart = saved_products.some((value) => value.id === id);
      setIsProductAddedToCart(isAddedToCart);
    }
  }, []);

  useEffect(() => {
    if (productTypeName) {
      if (productTypeName.includes(" ")) {
        setContainerId(productTypeName.replace(/ /g, "-"));
      } else {
        setContainerId(productTypeName);
      }
    }
  }, [productTypeName]);

  return (
    <div className="mt-[100px] flex flex-col min-h-screen">
      <div
        className={`flex flex-col w-full justify-between ${
          barVisibility ? "" : "bar-visible"
        } flex-grow`}
      >
        <div
          className={`font-sans flex flex-col justify-between min-w-fit min-h-fit h-fit mt-2 flex-grow`}
        >
          <section className="first-section !bg-transparent !justify-start !items-start ">
            <div id="coffeePath" className="coffeePath font-bold ml-2 flex sm:ml-8">
              <Link href={"/menu"} className="cursor-pointer w-fit hover:scale-105 mx-px">
                Menu
              </Link>
              <span className="mx-1">/</span>
              <Link
                href={`/menu#${containerId}`}
                className="cursor-pointer hover:scale-105 w-fit mx-px"
              >
                {productTypeName}
              </Link>
              <span className="mx-1">/</span>
              <div className="mx-1"> {productName}</div>
            </div>
          </section>
          <section
            id="second-section"
            className="sm:h-[23rem]  flex flex-row min-w-fit min-h-fit h-fit w-full mt-2 justify-center items-center"
          >
            <div
              id="image-section"
              className="custom-sm-w-2-3 sm:!w-[40%] sm:min-w-fit py-5 sm:py-7 sm:grid sm:place-content-end "
            >
              <LoadingImage
                src={`/image/${productImage}`}
                imageAlt={productName ? productName : "coffee image"}
                className="rounded-full w-64 h-64 sm:h-80 sm:w-80 transform scale-110 object-cover"
              />
            </div>
            <div
              id="name-section"
              className="font-semibold hidden sm:px-4 pb-5 sm:pb-7 min-w-fit custom-sm-w-1-3 min-h-fit  sm:!grid place-content-center sm:justify-center text-black"
            >
              <div>{productName}</div>
              <div className="w-full text-center !text-gray-300">${newSizePrice}</div>
            </div>
          </section>
          <section className="third-section w-full rounded-t-3xl h-auto min-h-[465px] sm:!min-h-fit bg-[#e5e5e5] flex-grow">
            <div className="mx-auto w-[90%] sm:mx-0 mt-6 flex flex-col sm:flex-row min-h-fit h-fit">
              <div
                id="name-section-phone"
                className="font-semibold sm:px-4 pb-2 sm:pb-7 min-w-fit custom-sm-w-1-3 min-h-fit  sm:!hidden place-content-center sm:justify-center"
              >
                {productName}
              </div>
              <div
                id="price-phone"
                className="font-semibold text-white sm:px-4 min-w-fit custom-sm-w-1-3 min-h-fit  sm:!hidden place-content-center sm:justify-center"
              >
                ${newSizePrice}
              </div>
              <div
                id="size-section"
                className="sm:!w-[40%] w-[90%] sm:h-[20rem] flex flex-col sm:ml-[10%]"
              >
                <div
                  id="size-option-sentence"
                  className="font-semibold ml-1 sm:ml-1 min-w-fit min-h-fit h-fit w-[90%] mt-2 justify-center items-center "
                >
                  Size options
                  <div className="my-1 w-full h-1 bg-slate-300">
                    <hr />
                  </div>
                </div>

                <div
                  id="size-options"
                  className="flex flex-col items-center justify-center w-full mt-3 sm:mt-10 "
                >
                  <div
                    id="select-size"
                    className="hidden text-red-500 transform -mt-5 py-1
"
                    ref={selectSize}
                  >
                    Please select a size!
                  </div>
                  <div id="size-options" className="flex justify-between max-w-64 w-56 min-w-fit  ">
                    <div
                      id="size-short"
                      className="flex flex-col justify-end items-center max-w-fit mx-5 "
                    >
                      <div id="cup-image" className="cursor-pointer mb-3 ">
                        <Image
                          src={"/image/medium-icon.png"}
                          id="img-cup"
                          alt="short cup image"
                          width={100}
                          height={100}
                          className=" h-[30px] w-8 max-w-[35px] sm:!h-[40px] sm:!w-10 sm:!max-w-[45px] z-50 hover:z-50 relative "
                          onClick={() => {
                            setCircleIndex(1);
                            setSize("Short");
                            setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 0.5);
                            setCircle(true);
                          }}
                          onMouseEnter={() => {
                            setCircleIndexHover(1);
                            setCircle(false);
                            setCircleHover(true);
                          }}
                          onMouseLeave={() => {
                            setCircleIndexHover(0);
                            setCircle(true);
                            setCircleHover(false);
                          }}
                        />

                        <div id="cup-image" className="relative">
                          <div
                            id="circle-short"
                            className={`absolute w-[60px] h-[60px] sm:!w-[75px] sm:!h-[75px] m-auto rounded-full border-4 border-gray-700 bg-gray-300 opacity-0 hover:z-10 z-10 hover:opacity-100  ${
                              circle
                                ? circleIndex === 1
                                  ? circleOpacity
                                  : circleHover
                                  ? circleIndexHover === 1
                                    ? circleOpacity
                                    : ""
                                  : ""
                                : circleHover
                                ? circleIndexHover === 1
                                  ? circleOpacity
                                  : ""
                                : ""
                            } transition-opacity duration-300`}
                            onClick={() => {
                              setCircleIndex(1);
                              setSize("Short");
                              setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 0.5);
                              setCircle(true);
                            }}
                          ></div>
                        </div>
                      </div>

                      <div id="size-short-word" className="font-sans font-medium">
                        Short
                      </div>
                    </div>
                    <div
                      id="size-tall"
                      className="flex flex-col justify-end items-center max-w-fit mx-5"
                    >
                      <div id="cup-image" className="cursor-pointer mb-3 ">
                        <Image
                          src={"/image/medium-icon.png"}
                          id="img-cup"
                          alt="tall cup image"
                          width={100}
                          height={100}
                          className="h-[35px] w-8 max-w-[35px] sm:!h-[45px] sm:!w-10 sm:!max-w-[45px] z-50 hover:z-50 relative"
                          onClick={() => {
                            setCircleIndex(2);
                            setSize("Tall");
                            setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 1);
                            setCircle(true);
                          }}
                          onMouseEnter={() => {
                            setCircleIndexHover(2);
                            setCircle(false);
                            setCircleHover(true);
                          }}
                          onMouseLeave={() => {
                            setCircleIndexHover(0);
                            setCircle(true);
                            setCircleHover(false);
                          }}
                        />
                        <div id="cup-image" className="relative">
                          <div
                            id="circle-tall"
                            className={`absolute w-[60px] h-[60px] sm:!w-[75px] sm:!h-[75px] m-auto rounded-full border-4 border-gray-700 hover:z-10 z-10 bg-gray-300 opacity-0 hover:opacity-100 ${
                              circle
                                ? circleIndex === 2
                                  ? circleOpacity
                                  : circleHover
                                  ? circleIndexHover === 2
                                    ? circleOpacity
                                    : ""
                                  : ""
                                : circleHover
                                ? circleIndexHover === 2
                                  ? circleOpacity
                                  : ""
                                : ""
                            } transition-opacity duration-300`}
                            onClick={() => {
                              setCircleIndex(2);
                              setSize("Tall");
                              setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 1);
                              setCircle(true);
                            }}
                          ></div>
                        </div>
                      </div>

                      <div id="size-tall-word" className="font-sans font-medium">
                        Tall
                      </div>
                    </div>
                    <div id="size-grande" className="flex flex-col justify-end items-center mx-5">
                      <div id="cup-image" className="cursor-pointer mb-3 ">
                        <Image
                          src={"/image/medium-icon.png"}
                          id="img-cup"
                          alt="grand cup image"
                          width={100}
                          height={100}
                          className="h-[39px] w-8 max-w-[35px] sm:!h-[49px] sm:!w-10 sm:!max-w-[45px] z-50 hover:z-50 relative"
                          onClick={() => {
                            setCircleIndex(3);
                            setSize("Grand");
                            setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 1.5);
                            setCircle(true);
                          }}
                          onMouseEnter={() => {
                            setCircleIndexHover(3);
                            setCircle(false);
                            setCircleHover(true);
                          }}
                          onMouseLeave={() => {
                            setCircleIndexHover(0);
                            setCircle(true);
                            setCircleHover(false);
                          }}
                        />
                        <div id="cup-image" className="relative">
                          <div
                            id="circle-medium"
                            className={`absolute w-[60px] h-[60px] sm:!w-[75px] sm:!h-[75px] m-auto rounded-full border-4 border-gray-700 hover:z-10 z-10 bg-gray-300 opacity-0 hover:opacity-100 ${
                              circle
                                ? circleIndex === 3
                                  ? circleOpacity
                                  : circleHover
                                  ? circleIndexHover === 3
                                    ? circleOpacity
                                    : ""
                                  : ""
                                : circleHover
                                ? circleIndexHover === 3
                                  ? circleOpacity
                                  : ""
                                : ""
                            } transition-opacity duration-300`}
                            onClick={() => {
                              setCircleIndex(3);
                              setSize("Grand");
                              setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 1.5);
                              setCircle(true);
                            }}
                          ></div>
                        </div>
                      </div>

                      <div id="size-grande-word" className="font-sans font-medium">
                        Grande
                      </div>
                    </div>

                    <div id="size-venti" className="flex flex-col justify-end items-center mx-5">
                      <div id="cup-image" className="cursor-pointer mb-3 ">
                        <Image
                          src={"/image/medium-icon.png"}
                          id="img-cup"
                          width={100}
                          height={100}
                          alt="venti cup image"
                          className="h-11 w-8 max-w-[35px] sm:!h-[54px] sm:!w-10 sm:!max-w-[45px]  z-50 hover:z-50 relative"
                          onClick={() => {
                            setCircleIndex(4);
                            setSize("Venti");
                            setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 2);
                            setCircle(true);
                          }}
                          onMouseEnter={() => {
                            setCircleIndexHover(4);
                            setCircle(false);
                            setCircleHover(true);
                          }}
                          onMouseLeave={() => {
                            setCircleIndexHover(0);
                            setCircle(true);
                            setCircleHover(false);
                          }}
                        />
                        <div id="cup-image" className="relative">
                          <div
                            id="circle-long"
                            className={`absolute w-[60px] h-[60px] sm:!w-[75px] sm:!h-[75px] m-auto rounded-full border-4 border-gray-700 hover:z-10 z-10 bg-gray-300 opacity-0 ${
                              circle
                                ? circleIndex === 4
                                  ? circleOpacity
                                  : circleHover
                                  ? circleIndexHover === 4
                                    ? circleOpacity
                                    : ""
                                  : ""
                                : circleHover
                                ? circleIndexHover === 4
                                  ? circleOpacity
                                  : ""
                                : ""
                            } hover:opacity-100 transition-opacity duration-300`}
                            onClick={() => {
                              setCircleIndex(4);
                              setSize("Venti");
                              setNewSizePrice(parseFloat(productPrice ? productPrice : "0") * 2);

                              setCircle(true);
                            }}
                          ></div>
                        </div>
                      </div>
                      <div id="size-venti-word" className="font-sans font-medium">
                        Venti
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {productTypeName !== "Water and Sparkling" ? (
                <div
                  id="included-products-section"
                  className=" !min-h-fit sm:!w-[40%] w-[90%] sm:!h-[20rem] h-fit max-h-[310px] flex flex-col mb-2 sm:ml-[10%] mt-3 sm:mt-0"
                >
                  <div
                    id="size-option-sentence"
                    className="font-semibold ml-1 sm:ml-1 min-w-fit min-h-fit h-fit w-[90%] mt-2 justify-center items-center"
                  >
                    Add in
                    <div className="my-1 w-full h-1 bg-slate-300">
                      <hr />
                    </div>
                  </div>
                  <div
                    id="included-product-container"
                    className="mt-3 sm:mt-10 flex justify-center min-h-fit mb-4 h-fit"
                  >
                    <div id="first-product" className="min-h-fit h-fit">
                      {productTypeName !== "Water and Sparkling" ? (
                        <div id="water-input" className="min-h-fit">
                          <DropDown
                            dropOptions={waterOptionType}
                            element={containWater}
                            setContainElement={setContainWater}
                          ></DropDown>
                        </div>
                      ) : null}

                      {productTypeName === "Juice" ||
                      productTypeName === "Smoothie" ||
                      productTypeName === "Iced Tea" ||
                      productTypeName === "Water and Sparkling" ||
                      productTypeName === "Cold Coffees" ? (
                        productName !== "Water bottle" ? (
                          <div id="ice-input" className="mt-3 min-h-fit">
                            <DropDown
                              dropOptions={icedOptionType}
                              element={containIce}
                              setContainElement={setContainIce}
                            ></DropDown>
                          </div>
                        ) : null
                      ) : null}
                      {productTypeName === "Hot coffees" ||
                      productTypeName === "Hot Chocolate" ||
                      productTypeName === "Cold Coffees" ? (
                        productName !== "Hot Coffee" &&
                        productName !== "Turkish Coffee" &&
                        productName !== "Espresso" ? (
                          <div id="foam-input" className="mt-3 min-h-fit">
                            <DropDown
                              dropOptions={foamOptionType}
                              element={containFoam}
                              setContainElement={setContainFoam}
                            ></DropDown>
                          </div>
                        ) : null
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
          <div className="footer-pages-container   mb-[64px] bg-[#e5e5e5] mt-auto">
            <Footer />
          </div>
        </div>
      </div>
      <div
        id="add-to-cart"
        className={`bg-slate-500 right-4 bottom-5 fixed p-4 rounded-full text-white cursor-pointer transform  active:animate-none z-[100] ${
          isProductAddedToCart ? "animate-none" : "animate-bounce"
        }`}
        onClick={handleAddToCart}
      >
        {isProductAddedToCart ? "Added to cart" : "Add to Cart"}
      </div>
    </div>
  );
};
export default CoffeeProduct;
