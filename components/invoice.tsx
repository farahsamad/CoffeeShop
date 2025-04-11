import React, { useEffect, useState } from "react";
import { ProductDetails } from "./cart";

interface InvoiceProps {
  cartProducts: ProductDetails[];
  paymentMethod: string;
  buyerName: string;
  paymentId: string | undefined;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryPrice: number;
  taxesPrice: number;
  discount: number;
  subTotalPrice: number;
  totalPrice: number;
}

function Invoice({
  cartProducts,
  paymentMethod,
  buyerName,
  paymentId,
  deliveryCity,
  deliveryAddress,
  deliveryPrice,
  taxesPrice,
  discount,
  subTotalPrice,
  totalPrice,
}: InvoiceProps) {
  const [quantities, setQuantities] = useState<number[]>([]);
  console.log("quantities: ", quantities);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (localStorage.getItem("AddToCart")) {
      const storedCartProducts = localStorage.getItem("AddToCart");
      if (storedCartProducts) {
        const parsedCartProducts: ProductDetails[] = JSON.parse(storedCartProducts);
        // setCartProducts(parsedCartProducts);
        setQuantities(parsedCartProducts.map((product) => product.product_quantity));
      }
    }
  }, []);

  const handleProductTotalPrice = (price: number, quantity: number): number => {
    return quantity * price;
  };

  return (
    <div
      className={`main-home-page-container sm:!flex sm:!justify-center sm:!items-center w-full h-full mt-[100px] my-7`}
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div
        id="invoice-container"
        className="min-h-fit w-full sm:!w-2/5 justify-center flex  sm:!h-full my-6"
      >
        <div
          id="invoice-info-container"
          className="flex  w-[270px]  sm:!w-[90%] !max-w-[270px]  sm:!h-full shadow-md  flex-col mb-[100px] sm:!mb-0 mt-5 sm:!mt-0 px-4 border border-gray-200 max-h-[600px] sm:!max-h-[80%]"
        >
          <div
            id="first-part-invoice"
            className="w-full h-[25%] min-h-24 bg-gray-500 mt-3 px-2 pt-[2%] pb-2 text-sm flex flex-col justify-between max-h-28 md:!max-h-[25%]"
          >
            <div className="h-[35%]  text-base font-black font-[cursive] text-gray-800 flex items-center">
              CoffeeShop
            </div>
            <div className="h-1/2 w-full flex flex-col justify-end">
              <div className="h-[30%] flex items-end text-xs text-white">{paymentId}</div>
              <div className="h-[30%] flex items-end text-xs my-px text-white ">
                {getCurrentDate()}
              </div>
              <div className="h-[30%] w-full flex justify-between text-white text-xs items-center">
                <div>{paymentMethod}</div>
                <div>{buyerName}</div>
              </div>
            </div>
          </div>
          <div
            id="second-part-invoice"
            className="w-full h-[20%] min-h-24 mt-3 px-2 py-[2%] flex flex-col justify-center items-end  text-xs max-h-14 md:!max-h-[20%]"
          >
            <div className="h-[35%] flex">Address</div>
            <div className="h-[30%] flex items-end max-w-[60%] text-end">{deliveryAddress}</div>
            <div className="h-[30%] flex items-end  my-px">{deliveryCity}</div>
          </div>
          <div
            id="third-part-invoice"
            className="w-full min-h-fit grow  mt-3 px-2 pt-[2%] mb-4 text-sm max-h-fit md:!max-h-fit"
          >
            <table id="cart-product" className="w-full">
              <thead>
                <tr>
                  <th
                    id="product-name"
                    className="w-[77px] max-w-[78px] border-b-2 border-gray-300 py-2"
                  ></th>
                  <th
                    id="product-quantity"
                    className="w-1/5 border-b-2 border-gray-300 py-2 text-xs"
                  >
                    Quantity
                  </th>
                  <th
                    id="product-price"
                    className="w-[15%] border-b-2 border-gray-300 py-2 text-xs"
                  >
                    Price
                  </th>
                  <th
                    id="product-total-price"
                    className="w-[15%] border-b-2 border-gray-300 py-2 text-xs"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="max-h-fit text-xs">
                {cartProducts &&
                  cartProducts.map(
                    (val: ProductDetails, index: number, products: ProductDetails[]) => {
                      return (
                        <tr
                          id="cart-product"
                          className="text-center h-fit relative border-t-2 border-slate-300"
                          key={index}
                        >
                          <td
                            id="product-name"
                            className=" !text-left text-wrap py-2 w-fit max-w-[20vw] sm:!max-w-none sm:!w-1/5 pl-1"
                          >
                            {val.productName}
                          </td>
                          <td id="product-quantity" className="py-2">
                            <div className="flex justify-center items-center">
                              <div id="quantity-nbr" className="px-2">
                                {quantities[index]}
                              </div>
                            </div>
                          </td>
                          <td id="product-price" className="py-2">
                            ${val.productPrice}
                          </td>
                          <td
                            id="product-total-price"
                            className="py-2"
                            // ref={(el) => {
                            //   totalRefs.current[index] = el;
                            // }}
                          >
                            ${handleProductTotalPrice(val.productPrice, quantities[index])}
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
          <div
            id="fourth-part-invoice"
            className="w-full h-[25%] flex flex-col pb-[5%] justify-around px-5 max-h-28 md:!max-h-[25%] text-xs"
          >
            <div id="items-number" className="text-xs text-center mb-[10%]">
              {cartProducts && cartProducts.length ? cartProducts.length : 0}
              <span className="ml-1">items</span>
            </div>
            <div id="delivery-service" className="inline-flex justify-between text-xs">
              <span className="text-gray-500">Delivery Service</span>
              {deliveryPrice > 0 ? <span>+ ${deliveryPrice}</span> : <span>$0</span>}
            </div>
            <div id="taxes" className="inline-flex justify-between text-xs">
              <span className="text-gray-500">Taxes</span>
              {subTotalPrice > 0 ? <span>+${taxesPrice}</span> : <span>$0</span>}
            </div>
            <div id="discount" className="inline-flex justify-between text-xs">
              <span className="text-gray-500">Discount</span>
              {discount > 0 ? <span>- ${discount}</span> : <span>$0</span>}
            </div>

            <div id="subtotal" className="inline-flex justify-between text-xs">
              <span className="text-gray-500">Subtotal</span>
              {subTotalPrice > 0 ? <span>${subTotalPrice}</span> : <span>$0</span>}
            </div>
          </div>
          <div
            id="fifth-part-invoice"
            className="w-full h-[10%] inline-flex text-sm justify-between py-[5%] border-t border-t-gray-300 sm:!text-xl px-5 max-h-16 md:!max-h-[10%]"
          >
            <span>Total</span>
            {totalPrice > 0 ? <span>${totalPrice}</span> : <span>$0</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
