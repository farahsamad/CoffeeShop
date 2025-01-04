"use client";

import React, { useState, useRef, useEffect } from "react";
// import PhoneInputWithCountrySelect from "react-phone-number-input";
// import { E164Number } from "libphonenumber-js/types.cjs";
// import "react-phone-number-input/style.css";
import FloatingInput from "./ui/floating-input";
import { FaArrowLeft, FaArrowRight, FaAt, FaUser } from "react-icons/fa";
import { useMyContext } from "@/context/context";
import { PhoneInput } from "./ui/phone-input";
import { ArrowRight, Download } from "lucide-react";

interface homeProps {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

function Cash() {
  //   const [phoneNumber, setPhoneNumber] = useState<string | E164Number | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [phone, setPhone] = useState("");
  const firstDiv = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { barVisibility, aboutRef, pageShowHeader, sectionsRef } = useMyContext();
  //   const outletContext = useOutletContext<homeProps>();
  //   const barVisibility = outletContext.barVisibility;
  console.log("first");
  useEffect(() => {
    const elements = document.getElementsByClassName("PhoneInputInput");
    console.log("elements: ", elements);
    if (elements.length > 0) {
      const inputElement = elements[0] as HTMLInputElement;
      console.log("inputElement: ", inputElement);

      inputElement.maxLength = 15;
    }
  }, []);

  return (
    <div ref={firstDiv}>
      <div
        className={`main-home-page-container sm:!flex sm:!justify-center sm:!items-center w-full h-full mt-[100px] ${
          barVisibility ? "" : "bar-visible"
        }`}
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        <div
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
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"FaUser"}
                    id="name-container"
                    type={"text"}
                    name={"name"}
                  />
                  <FloatingInput
                    placeholder={""}
                    // labelRef={(el) => (labelRefs.current[1] = el)}
                    icon={""}
                    id="phone-number-container"
                    type={""}
                    name={""}
                  />
                  <FloatingInput
                    placeholder={"Email"}
                    // labelRef={(el) => (labelRefs.current[1] = el)}
                    icon={"FaAt"}
                    id="email-container"
                    type={"email"}
                    name={"email"}
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
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"FaCity"}
                    id="city-container"
                    type={"text"}
                    name={"city"}
                  />
                  <FloatingInput
                    placeholder={"Address"}
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"CiLocationOn"}
                    id="address-container"
                    type={"text"}
                    name={"address"}
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
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"CalendarDays"}
                    id="date-container"
                    type={"date"}
                    name={"date"}
                  />
                  <FloatingInput
                    placeholder={"note"}
                    // labelRef={(el) => (labelRefs.current[0] = el)}
                    icon={"BsPencilSquare"}
                    id="note-container"
                    type={"text"}
                    name={"note"}
                  />
                  {/* <input type="date" name="" id="" /> */}
                </div>
              </div>
            </div>
          </div>
          <div
            id="second-cash-payment-container"
            className="min-h-fit w-full sm:!w-2/5 justify-center flex shadow-inner  sm:!h-full"
          >
            <div
              id="invoice-info-container"
              className="flex  w-[300px]  sm:!w-[90%]  sm:!h-full shadow-md sm:!shadow-none flex-col mb-[100px] sm:!mb-0 mt-5 sm:!mt-0"
            >
              <div
                id="first-part-invoice"
                className="w-full h-[25%] bg-gray-500 mt-3 px-2 py-[2%] text-sm"
              >
                <div className="h-[35%]  text-base font-black font-[cursive] text-gray-800 flex items-center">
                  CoffeeShop
                </div>
                <div className="h-[40%] flex items-end text-xs text-white">10/10/2024</div>
                <div className="h-[20%] w-full flex justify-between text-white text-xs items-center">
                  <div>Cash</div>
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
              <div
                id="fifth-part-invoice"
                className="w-full h-[10%] flex items-center bg-gray-500 justify-center cursor-pointer text-xl hover:scale-105 rounded-sm text-white"
              >
                <div>Pay</div>
                <div className="ml-2 animate-bounce mt-[6px]">
                  <ArrowRight className=" w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cash;
