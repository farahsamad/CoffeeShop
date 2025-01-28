"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import { startTransition, useActionState, useEffect } from "react";
import Form from "next/form";
import { FaLock } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import "@/styles/modal.css";
import { AiFillLock } from "react-icons/ai";
import { resetPassword, ResetPasswordState } from "@/actions/resetPassword";

export function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: ResetPasswordState = {
    password: "",
    confirmPassword: "",
    token: "",
    success: false,
    errors: { password: "", confirmPassword: "", token: "", other: "" },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(resetPassword, initialState);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (token) {
      formData.append("token", token); // Append the token only if it's not null
    } else {
      console.error("Token is null");
      return; // Prevent form submission if token is null
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      router.push(state.callbackUrl || "/login");
    }
  }, [state.success, router, state.callbackUrl]);

  return (
    <div className="w-full h-full items-center justify-center p-6 md:py-6 md:px-0 shadow-md">
      <CardWrapper
        headerLabel="Change password"
        hrefLabel="Back to Login"
        buttonLabel=""
        backButtonHref="/login"
        error={state.errors?.other}
        form="forget"
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          // onSubmit={(e) => e.preventDefault()}
          className="w-full h-full flex flex-col justify-evenly"
        >
          <div className="grid place-content-center my-4 h-10 w-full text-slate-500 text-center">
            <FaLock className="h-14 w-14 text-slate-500" />
          </div>
          {/* <Input state={state} type="text" name="email" placeholder="Email address" /> */}
          {/* <input type="text" name="token" value={token} hidden /> */}
          <div className="w-full max-h-14 h-52 flex flex-col justify-evenly">
            <div
              className="h-9 p-2 border border-gray-400 bg-slate-50 flex rounded-md shadow-sm"
              style={{
                borderColor: state.errors?.password ? "red" : "",
              }}
            >
              <AiFillLock className="grid place-content-center h-full text-slate-500" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
                defaultValue={state.password ? state.password : ""}
                autoComplete="current-password"
              />
            </div>

            <div className="text-red-500 h-4 mt-[2px] text-xs">
              {state.errors?.password && (
                <div className="flex w-full h-full items-center">
                  <FiAlertTriangle /> <span className="ml-1">{state.errors.password}</span>
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-h-14 h-52 flex flex-col justify-evenly">
            <div
              className="h-9 p-2 border border-gray-400 bg-slate-50 flex rounded-md shadow-sm"
              style={{
                borderColor: state.errors?.confirmPassword ? "red" : "",
              }}
            >
              <AiFillLock className="grid place-content-center h-full text-slate-500" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
                defaultValue={state.confirmPassword ? state.confirmPassword : ""}
                autoComplete="current-password"
              />
            </div>

            <div className="text-red-500 h-4 mt-[2px] text-xs">
              {state.errors?.confirmPassword && (
                <div className="flex w-full h-full items-center">
                  <FiAlertTriangle /> <span className="ml-1">{state.errors.confirmPassword}</span>
                </div>
              )}
            </div>
          </div>
          <button
            className="w-full max-h-14  h-9 p-2 border border-gray-400 bg-gray-500 grid place-content-center rounded-md shadow-sm text-white cursor-pointer hover:scale-105"
            type="submit"
            disabled={isPending}
          >
            Reset password
          </button>
        </Form>
      </CardWrapper>
    </div>
  );
}
