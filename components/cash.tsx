"use client";

import React, { useState, useRef, useEffect, useActionState, startTransition } from "react";
import FloatingInput from "./ui/floating-input";
import { useMyContext } from "@/context/context";
import { ArrowRight, Download, XCircle } from "lucide-react";
import Form from "next/form";
import { payCash } from "@/actions/payCash";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductDetails } from "./cart";
import { PayCardCashState } from "@/actions/payCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { deleteUserCartProduct } from "@/actions/deleteUserCartProduct";
import { BiCheckCircle } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import Invoice from "./invoice";
import { addDiscount } from "@/actions/addDiscount";

export interface payloadProps {
  state: PayCardCashState;
  form: FormData;
  subTotalPrice: number;
  totalPrice: number;
  taxesPrice: number;
  discount: number;
  cartProducts: ProductDetails[];
}

export enum deliveryCities {
  Tripoli = "tripoli",
  Beirut = "beirut",
  Akkar = "akkar",
  Batroun = "batroun",
  Jbeil = "jbeil",
  Jounieh = "jounieh",
  Koura = "koura",
  Dannieh = "dannieh",
  Saida = "saida",
  Sour = "sour",
}

function Cash() {
  const [error, setError] = useState("");
  const [cartProducts, setCartProducts] = useState<ProductDetails[]>([]);
  const [subTotalPrice, SetSubTotalPrice] = useState<number>(0);
  const [totalPrice, SetTotalPrice] = useState<number>(0);
  const [taxesPrice, setTaxesPrice] = useState<number>(subTotalPrice * 0.2);
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [deliveryCity, setDeliveryCity] = useState<string>("");
  const [buyerName, setBuyerName] = useState<string>("");
  const firstDiv = useRef<HTMLDivElement>(null);
  const generatedInvoice = useRef<HTMLDivElement>(null);
  const user = useCurrentUser();
  const { barVisibility, updatePerformed } = useMyContext();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: PayCardCashState = {
    name: "",
    email: "",

    phone: 0,
    city: "",
    Address: "",
    deliveryDate: new Date(),
    note: "",
    success: "",
    errors: {
      name: "",
      email: "",
      phone: "",
      city: "",
      Address: "",
      deliveryDate: "",
      other: "",
    },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(
    (state: PayCardCashState, payload: payloadProps) =>
      payCash({
        state,
        form: payload.form,
        subTotalPrice: payload.subTotalPrice,
        totalPrice: payload.totalPrice,
        taxesPrice: payload.taxesPrice,
        discount: payload.discount,
        cartProducts: payload.cartProducts,
      }),
    initialState
  );
  const router = useRouter();

  const getDiscountLocalstorage = async () => {
    const getDiscountJSON = localStorage.getItem("discount");

    if (!getDiscountJSON) return null;
    const getDiscount = JSON.parse(getDiscountJSON);
    const now = new Date();
    const isDiscountExpired = await addDiscount(getDiscount.code);
    if (isDiscountExpired) {
      const hasDiscountExpired = new Date(isDiscountExpired.expiryDate) < new Date();
      if (!hasDiscountExpired) {
        if (now.getTime() > getDiscount.expiry) {
          localStorage.removeItem("discount");
          return null;
        }
        setDiscount(parseFloat(getDiscount.value));
        return parseFloat(getDiscount.value);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("AddToCart")) {
      const storedCartProducts = localStorage.getItem("AddToCart");
      if (storedCartProducts) {
        getDiscountLocalstorage();
        console.log("discount: ", discount);
        console.log("totalPrice: ", totalPrice);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("AddToCart")) {
      const storedCartProducts = localStorage.getItem("AddToCart");
      if (storedCartProducts) {
        const parsedCartProducts: ProductDetails[] = JSON.parse(storedCartProducts);
        setCartProducts(parsedCartProducts);
        const totalPriceAmount = parsedCartProducts.reduce((total, product) => {
          return total + product.productPrice * product.product_quantity;
        }, 0);
        SetSubTotalPrice(totalPriceAmount);
        const taxesPriceAmount = parseFloat((totalPriceAmount * 0.2).toFixed(1));
        setTaxesPrice(taxesPriceAmount);

        if (totalPriceAmount >= 50) {
          SetTotalPrice(parseFloat((totalPriceAmount + taxesPriceAmount).toFixed(1)));
        } else {
          SetTotalPrice(
            parseFloat((totalPriceAmount + taxesPriceAmount + deliveryPrice).toFixed(1))
          );
          console.log("after discount: ", discount);
          console.log("after totalPrice: ", totalPrice);
        }
      }
    }
  }, []);

  useEffect(() => {
    SetTotalPrice((prev) => prev - discount);
  }, [discount]);

  console.log("discountttttttt: ", discount);

  useEffect(() => {
    if (subTotalPrice < 50) {
      switch (deliveryCity) {
        case deliveryCities.Tripoli:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(2);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 2).toFixed(1)));
          return;
        case deliveryCities.Akkar:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(4);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 4).toFixed(1)));
          return;
        case deliveryCities.Batroun:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(4);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 4).toFixed(1)));
          return;
        case deliveryCities.Beirut:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(7);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 7).toFixed(1)));
          return;
        case deliveryCities.Dannieh:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(4);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 4).toFixed(1)));
          return;
        case deliveryCities.Jbeil:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(5);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 5).toFixed(1)));
          return;
        case deliveryCities.Jounieh:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(6);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 6).toFixed(1)));
          return;
        case deliveryCities.Koura:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(4);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 4).toFixed(1)));
          return;
        case deliveryCities.Saida:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(10);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 10).toFixed(1)));
          return;
        case deliveryCities.Sour:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(11);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 11).toFixed(1)));
          return;
        default:
          SetTotalPrice((prevPrice) => parseFloat((prevPrice - deliveryPrice).toFixed(1)));
          setDeliveryPrice(0);
          SetTotalPrice((prevPrice) => parseFloat((prevPrice + 0).toFixed(1)));
          return;
      }
    }
  }, [deliveryCity]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const generateDownloadAblePdf = async () => {
    const pdfData = generatedInvoice.current;
    try {
      if (pdfData) {
        setTimeout(async () => {
          const canvas = await html2canvas(pdfData);
          const imgData = canvas.toDataURL("image/png");

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
          });
          const width = pdf.internal.pageSize.getWidth();
          const height = (canvas.height * width) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, width, height);
          pdf.save("Invoice.pdf");
        }, 1000);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (localStorage.getItem("AddToCart")) {
      setError("");
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      startTransition(() => {
        formAction({
          form: formData,
          state,
          subTotalPrice,
          totalPrice,
          taxesPrice,
          discount,
          cartProducts,
        });
      });
    } else {
      setError("You must add item to cart first!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (
      state.success !== "" &&
      state.success !== undefined &&
      state.success === "Payment succeeded!"
    ) {
      if (localStorage.getItem("AddToCart")) {
        localStorage.removeItem("AddToCart");
      }
      const deleteUserCartProductsInDb = async () => {
        if (user?.id) {
          const isUserCartProductDeleted = await deleteUserCartProduct(user?.id);
        }
      };
      generateDownloadAblePdf();

      setTimeout(() => {
        localStorage.removeItem("discount");
        deleteUserCartProductsInDb();
        updatePerformed();
        if (state.callbackUrl) {
          router.push(state.callbackUrl);
        } else {
          router.back();
        }
      }, 3000);
    }
  }, [state.success, router, state.callbackUrl]);

  useEffect(() => {
    if (state.errors?.other) {
      setError(state.errors.other);
    }
  }, [state.errors, state.success]);

  return (
    <div ref={firstDiv}>
      <div
        className={`main-home-page-container sm:!flex sm:!justify-center sm:!items-center w-full h-full mt-[100px] ${
          barVisibility ? "" : "bar-visible"
        }`}
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          id="cash-payment-container"
          className="max-h-[650px] sm:!w-[80%] sm:!max-w-[800px]  sm:!shadow-xl sm:!rounded-xl sm:!flex  "
        >
          <div id="first-cash-payment-container" className="sm:!w-3/5 h-full mb-6 sm:!mb-0">
            <div
              id="payment-info-container"
              className="w-[95%] h-full px-3 flex flex-col justify-evenly"
            >
              <div id="first-payment-info-container" className="w-full h-[20%] py-4">
                <div
                  id="part-container"
                  className="flex flex-row w-full h-full items-center justify-between"
                >
                  <div id="order-container" className="font-serif font-bold flex justify-start">
                    Checkout
                  </div>
                </div>
                <hr className="w-full bg-slate-400 h-px " />
              </div>
              <div
                id="second-payment-info-container"
                className="h-[20%] min-h-[20%] flex flex-col justify-center w-full"
              >
                <div
                  id="first-contact-information"
                  className="font-semibold font-sans text-gray-700"
                >
                  Contact information
                </div>
                <div
                  id="second-contact-information"
                  className="h-[85%] min-h-fit mt-2 w-full grid grid-cols-2 sm:grid-cols-2 gap-4"
                >
                  <FloatingInput
                    placeholder={"Name"}
                    icon={"FaUser"}
                    id="name-input-container"
                    type={"text"}
                    name={"name"}
                    state={state}
                    setBuyerName={setBuyerName}
                  />
                  <FloatingInput
                    placeholder={""}
                    icon={""}
                    id="phone-number-input-container"
                    type={""}
                    name={"phone"}
                    state={state}
                  />
                  <FloatingInput
                    placeholder={"Email"}
                    icon={"FaAt"}
                    id="email-input-container"
                    type={"email"}
                    name={"email"}
                    state={state}
                  />
                </div>
              </div>
              <div
                id="third-payment-info-container"
                className="h-[20%] min-h-[20%]  flex flex-col justify-center w-full mt-3"
              >
                <div
                  id="first-delivery-information"
                  className="font-semibold font-sans text-gray-700"
                >
                  Delivery information
                </div>
                <div
                  id="second-delivery-information"
                  className="h-fit min-h-fit mt-2 w-full grid grid-cols-2 sm:grid-cols-2 gap-4"
                >
                  <FloatingInput
                    placeholder={"City"}
                    icon={"FaCity"}
                    id="city-input-container"
                    type={"text"}
                    name={"city"}
                    state={state}
                    setDeliveryCity={setDeliveryCity}
                  />
                  <FloatingInput
                    placeholder={"Address"}
                    icon={"CiLocationOn"}
                    id="address-input-container"
                    type={"text"}
                    name={"Address"}
                    state={state}
                  />
                </div>
              </div>
              <div
                id="fourth-payment-info-container"
                className="h-[20%] min-h-[20%] flex flex-col justify-center  w-full mt-3"
              >
                <div
                  id="first-delivery-information"
                  className="font-semibold font-sans text-gray-700"
                >
                  Schedule Delivery
                </div>
                <div
                  id="second-delivery-information"
                  className="h-[85%] min-h-fit mt-2 w-full grid grid-cols-2 sm:grid-cols-2 gap-4"
                >
                  <FloatingInput
                    placeholder={"Date"}
                    icon={"CalendarDays"}
                    id="date-input-container"
                    type={"date"}
                    name={"deliveryDate"}
                    state={state}
                  />
                  <FloatingInput
                    placeholder={"note"}
                    icon={"BsPencilSquare"}
                    id="note-input-container"
                    type={"text"}
                    name={"note"}
                    state={state}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="second-cash-payment-container"
            className="min-h-fit w-full sm:!w-2/5 justify-center flex  sm:!h-full"
          >
            <div
              id="invoice-info-container"
              className="flex  w-[270px]  sm:!w-[90%] !max-w-[270px]  sm:!h-full shadow-md  flex-col mb-[100px] sm:!mb-0 mt-5 sm:!mt-0 px-4"
            >
              <div
                id="first-part-invoice"
                className="w-full h-[25%] bg-gray-500 mt-3 px-2 py-[2%] text-sm"
              >
                <div className="h-[35%]  text-base font-black font-[cursive] text-gray-800 flex items-center">
                  CoffeeShop
                </div>
                <div className="h-[40%] flex items-end text-xs text-white">{getCurrentDate()}</div>
                <div className="h-[20%] w-full flex justify-between text-white text-xs items-center">
                  <div>Cash</div>
                  <div>{buyerName}</div>
                </div>
              </div>
              <div id="second-part-invoice" className="w-full h-[7%] px-5">
                <div
                  id="download-invoice"
                  className="inline-flex w-full justify-between items-center px-1 text-sm"
                >
                  <div> Downloadable invoice</div>
                  {state.success === "Payment succeeded!" ? (
                    <Link href={"/payment/invoice"}>
                      <Download className=" w-4 h-4 cursor-pointer" />
                    </Link>
                  ) : (
                    <Link href={"/payment/invoice"}>
                      <Download className=" w-4 h-4 cursor-pointer" />
                    </Link>
                  )}
                </div>
                <hr className="my-2 w-full" />
              </div>
              <div
                id="third-part-invoice"
                className="w-full h-[35%] flex flex-col pb-[5%]  text-sm justify-around px-5"
              >
                <div id="items-number" className="text-3xl text-center mb-[10%]">
                  {cartProducts && cartProducts.length ? cartProducts.length : 0}
                  <span className="ml-1">items</span>
                </div>
                <div id="delivery-service" className="inline-flex justify-between">
                  <span className="text-gray-500">Delivery Service</span>
                  {deliveryPrice > 0 ? <span>+ ${deliveryPrice}</span> : <span>$0</span>}
                </div>
                <div id="taxes" className="inline-flex justify-between">
                  <span className="text-gray-500">Taxes</span>
                  {subTotalPrice > 0 ? <span>+${taxesPrice}</span> : <span>$0</span>}
                </div>
                <div id="discount" className="inline-flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  {discount > 0 ? <span>- ${discount}</span> : <span>$0</span>}
                </div>

                <div id="subtotal" className="inline-flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  {subTotalPrice > 0 ? <span>${subTotalPrice}</span> : <span>$0</span>}
                </div>
              </div>
              <div
                id="fourth-part-invoice"
                className="w-full h-[15%] inline-flex justify-between py-[5%] border-t border-t-gray-300 text-xl px-5"
              >
                <span>Total</span>
                {totalPrice > 0 ? <span>${totalPrice.toFixed(1)}</span> : <span>$0</span>}
              </div>
              <button
                id="fifth-part-invoice"
                className="w-full h-[10%] flex items-center bg-gray-500 justify-center cursor-pointer text-xl hover:scale-105 rounded-sm text-white"
                type="submit"
                disabled={isPending}
              >
                <div>Pay</div>
                <div className="ml-2 animate-bounce mt-[6px]">
                  <ArrowRight className=" w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        </Form>

        {state.success === "Payment succeeded!" && (
          <div
            id="modal-container"
            className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          >
            <div className="translate-y-[1000px]">
              <div ref={generatedInvoice}>
                <Invoice
                  cartProducts={cartProducts}
                  paymentMethod={"Cash"}
                  buyerName={buyerName}
                  paymentId={state.paymentId}
                  deliveryCity={deliveryCity}
                  deliveryAddress={state.Address}
                  deliveryPrice={deliveryPrice}
                  taxesPrice={taxesPrice}
                  discount={discount}
                  subTotalPrice={subTotalPrice}
                  totalPrice={totalPrice}
                />
              </div>
            </div>
            <div className="min-w-[250px] md:w-[300px]  fixed left-[50%] top-[30%] z-50 max-w-[300px] translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[350px] flex flex-col justify-evenly">
              <div
                id="payment-success"
                className="flex flex-col w-full h-1/2 py-2 justify-center items-center"
              >
                <BiCheckCircle className="text-green-700 w-[150px] h-[150px]" />
                <div className="text-xl h-1/4 font-extrabold font-mono">${totalPrice}</div>
                <div className=" h-1/4 text-xs text-slate-500">
                  {state.success && state.success}
                </div>
              </div>
              <div id="payment-info" className="h-1/2 w-full  px-6 mb-4">
                <div className="shadow-inner bg-gray-100 p-2 w-full h-full flex flex-col justify-around">
                  <div className="recipient">
                    <div className="text-gray-500 text-xs">Recipient</div>
                    <div>{state.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Payment id</div>
                    <div>{state.paymentId}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Date</div>
                    <div>{getCurrentDate()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {state.errors?.other === "Payment failed!" && (
          <div
            id="modal-container"
            className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          >
            <div className="min-w-[250px] md:w-[300px]  fixed left-[50%] top-[30%] z-50 max-w-[300px] translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[350px] flex flex-col justify-evenly">
              <div
                id="payment-success"
                className="flex flex-col w-full h-full justify-evenly items-center"
              >
                <XCircle className="text-red-700 w-[150px] h-[150px]" />
                <div className="flex flex-col min-h-fit">
                  <div className="text-gray-500 text-xs">Recipient</div>
                  <div className="text-base font-extrabold font-mono">{state.name}</div>
                </div>
                <div className="flex flex-col min-h-fit">
                  <div className="text-gray-500 text-xs">Date</div>
                  <div className="text-base font-extrabold font-mono">{getCurrentDate()}</div>
                </div>
                <div className=" min-h-fit text-xs text-slate-400">
                  {state.errors.other && state.errors.other}
                </div>
              </div>
            </div>
          </div>
        )}
        {state.errors?.other === "Payment failed!" && (
          <div
            id="modal-container"
            className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          >
            <div className="min-w-[250px] md:w-[300px]  fixed left-[50%] top-[30%] z-50 max-w-[300px] translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[350px] flex flex-col justify-evenly">
              <div
                id="payment-success"
                className="flex flex-col w-full h-full justify-evenly items-center"
              >
                <XCircle className="text-red-700 w-[150px] h-[150px]" />
                <div className="flex flex-col min-h-fit justify-evenly h-[110px]">
                  <div>
                    <div className="text-gray-500 text-xs">Recipient</div>
                    <div className="text-base font-extrabold font-mono">{state.name}</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs">Date</div>
                    <div className="text-base font-extrabold font-mono">{getCurrentDate()}</div>
                  </div>
                </div>
                <div className=" min-h-fit text-xs text-slate-400">
                  {state.errors.other && state.errors.other}
                </div>
              </div>
            </div>
          </div>
        )}
        {error === "You must add item to cart first!" && (
          <div
            id="modal-container"
            className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          >
            <div className="min-w-[250px] md:w-[300px]  fixed left-[50%] top-[30%] z-50 max-w-[300px] translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[350px] flex flex-col justify-evenly">
              <div
                id="payment-success"
                className="flex flex-col w-full h-full justify-evenly items-center"
              >
                <XCircle className="text-red-700 w-[150px] h-[150px]" />
                <div className="flex flex-col min-h-fit justify-evenly h-[110px]">
                  <div>
                    <div className="text-gray-500 text-xs">User</div>
                    <div className="text-base font-extrabold font-mono">{user?.name}</div>
                  </div>

                  <div>
                    <div className="text-gray-500 text-xs">Date</div>
                    <div className="text-base font-extrabold font-mono">{getCurrentDate()}</div>
                  </div>
                </div>
                <div className=" min-h-fit text-xs text-slate-400">{error}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cash;
