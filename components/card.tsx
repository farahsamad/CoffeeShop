"use client";

import React, { useState, useRef, useEffect, startTransition, useActionState } from "react";
import FloatingInput from "./ui/floating-input";
import { useMyContext } from "@/context/context";
import { ArrowRight, Download } from "lucide-react";
import MonthYearInput from "./ui/month-input";
import { useRouter, useSearchParams } from "next/navigation";
import { payCard, PayCardState } from "@/actions/payCard";
import Form from "next/form";

interface homeProps {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

function Card() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState<string | E164Number | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [phone, setPhone] = useState("");
  const firstDiv = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { barVisibility, aboutRef, pageShowHeader, sectionsRef } = useMyContext();
  //   const outletContext = useOutletContext<homeProps>();
  //   const barVisibility = outletContext.barVisibility;

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: PayCardState = {
    name: "",
    email: "",
    phone: 0,
    nameOnCard: "",
    cardNumber: 0,
    cardExpire: "",
    cvv: "",
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
  const [state, formAction, isPending] = useActionState(payCard, initialState);
  const router = useRouter();
  console.log("state.errors: ", state.errors);

  // const form = useForm<z.infer<typeof CashPaymentSchema>>({
  //   resolver: zodResolver(CashPaymentSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");

    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  };

  useEffect(() => {
    if (state.success !== "" && state.success !== undefined) {
      state.callbackUrl ? router.push(state.callbackUrl) : router.back();
    }
  }, [state.success, router, state.callbackUrl]);

  useEffect(() => {
    if (state.errors?.other) {
      setError(state.errors.other);
    } else if (state.success !== "" && state.success !== undefined) {
      setSuccess(state.success);
    }
  }, [state.errors, state.success]);
  // const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  //     setError('')
  //   setSuccess('')
  //   use
  // }
  console.log("message is: ", state);

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
          id="card-payment-container"
          className="max-h-[650px] sm:!w-[80%] sm:!max-w-[800px]  sm:!shadow-xl sm:!rounded-xl sm:!flex  "
        >
          <div id="first-card-payment-container" className="sm:!w-3/5 h-full mb-6 sm:!mb-0">
            <div
              id="payment-info-container"
              className="w-[95%] h-full px-3 flex flex-col justify-around"
            >
              <div id="first-payment-info-container" className="w-full h-[12%] py-2">
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
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"FaUser"}
                    id="name-input-container"
                    type={"text"}
                    name={"name"}
                  />
                  <FloatingInput
                    placeholder={""}
                    // labelRef={(el) => (labelRefs.current[1] = el)}
                    icon={""}
                    id="phone-number-input-container"
                    type={""}
                    name={"phone"}
                  />
                  <FloatingInput
                    placeholder={"Email"}
                    // labelRef={(el) => (labelRefs.current[1] = el)}
                    icon={"FaAt"}
                    id="email-input-container"
                    type={"email"}
                    name={"email"}
                  />
                </div>
              </div>
              <div
                id="third-payment-info-container"
                className="h-[20%] min-h-[20%] flex flex-col justify-center w-full"
              >
                <div
                  id="first-contact-information"
                  className="font-semibold font-sans text-gray-700"
                >
                  Card information
                </div>
                <div
                  id="second-contact-information"
                  className="h-[85%] min-h-fit mt-2 w-full grid grid-cols-2 sm:grid-cols-2 gap-4"
                >
                  <FloatingInput
                    placeholder={"Name On Card"}
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"BiCreditCard"}
                    id="name-on-card-input-container"
                    type={"text"}
                    name={"nameOnCard"}
                  />
                  <FloatingInput
                    placeholder={"Card Number"}
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"BsCreditCard"}
                    id="card-number-input-container"
                    type={"number"}
                    name={"cardNumber"}
                  />
                  <MonthYearInput
                    placeholder="Card Expire"
                    icon="BiTime"
                    id="card-expire-input"
                    type="text"
                    name="cardExpire"
                  />
                  <FloatingInput
                    placeholder="CVV/CVC"
                    icon="cvv"
                    id="cvv-input-container"
                    type="password"
                    name="cvv"
                  />
                </div>
              </div>

              <div
                id="fourth-payment-info-container"
                className="h-[14%] min-h-fit  flex flex-col justify-center w-full"
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
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"FaCity"}
                    id="city-input-container"
                    type={"text"}
                    name={"city"}
                  />
                  <FloatingInput
                    placeholder={"Address"}
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"CiLocationOn"}
                    id="address-input-container"
                    type={"text"}
                    name={"Address"}
                  />
                </div>
              </div>
              <div
                id="fifth-payment-info-container"
                className="h-[14%] min-h-fit flex flex-col justify-center  w-full"
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
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"CalendarDays"}
                    id="date-input-container"
                    type={"date"}
                    name={"deliveryDate"}
                  />
                  <FloatingInput
                    placeholder={"note"}
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"BsPencilSquare"}
                    id="note-input-container"
                    type={"text"}
                    name={"note"}
                  />
                  {/* <input type="date" name="" id="" /> */}
                </div>
              </div>
            </div>
          </div>
          <div
            id="second-card-payment-container"
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
                <div className="h-[40%] flex items-end text-xs text-white">10/2024</div>
                <div className="h-[20%] w-full flex justify-between text-white text-xs items-center">
                  <div>Card</div>
                  <div>Farah Samad</div>
                </div>
              </div>
              <div id="second-part-invoice" className="w-full h-[7%] px-5">
                <div
                  id="download-invoice"
                  className="inline-flex w-full justify-between items-center px-1 text-sm"
                >
                  {/* <span className="inline-flex items-center "> */}
                  {/* <Download className="text-xs w-3 h-3 mr-1" /> */}
                  <div> Download invoice</div>
                  {/* </span> */}
                  <Download className=" w-4 h-4 cursor-pointer" />
                </div>
                <hr className="my-2" />
              </div>
              <div
                id="third-part-invoice"
                className="w-full h-[35%] flex flex-col pb-[5%]  text-sm justify-around px-5"
              >
                <div id="items-number" className="text-3xl text-center mb-[10%]">
                  10 items
                </div>
                <div id="delivery-service" className="inline-flex justify-between">
                  <span className="text-gray-500">Delivery Service</span>
                  <span>+ $3</span>
                </div>
                <div id="taxes" className="inline-flex justify-between">
                  <span className="text-gray-500">Taxes</span>
                  <span>+$0.6</span>
                </div>
                <div id="discount" className="inline-flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span>- $50</span>
                </div>

                <div id="subtotal" className="inline-flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>$250</span>
                </div>
              </div>
              <div
                id="fourth-part-invoice"
                className="w-full h-[15%] inline-flex justify-between py-[5%] border-t border-t-gray-300 text-xl px-5"
              >
                <span>Total</span>
                <span>$203.6</span>
              </div>
              <button
                type="submit"
                id="fifth-part-invoice"
                className="w-full h-[10%] flex items-center bg-gray-500 justify-center cursor-pointer text-xl hover:scale-105 rounded-sm text-white"
              >
                <div>Pay</div>
                <div className="ml-2 animate-bounce mt-[6px]">
                  <ArrowRight className=" w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Card;
