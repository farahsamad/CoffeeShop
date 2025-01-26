"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import { startTransition, useActionState, useEffect, useState } from "react";
import Form from "next/form";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import "@/styles/modal.css";
import { forgotPassword, ForgotPasswordState } from "@/actions/forgotPassword";

export function ForgotPassword() {
  // const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: ForgotPasswordState = {
    email: "",
    success: false,
    errors: { email: "", other: "" },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(forgotPassword, initialState);
  const router = useRouter();
  console.log("state.errors: ", state.errors);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // setError("");
    // setSuccess("");
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  };

  //     getSession().then(async () => {
  //       console.log("state success");
  //       console.log("in login form userid: ", state?.userId);
  //       await updateProducts(state?.userId);
  //       console.log("state.success");
  //       router.push(state.callbackUrl || "/");
  //     });
  //   }
  // }, [state.success, router, state.callbackUrl]);

  // const fetchCartProducts = async (userId: string): Promise<CartProduct[] | null> => {
  //   try {
  //     if (localStorage.getItem("AddToCart") != null) {
  //       localStorage.removeItem("AddToCart");
  //       console.log("removeItem");
  //     }
  //     console.log("Fetching cart products for userId:", userId);
  //     const response = await fetch(`/api/getCartProduct?userId=${userId}`);
  //     const data = await response.json();
  //     console.log("Fetched cart products:", data.products);
  //     return data.products;
  //   } catch (error) {
  //     console.error("Error fetching cart products:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   if (state.errors?.other) {
  //     setError(state.errors.other);
  //   } else if (state.success) {
  //     setSuccess("Email sent!");
  //   }
  // }, [state.errors, state.success]);
  console.log("message is: ", state);

  return (
    <div className="w-full h-full items-center justify-center p-6 md:py-6 md:px-0 shadow-md">
      {/* <button
        onClick={() => {
          router.back();
        }}
      >
        Close modal
      </button> */}
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
          // onSubmit={(e) => e.preventDefault()}
          className="w-full h-full flex flex-col justify-evenly"
        >
          <div className="grid place-content-center my-4 h-10 w-full text-slate-500 text-center">
            <FaLock className="h-14 w-14 text-slate-500" />
          </div>

          <div className="w-full h-9 p-2 min-h-fit text-center text-slate-500 text-xs">
            Enter your email address and we'll send you a link to get back into your account.
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
          {/* <div className="flex w-full max-h-14 h-fit justify-between items-center">
            <div className="flex justify-center items-center">
              <input type="checkbox" name="" id="remember-checkbox" className="accent-black" />
              <label htmlFor="remember-checkbox" className="text-xs ml-1 text-slate-400">
                Remember me
              </label>
            </div>
            <div className="text-slate-500 text-xs cursor-pointer">Forgot Password?</div>
          </div> */}
          {/* <div className="flex w-full items-center h-[24px] text-green-800 bg-green-300 rounded-sm p-4  my-1 font-semibold">
            <BiCheckCircle className="font-semibold text-sm" />
            <span className="ml-1 -mt-[3px] text-xs">Email sent!</span>
          </div> */}
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
