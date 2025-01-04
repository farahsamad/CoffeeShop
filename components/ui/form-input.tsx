import { LoginState } from "@/actions/login";
import React from "react";
import { FaRegEnvelope, FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { AiFillLock } from "react-icons/ai";
import { SignupState } from "@/actions/signin";

interface InputProps {
  state: LoginState;
  type: string;
  name: string;
  placeholder: string;
}

const Input = ({ state, type, name, placeholder }: InputProps) => {
  return (
    <div className="w-full max-h-14 h-52 flex flex-col justify-evenly">
      <div
        className="h-9 p-2 border border-gray-400 bg-slate-50 flex rounded-md shadow-sm"
        style={{
          borderColor:
            // name === "email"
            //   ? state.errors?.email
            //     ? "red"
            //     : ""
            //   : state.errors?.password
            //   ? "red"
            //     : ""
            name === "email" && state.errors?.email
              ? "red"
              : name === "password" && state.errors?.password
              ? "red"
              : name === "name" && state.errors?.name
              ? "red"
              : "",
        }}
      >
        {name === "email" ? (
          <FaRegEnvelope className="grid place-content-center h-full text-slate-500" />
        ) : name === "password" ? (
          <AiFillLock className="grid place-content-center h-full text-slate-500" />
        ) : name === "name" ? (
          <FaUser className="grid place-content-center h-full text-slate-500" />
        ) : (
          ""
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
          defaultValue={
            name === "email" && state.email
              ? state.email
              : name === "password" && state.password
              ? state.password
              : name === "name" && state.name
              ? state.name
              : ""
          }
          autoComplete={
            name === "email" && type
              ? "email"
              : name === "password" && type
              ? "current-password"
              : name === "name" && type
              ? "name"
              : ""
          }
        />
      </div>

      <div className="text-red-500 h-4 mt-[2px] text-xs">
        {name === "email"
          ? state.errors?.email && (
              <div className="flex w-full h-full items-center">
                <FiAlertTriangle /> <span className="ml-1">{state.errors.email}</span>
              </div>
            )
          : name === "password"
          ? state.errors?.password && (
              <div className="flex w-full h-full items-center">
                <FiAlertTriangle /> <span className="ml-1">{state.errors.password}</span>
              </div>
            )
          : state.errors?.name && (
              <div className="flex w-full h-full items-center">
                <FiAlertTriangle /> <span className="ml-1">{state.errors.name}</span>
              </div>
            )}
      </div>
    </div>
  );
};

export default Input;
