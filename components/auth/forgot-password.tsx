"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import { startTransition, useActionState } from "react";
import Form from "next/form";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import "@/styles/modal.css";
import { forgotPassword, ForgotPasswordState } from "@/actions/forgotPassword";

export function ForgotPassword() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: ForgotPasswordState = {
    email: "",
    success: false,
    errors: { email: "", other: "" },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  };

  return (
    <div className="w-full h-full items-center justify-center p-6 md:py-6 md:px-0 shadow-md">
      <CardWrapper
        headerLabel="Trouble with logging in?"
        hrefLabel="Back to Login"
        buttonLabel=""
        backButtonHref="/login"
        error={state.errors?.other}
        form="forget"
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-evenly"
        >
          <div className="grid place-content-center my-4 h-10 w-full text-slate-500 text-center">
            <FaLock className="h-14 w-14 text-slate-500" />
          </div>

          <div className="w-full h-9 p-2 min-h-fit text-center text-slate-500 text-xs">
            Enter your email address and we will send you a link to get back into your account.
          </div>
          <div className="w-full max-h-14 h-52 flex flex-col justify-evenly">
            <div
              className="h-9 p-2 border border-gray-400 bg-slate-50 flex rounded-md shadow-sm"
              style={{
                borderColor: state.errors?.email ? "red" : "",
              }}
            >
              <FaRegEnvelope className="grid place-content-center h-full text-slate-500" />

              <input
                type="text"
                name="email"
                placeholder="Email address"
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
                defaultValue={state.email ? state.email : ""}
                autoComplete="email"
              />
            </div>

            <div className="text-red-500 h-4 mt-[2px] text-xs">
              {state.errors?.email && (
                <div className="flex w-full h-full items-center">
                  <FiAlertTriangle /> <span className="ml-1">{state.errors.email}</span>
                </div>
              )}
            </div>
          </div>
          <button
            className="w-full max-h-14  h-9 p-2 border border-gray-400 bg-gray-500 grid place-content-center rounded-md shadow-sm text-white cursor-pointer hover:scale-105"
            type="submit"
            disabled={isPending}
          >
            Send code
          </button>
        </Form>
      </CardWrapper>
    </div>
  );
}
