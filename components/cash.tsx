"use client";

import React, { useState, useRef, useEffect } from "react";
// import PhoneInputWithCountrySelect from "react-phone-number-input";
// import { E164Number } from "libphonenumber-js/types.cjs";
// import "react-phone-number-input/style.css";
import FloatingInput from "./floating-input";
import { FaAt, FaUser } from "react-icons/fa";
import { useMyContext } from "@/context/context";

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
          className="sm:!h-[400px] sm:!w-[550px] sm:!shadow-xl sm:!rounded-xl sm:!flex  "
        >
          <div id="first-cash-payment-container" className="sm:!w-3/5 h-full">
            <div id="payment-info-container" className="w-[95%] h-full px-3">
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
              <div id="second-payment-info-container" className="h-40% w-full">
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
                  <div id="name-container" className="flex border-b-2 items-center w-full">
                    <FaUser className="text-black" />
                    <hr className="h-[40%] w-[3px] mx-2 my-auto" />
                    <FloatingInput
                      placeholder={"Name"}
                      // labelRef={(el) => (labelRefs.current[0] = el)}
                      type={"text"}
                      name={""}
                    ></FloatingInput>
                  </div>
                  <div id="phone-number-container" className="flex border-b-2 items-center w-full">
                    {/* <PhoneInputWithCountrySelect
                      placeholder="Enter phone number"
                      international
                      defaultCountry="LB"
                      className="phone-input"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      countryCallingCodeEditable={true}
                    /> */}
                  </div>
                  <div id="email-container" className="flex border-b-2 items-center w-full h-full">
                    <FaAt className="text-black" />
                    <hr className="h-[40%] w-[3px] mx-2 my-auto" />
                    <FloatingInput
                      placeholder={"Email"}
                      // labelRef={(el) => (labelRefs.current[1] = el)}
                      type={"email"}
                      name={""}
                    ></FloatingInput>
                  </div>
                </div>
              </div>
              <div id="third-payment-info-container" className="h-40% w-full mt-3">
                <div
                  id="first-contact-information"
                  className="font-semibold font-sans text-gray-700"
                >
                  Delivery information
                </div>
                <div
                  id="second-contact-information"
                  className="h-[85%] min-h-fit mt-2 w-full grid grid-cols-2 sm:grid-cols-2 gap-4"
                >
                  <div id="name-container" className="flex border-b-2 items-center w-full"></div>
                  <div
                    id="email-container"
                    className="flex border-b-2 items-center w-full h-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div id="second-cash-payment-container" className="sm:!w-2/5">
            <div id="invoice-info-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cash;
