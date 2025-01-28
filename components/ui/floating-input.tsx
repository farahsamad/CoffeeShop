import React, { useState } from "react";
import { FaAt } from "react-icons/fa";
import { PhoneInput } from "./phone-input";
import { BiCreditCard, BiSolidCity, BiTime, BiUser } from "react-icons/bi";
import { GoCreditCard, GoLocation } from "react-icons/go";
import { CalendarDays } from "lucide-react";
import { BsCreditCard, BsPencilSquare } from "react-icons/bs";
import { PayCardCashState } from "@/actions/payCard";
import { FiAlertTriangle } from "react-icons/fi";

interface inputProps {
  placeholder: string;
  icon: string;
  id: string;
  type: string;
  name: string;
  state: PayCardCashState;
  setDeliveryCity?: React.Dispatch<React.SetStateAction<string>>;
  setBuyerName?: React.Dispatch<React.SetStateAction<string>>;
}

const FloatingInput: React.FC<inputProps> = ({
  placeholder,
  icon,
  id,
  type,
  name,
  state,
  setDeliveryCity,
  setBuyerName,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");
  const phoneValue = "";

  return (
    <div className="flex flex-col h-fit justify-evenly w-full">
      <div
        className="flex h-fit items-center w-full"
        style={{
          borderBottomWidth: isFocused ? "2px " : "2px",
          borderBottomColor:
            name === "email" && state.errors?.email
              ? "red"
              : name === "name" && state.errors?.name
              ? "red"
              : name === "city" && state.errors?.city
              ? "red"
              : name === "Address" && state.errors?.Address
              ? "red"
              : name === "deliveryDate" && state.errors?.deliveryDate
              ? "red"
              : name === "cvv" && state.errors?.cvv
              ? "red"
              : name === "cardExpire" && state.errors?.cardExpire
              ? "red"
              : name === "cardNumber" && state.errors?.cardNumber
              ? "red"
              : name === "nameOnCard" && state.errors?.nameOnCard
              ? "red"
              : name === "phone" && state.errors?.phone
              ? "red"
              : isFocused
              ? "rgb(17,44,103)"
              : "",
        }}
      >
        {icon === "FaUser" && (
          <BiUser
            style={{
              color:
                name === "name" && state.errors?.name ? "red" : isFocused ? "rgb(17,44,103)" : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "FaAt" && (
          <FaAt
            style={{
              color:
                name === "email" && state.errors?.email ? "red" : isFocused ? "rgb(17,44,103)" : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "CiLocationOn" && (
          <GoLocation
            style={{
              color:
                name === "Address" && state.errors?.Address
                  ? "red"
                  : isFocused
                  ? "rgb(17,44,103)"
                  : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "FaCity" && (
          <BiSolidCity
            style={{
              color:
                name === "city" && state.errors?.city ? "red" : isFocused ? "rgb(17,44,103)" : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "CalendarDays" && (
          <CalendarDays
            style={{
              color:
                name === "deliveryDate" && state.errors?.deliveryDate
                  ? "red"
                  : isFocused
                  ? "rgb(17,44,103)"
                  : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "BsPencilSquare" && (
          <BsPencilSquare
            style={{
              color: isFocused ? "rgb(17,44,103)" : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "BsCreditCard" && (
          <BsCreditCard
            style={{
              color:
                name === "cardNumber" && state.errors?.cardNumber
                  ? "red"
                  : isFocused
                  ? "rgb(17,44,103)"
                  : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "BiTime" && (
          <BiTime
            style={{
              color:
                name === "cardExpire" && state.errors?.cardExpire
                  ? "red"
                  : isFocused
                  ? "rgb(17,44,103)"
                  : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "cvv" && (
          <GoCreditCard
            style={{
              color:
                name === "cvv" && state.errors?.cvv ? "red" : isFocused ? "rgb(17,44,103)" : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon === "BiCreditCard" && (
          <BiCreditCard
            style={{
              color:
                name === "nameOnCard" && state.errors?.nameOnCard
                  ? "red"
                  : isFocused
                  ? "rgb(17,44,103)"
                  : "",
            }}
            className="text-black ml-[2px] mr-[2px] w-5 h-3"
          />
        )}
        {icon !== "" ? (
          <hr
            className="h-[2%] w-[14px] my-2 border  rotate-90"
            style={{
              borderColor:
                name === "email" && state.errors?.email
                  ? "red"
                  : name === "name" && state.errors?.name
                  ? "red"
                  : name === "city" && state.errors?.city
                  ? "red"
                  : name === "Address" && state.errors?.Address
                  ? "red"
                  : name === "deliveryDate" && state.errors?.deliveryDate
                  ? "red"
                  : name === "cvv" && state.errors?.cvv
                  ? "red"
                  : name === "cardExpire" && state.errors?.cardExpire
                  ? "red"
                  : name === "cardNumber" && state.errors?.cardNumber
                  ? "red"
                  : name === "nameOnCard" && state.errors?.nameOnCard
                  ? "red"
                  : name === "phone" && state.errors?.phone
                  ? "red"
                  : "",
            }}
          />
        ) : null}

        <div className="relative">
          {id === "phone-number-input-container" ? (
            <>
              <label
                className={`absolute left-0 transition-all ml-[50px] text-xs ${
                  isFocused || phoneValue
                    ? "-top-[6px] text-gray-700"
                    : "top-[10px] text-gray-600 cursor-text"
                }`}
                htmlFor="phone-number-input-container"
                style={{
                  color:
                    name === "phone" && state.errors?.phone
                      ? "red"
                      : isFocused
                      ? "rgb(17,44,103)"
                      : "",
                }}
              >
                Phone
                <span className="text-red-500 font-bold">*</span>
              </label>
              <PhoneInput
                setIsFocused={setIsFocused}
                isFocused={isFocused}
                isError={state.errors?.phone}
              />
            </>
          ) : (
            <>
              <label
                className={`absolute left-0 transition-all text-xs  ${
                  isFocused || value
                    ? "-top-[6px] text-gray-700"
                    : "top-[7px] text-gray-600 cursor-text"
                }`}
                htmlFor={id}
                style={{
                  color:
                    name === "email" && state.errors?.email
                      ? "red"
                      : name === "name" && state.errors?.name
                      ? "red"
                      : name === "city" && state.errors?.city
                      ? "red"
                      : name === "Address" && state.errors?.Address
                      ? "red"
                      : name === "deliveryDate" && state.errors?.deliveryDate
                      ? "red"
                      : name === "cvv" && state.errors?.cvv
                      ? "red"
                      : name === "cardExpire" && state.errors?.cardExpire
                      ? "red"
                      : name === "cardNumber" && state.errors?.cardNumber
                      ? "red"
                      : name === "nameOnCard" && state.errors?.nameOnCard
                      ? "red"
                      : name === "phone" && state.errors?.phone
                      ? "red"
                      : isFocused
                      ? "rgb(17,44,103)"
                      : "",
                }}
              >
                {placeholder}
                {name === "note" ? null : <span className="text-red-500 font-bold">*</span>}
              </label>
              {type === "date" ? (
                <input
                  id={id}
                  // type={isFocused || value ? "date" : "text"}
                  type="date"
                  name={name}
                  maxLength={20}
                  value={value}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setValue(e.target.value)}
                  className="block w-full  py-2 outline-none cursor-text bg-transparent focus:outline-none sm:!text-base text-xs h-9"
                />
              ) : name === "city" ? (
                <input
                  id={id}
                  type={type}
                  name={name}
                  maxLength={20}
                  value={value}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    setValue(e.target.value),
                      setDeliveryCity && setDeliveryCity(e.target.value.toLowerCase());
                  }}
                  className="block w-full  py-2 outline-none cursor-text bg-transparent focus:outline-none sm:!text-base text-xs h-9"
                />
              ) : (
                <input
                  id={id}
                  type={type}
                  name={name}
                  maxLength={(type === "text" && name === "address") || name === "note" ? 200 : 40}
                  value={value}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    setValue(e.target.value), setBuyerName && setBuyerName(e.target.value);
                  }}
                  className="block w-full  py-2 outline-none cursor-text bg-transparent focus:outline-none sm:!text-base text-xs h-9"
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="text-red-500 h-4 mt-[2px] text-xs">
        {name === "email" && state.errors?.email ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.email}</span>
          </div>
        ) : name === "name" && state.errors?.name ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.name}</span>
          </div>
        ) : name === "Address" && state.errors?.Address ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.Address}</span>
          </div>
        ) : name === "cardExpire" && state.errors?.cardExpire ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.cardExpire}</span>
          </div>
        ) : name === "cardNumber" && state.errors?.cardNumber ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.cardNumber}</span>
          </div>
        ) : name === "city" && state.errors?.city ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.city}</span>
          </div>
        ) : name === "cvv" && state.errors?.cvv ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.cvv}</span>
          </div>
        ) : name === "deliveryDate" && state.errors?.deliveryDate ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.deliveryDate}</span>
          </div>
        ) : name === "nameOnCard" && state.errors?.nameOnCard ? (
          <div className="flex w-full h-full items-center">
            <FiAlertTriangle /> <span className="ml-1">{state.errors.nameOnCard}</span>
          </div>
        ) : (
          name === "phone" &&
          state.errors?.phone && (
            <div className="flex w-full h-full items-center">
              <FiAlertTriangle /> <span className="ml-1">{state.errors.phone}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FloatingInput;
