"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaTicket, FaX } from "react-icons/fa6";
import LoadingImage from "./ui/loading-image";
import Footer from "./footer";
import { useMyContext } from "@/context/context";
import Link from "next/link";
// import { foamOptionTypes, icedOptionTypes, productSize, waterOptionTypes } from "@prisma/client";
import { useRemoveProduct } from "@/hooks/useRemoveProduct";
import Image from "next/image";
import { addDiscount } from "@/actions/addDiscount";

// enum waterOptionTypes {
//   No_Water,
//   Water,
// }

// enum icedOptionType {
//   Light_Ice,
//   Extra_Ice,
//   No_Ice,
// }

// enum foamOptionType {
//   Light_Foam,
//   Extra_Foam,
//   No_Foam,
// }

export interface ProductDetails {
  id: string;
  productName: string;
  productImage: string;
  productTypeName: string;
  product_size: "Short" | "Tall" | "Grand" | "Venti";
  waterOption?: "No_Water" | "Water" | null;
  icedOption?: "Light_Ice" | "Extra_Ice" | "No_Ice" | null;
  foamOption?: "Light_Foam" | "Extra_Foam" | "No_Foam" | null;
  product_quantity: number;
  productPrice: number;
}

function Cart() {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string | undefined>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(totalAmount * 0.2);
  const [cartProducts, setCartProducts] = useState<ProductDetails[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [isMinWidth, setIsMinWidth] = useState<boolean>(false);
  const [secondMinWidth, setSecondMinWidth] = useState<boolean>(false);
  const { handleRemoveProductCartDb } = useRemoveProduct();
  const { barVisibility, updatePerformed } = useMyContext();

  const sectionDiv = useRef<HTMLDivElement>(null);
  const totalRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getDiscountLocalstorage = () => {
    const getDiscountJSON = localStorage.getItem("discount");
    if (!getDiscountJSON) return null;
    const getDiscount = JSON.parse(getDiscountJSON);
    const now = new Date();
    if (now.getTime() > getDiscount.expiry) {
      localStorage.removeItem("discount");
      return null;
    }
    setDiscount(parseFloat(getDiscount.value));
    setCouponCode(getDiscount.code);
    return parseFloat(getDiscount.value);
  };

  useEffect(() => {
    const storedDiscount = getDiscountLocalstorage();
    if (storedDiscount !== null) {
      setDiscount(storedDiscount);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("AddToCart")) {
      const storedCartProducts = localStorage.getItem("AddToCart");
      if (storedCartProducts) {
        const parsedCartProducts: ProductDetails[] = JSON.parse(storedCartProducts);
        setCartProducts(parsedCartProducts);
        setQuantities(parsedCartProducts.map((product) => product.product_quantity));
      }
    }
  }, []);

  const handleIncrementQuantity = (index: number, id: string, products: ProductDetails[]) => {
    setTotalAmount(0);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return { ...product, product_quantity: newQuantities[index] };
        }
        return product;
      });

      if (localStorage.getItem("AddToCart")) {
        localStorage.setItem("AddToCart", JSON.stringify(updatedProducts));
      }
      return newQuantities;
    });
  };
  const handleDecrementQuantity = (index: number, id: string, products: ProductDetails[]) => {
    // setTotalAmount((prevAmount) => (prevAmount = 0));
    setTotalAmount(0);
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
        const updatedProducts = products.map((product) => {
          if (product.id === id) {
            return { ...product, product_quantity: newQuantities[index] };
          }
          return product;
        });

        if (localStorage.getItem("AddToCart")) {
          localStorage.setItem("AddToCart", JSON.stringify(updatedProducts));
        }
      }
      return newQuantities;
    });
  };
  const handleProductRemove = async (
    id: string,
    products: ProductDetails[]
  ): Promise<ProductDetails[]> => {
    const updatedProducts = products.filter((product) => product.id !== id);

    if (localStorage.getItem("AddToCart")) {
      localStorage.setItem("AddToCart", JSON.stringify(updatedProducts));
      setCartProducts(updatedProducts);
    }
    await handleRemoveProductCartDb({ productId: id });
    updatePerformed();
    return updatedProducts;
  };

  const handleProductTotalPrice = (price: number, quantity: number): number => {
    return quantity * price;
  };

  const totalHeight = () => {
    setTimeout(() => {
      if (sectionDiv.current) {
        const height = sectionDiv.current.offsetHeight + 100;
        return `${height}px`;
      }
      return `100vh`;
    }, 50);
  };

  const handleResize = useCallback(() => {
    setIsMinWidth(window.innerWidth >= 640);
    if (isMinWidth) {
      setSecondMinWidth(window.innerWidth >= 850);
    }
    totalHeight();
  }, [totalHeight]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  }, []);

  useEffect(() => {
    let computedTotal = 0;
    totalRefs.current.forEach((section) => {
      if (section && section.textContent) {
        const newValue: number = parseFloat(section.textContent?.replace("$", ""));
        computedTotal += newValue;
      }
    });
    setTotalAmount(computedTotal);
    newTotal();
  }, [quantities]);
  const newTotal = (): number => {
    if (50 - totalAmount <= 0) {
      return 0;
    } else {
      return 50 - totalAmount;
    }
  };

  const newValueBg = () => {
    if (50 - totalAmount <= 0) {
      return "100";
    } else {
      const val = (totalAmount * 100) / 50;
      return val;
    }
  };

  const addDiscountLocalstorage = () => {
    const now = new Date();
    console.log("addDiscountLocalstorage discount: ", discount);
    const item = {
      value: discount,
      expiry: now.getTime() + 30 * 60 * 1000,
      code: couponCode,
    };
    localStorage.setItem("discount", JSON.stringify(item));
  };

  const addCouponDiscount = async () => {
    if (couponCode) {
      const isUserCartProductDeleted = await addDiscount(couponCode);
      if (isUserCartProductDeleted) {
        const hasExpired = new Date(isUserCartProductDeleted.expiryDate) < new Date();
        if (!hasExpired) {
          setDiscount((isUserCartProductDeleted.discountPercentage * totalAmount) / 100);
        }
      }
    }
  };

  useEffect(() => {
    console.log("useEffect totalAmount");

    addCouponDiscount();
    setTimeout(() => {
      addDiscountLocalstorage();
    }, 200);
  }, [totalAmount]);

  useEffect(() => {
    setTaxes(() => totalAmount * 0.2);
    setTotalPrice(() => taxes + totalAmount - discount);
  }, [totalAmount, taxes, discount]);

  useEffect(() => {
    if (discount > 0) {
      addDiscountLocalstorage();
    }
  }, [discount]);

  return (
    <div className={`h-full mt-[100px] ${barVisibility ? "" : "bar-visible"} `}>
      <div
        id="cart-container"
        className="h-full flex flex-col sm:!flex-row"
        style={{ minHeight: `calc(100vh - 100px)` }}
      >
        <section
          id="first-section"
          className="w-full h-fit sm:!w-3/4 sm:!min-w-3/4 sm:!h-full"
          ref={sectionDiv}
        >
          <div id="first-container" className="w-full h-1/4 flex flex-col justify-evenly">
            <div id="first-part-container" className="w-full h-1/2 py-4 px-3">
              <div
                id="part-container"
                className="flex flex-row w-full h-full items-center justify-between sm:min-h-14 "
              >
                <div id="shopping-cart" className="font-serif font-bold flex justify-start">
                  Shopping Cart
                </div>
                <div id="nbr-items" className="font-serif flex justify-end text-slate-500">
                  {cartProducts && cartProducts.length ? cartProducts.length : 0}
                  <span className="ml-1">items</span>
                </div>
              </div>
              <hr className="w-full bg-slate-400 h-px " />
            </div>

            <div id="second-part-container" className="w-full h-1/2 py-1 px-3">
              <div
                id="part-container"
                className="flex flex-col w-full h-full border-2 px-1 pt-2 pb-3 border-slate-400 border-dotted"
              >
                <div id="free-delivery-part-one" className="w-full flex h-1/2 mb-2 pr-2 sm:!pr-1">
                  <div id="free-delivery-amount" className="max-h-fit min-w-fit w-[60%]">
                    {newTotal() > 0
                      ? `You're only $${newTotal()} away from free delivery`
                      : "Well done, you got free shipping!"}
                  </div>
                  <div id="continue-delivery" className="w-[38%] flex items-center justify-end">
                    {newTotal() > 0 ? `Continue Shopping` : null}
                  </div>
                </div>

                <div id="free-delivery-part-two" className="w-full h-1/2 pr-2">
                  <div
                    id="free-delivery-part-two"
                    className="w-full h-full bg-slate-500 rounded-full"
                  >
                    <div
                      id="free-delivery-line"
                      className="bg-gray-800 rounded-full h-2"
                      style={{ width: `${newValueBg()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {cartProducts !== null ? (
            cartProducts.length > 0 ? (
              <div id="second-container" className="min-h-1/2 px-2 mt-4">
                <div id="card-products">
                  <table id="cart-product" className="w-full">
                    <thead>
                      <tr className="font-serif">
                        <th
                          id="product-image"
                          className="w-1/4 max-w-1/4 min-w-1/4 border-b-2 border-gray-300 py-2"
                        ></th>
                        <th
                          id="product-name"
                          className="w-[77px] max-w-[78px] border-b-2 border-gray-300 py-2"
                        ></th>
                        <th id="product-quantity" className="w-1/5 border-b-2 border-gray-300 py-2">
                          Quantity
                        </th>
                        <th id="product-price" className="w-[15%] border-b-2 border-gray-300 py-2">
                          Price
                        </th>
                        <th
                          id="product-total-price"
                          className="w-[15%] border-b-2 border-gray-300 py-2"
                        >
                          Total
                        </th>
                        <th
                          id="product-remove"
                          className="w-fit min-w-fit border-b-2 border-gray-300 py-2"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="max-h-fit">
                      {cartProducts &&
                        cartProducts.map(
                          (val: ProductDetails, index: number, products: ProductDetails[]) => {
                            return (
                              <tr
                                id="cart-product"
                                className="text-center h-fit relative border-t-2 border-slate-300"
                                key={index}
                              >
                                <td id="product-image" className="py-2 w-1/4 min-w-1/4">
                                  <LoadingImage
                                    src={`/image/${val.productImage}`}
                                    imageAlt={val.productName}
                                    className="w-24 h-24 sm:h-40 sm:w-40 object-cover"
                                  />
                                </td>
                                <td
                                  id="product-name"
                                  className="font-serif !text-left text-wrap py-2 w-fit max-w-[20vw] sm:!max-w-none sm:!w-1/5 pl-1"
                                >
                                  {val.productName}
                                </td>
                                <td id="product-quantity" className="py-2">
                                  <div className="flex justify-center items-center">
                                    <div
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handleDecrementQuantity(index, val.id, products)
                                      }
                                    >
                                      <FaMinus className="w-3 h-3 text-slate-400" />
                                    </div>
                                    <div id="quantity-nbr" className="px-2">
                                      {quantities[index]}
                                    </div>
                                    <div
                                      className="cursor-pointer"
                                      onClick={() =>
                                        handleIncrementQuantity(index, val.id, products)
                                      }
                                    >
                                      <FaPlus className="w-3 h-3 text-slate-400" />
                                    </div>
                                  </div>
                                </td>
                                <td id="product-price" className="py-2">
                                  ${val.productPrice}
                                </td>
                                <td
                                  id="product-total-price"
                                  className="py-2"
                                  ref={(el) => {
                                    totalRefs.current[index] = el;
                                  }}
                                >
                                  ${handleProductTotalPrice(val.productPrice, quantities[index])}
                                </td>
                                <td
                                  id="product-removes"
                                  className="cursor-pointer py-2 w-fit min-w-fit flex items-start"
                                >
                                  <FaX
                                    className="w-3 h-3 mt-1 sm:!mt-3 sm:!mr-1 text-slate-400 hover:transform hover:scale-125"
                                    onClick={() => handleProductRemove(val.id, products)}
                                  />
                                </td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div
                id="second-container"
                className="px-2 w-full  min-h-20 flex flex-col items-center justify-center"
                style={{
                  height: isMinWidth ? `calc(100vh - 260px)` : `200px`,
                }}
              >
                <div
                  id="empty-cart-sentence"
                  className="text-center font-serif font-extrabold sm:!text-2xl"
                >
                  No items added yet
                </div>
                <Image
                  id="empty-cart-image"
                  src={"/image/empty-cart.png"}
                  alt=""
                  width={100}
                  height={100}
                  className="h-32 w-40 sm:!h-64 sm:!w-80"
                />
              </div>
            )
          ) : (
            <div
              id="second-container"
              className="px-2 w-full  min-h-20 flex flex-col items-center justify-center"
              style={{
                height: isMinWidth ? `calc(100vh - 260px)` : `200px`,
              }}
            >
              <div
                id="empty-cart-sentence"
                className="text-center font-serif font-extrabold sm:!text-2xl"
              >
                No items added yet
              </div>
              <Image
                id="empty-cart-image"
                src={"/image/empty-cart.png"}
                alt=""
                width={100}
                height={100}
                className="h-32 w-40 sm:!h-64 sm:!w-80"
              />
            </div>
          )}
        </section>
        <section
          id="second-section"
          className="w-full sm:!w-1/4 sm:!min-w-[250px]  !text-white relative -top-0 sm:!-top-[100px]"
          style={{
            height: isMinWidth
              ? sectionDiv.current
                ? `${sectionDiv.current.offsetHeight + 100}px`
                : `100vh`
              : `fit-content`,
          }}
        >
          <div
            id="second-section-container"
            className="w-full sm:!w-1/4  sm:!max-h-[750px] flex flex-col sm:!min-w-[250px] sm:!top-0 sm:sticky sm:right-0 sm:!bottom-0"
            style={{
              height: isMinWidth ? "100vh" : "fit-content",
            }}
          >
            <div
              id="wishing-phrase"
              className="w-full text-black animate-pulse shadow-inner hidden sm:block sm:h-[100px]"
            >
              <span className="h-full w-full grid place-content-center">
                Wishing joyful shopping!
              </span>
            </div>
            <div
              id="checkout-container"
              className="flex flex-col justify-between mt-100 bg-amber-950 w-full rounded-t-3xl sm:!rounded-none"
              style={{
                height: isMinWidth
                  ? secondMinWidth
                    ? `calc(100vh - 100px)`
                    : `calc(100vh - 164px)`
                  : `550px`,
              }}
            >
              <div
                id="first-checkout-container"
                className="w-full h-fit sm:!min-h-[20%] sm:h-[20%] "
              >
                <div
                  id="first-checkout-part-container"
                  className="sm:!h-[89px] sm:!min-h-[89px] h-fit w-full"
                >
                  <div id="first-part-container" className="w-full h-1/2 py-4 px-3">
                    <div
                      id="part-container"
                      className="flex flex-row w-full h-full items-center justify-between sm:min-h-14 "
                    >
                      <div id="order-container" className="font-serif font-bold flex justify-start">
                        Order
                      </div>
                    </div>
                    <hr className="w-full bg-slate-400 h-px " />
                  </div>
                </div>
              </div>
              <div id="second-checkout-container" className="min-h-1/2 h-[60%] px-2 w-full">
                <div
                  id="card-products"
                  className="w-full min-h-full h-full flex flex-col justify-evenly"
                >
                  <div id="first-checkout-part" className="w-full min-h-[20%] h-1/4  flex flex-col">
                    <div
                      id="coupon-sentence"
                      className="font-serif font-semibold  w-full h-1/2 mb-1"
                    >
                      Coupon Code
                    </div>
                    <div
                      id="coupon-code"
                      className="font-serif font-semibold w-full h-1/2 flex bg-slate-300 rounded-full"
                    >
                      <div
                        id="coupon-icon"
                        className="w-1/6 min-h-full h-full text-sm my-auto px-[4px] flex justify-center items-center"
                      >
                        <FaTicket className="h-5 w-5 text-gray-500" />
                      </div>
                      <div id="coupon-input" className="h-full w-[60.3%] my-auto">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="outline-none h-full w-full bg-inherit pr-1 placeholder-white"
                          placeholder="code"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                          }}
                        />
                      </div>
                      <div
                        id="coupon-button"
                        className="w-[23%] min-h-full rounded-full bg-gray-500 cursor-pointer flex justify-center items-center text-base  px-[4px]"
                      >
                        <FaPlus className="h-5 w-5" onClick={() => addCouponDiscount()} />
                      </div>
                    </div>
                  </div>
                  <div
                    id="second-checkout-part"
                    className="w-full min-h-1/2 h-1/2 flex flex-col justify-center -mb-3 sm:!-mb-0"
                  >
                    <div
                      id="amount-checkout-part"
                      className="w-full min-h-full h-full flex flex-col justify-center font-serif"
                    >
                      <div id="amount" className="flex justify-between px-4 h-8">
                        <div id="amount-word">Amount</div>
                        <div id="amount-value">${totalAmount}</div>
                      </div>
                      <div id="taxes" className="flex justify-between px-4  h-8">
                        <div id="taxes-word">Taxes</div>
                        <div id="taxes-value">${taxes.toFixed(1)}</div>
                      </div>
                      <div id="discount" className="flex justify-between px-4  h-8">
                        <div id="discount-word">Discount</div>
                        <div id="discount-value">${discount.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="third-checkout-part"
                    className="w-full min-h-[15%] h-1/4 flex flex-col justify-evenly sm:!mt-0"
                  >
                    <div className="h-[20%] w-full">
                      <hr className="w-full bg-slate-400 h-px " />
                    </div>

                    <div
                      id="total-amount"
                      className="flex justify-between px-4 h-[40%] sm:!h-[60%] min-h-3/4 font-serif mt-3 sm:!mt-0"
                    >
                      <div id="amount-word">Total</div>
                      <div id="amount-value">${totalPrice.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="third-checkout-container"
                className="w-full min-h-fit h-1/4 sm:!h-[20%] px-2 flex flex-col font-serif"
              >
                <div id="payment-method" className="w-full h-[20%] flex items-center">
                  Payment Method:
                </div>
                <div
                  id="payment-method-buttons-container"
                  className="flex flex-row items-center justify-evenly w-full h-[60%] sm:!min-h-14 !text-gray-500 my-2"
                >
                  <div
                    id="pay-cash"
                    className="w-[45%] h-9 sm:h-9 bg-slate-300 px-3 py-2 rounded-full grid place-content-center cursor-pointer hover:transform hover:scale-110"
                  >
                    <Link href={"/payment/cash"}>Cash</Link>
                  </div>
                  <div
                    id="pay-card"
                    className="w-[45%] h-9 sm:h-9 bg-slate-300 px-3 py-2 rounded-full grid place-content-center cursor-pointer  hover:transform hover:scale-110"
                  >
                    <Link href={"/payment/card"}>Card</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="footer-pages-container  mb-[64px] bg-amber-950 sm:!bg-white -mt-[10px]">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
