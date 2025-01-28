"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import React, { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { login, LoginState } from "@/actions/login";
import Form from "next/form";
import Input from "../ui/form-input";
import { BiCheckCircle } from "react-icons/bi";
import { getSession } from "next-auth/react";
import "@/styles/modal.css";
import Link from "next/link";
// import { foamOptionTypes, icedOptionTypes, productSize, waterOptionTypes } from "@prisma/client";

export const fetchCartProducts = async (userId: string): Promise<CartProduct[] | null> => {
  try {
    if (localStorage.getItem("AddToCart") != null) {
      localStorage.removeItem("AddToCart");
    }
    const response = await fetch(`/api/getCartProduct?userId=${userId}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return null;
  }
};

type Product = {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productSizes: "Short" | "Tall" | "Grand" | "Venti";
  productTypeName: string;
  waterOption: "No_Water" | "Water" | null;
  icedOption: "Light_Ice" | "Extra_Ice" | "No_Ice" | null;
  foamOption: "Light_Foam" | "Extra_Foam" | "No_Foam" | null;
};

type AddedToCart = {
  id: string;
  userId: string;
  discount: number | null;
  Tax: number | null;
  subTotal: number;
  total: number;
  createdAt: Date;
};

type CartProduct = {
  id: string;
  ProductId: string;
  userId: string;
  AddedToCartId: string;
  productQuantity: number;
  productSizes: "Short" | "Tall" | "Grand" | "Venti";
  waterOption: "No_Water" | "Water" | null;
  icedOption: "Light_Ice" | "Extra_Ice" | "No_Ice" | null;
  foamOption: "Light_Foam" | "Extra_Foam" | "No_Foam" | null;
  product: Product;
  addedToCart: AddedToCart;
};

export function Login() {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  // const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  // const { updatePerformed } = useMyContext();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: LoginState = {
    userId: "",
    email: "",
    password: "",
    name: "",
    twoFactor: false,
    rememberMe: rememberMe,
    success: false,
    errors: {
      userId: "",
      email: "",
      password: "",
      name: "",
      twoFactor: "",
      rememberMe: "",
      other: "",
    },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();
  const handleSubmit = (formData: FormData | React.FormEvent<HTMLFormElement>) => {
    let formDataInstance;
    if (formData instanceof FormData) {
      formDataInstance = formData;
    } else {
      const event = formData as React.FormEvent<HTMLFormElement>;
      event.preventDefault();
      formDataInstance = new FormData(event.currentTarget);
    }

    // setError("");
    // setSuccess("");

    if (!showTwoFactor) {
      startTransition(() => {
        const rememberMeValue = formDataInstance.get("rememberMe") === "on";
        formDataInstance.set("rememberMe", rememberMeValue.toString());
        formAction(formDataInstance);
      });
    } else {
      try {
        const verificationCodeString = code.join("");
        formDataInstance.append("code", verificationCodeString);
        startTransition(() => {
          formAction(formDataInstance);
        });
      } catch (error) {
        console.log("error is: ", error);
      }
    }
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   if (!showTwoFactor) {
  //     setError("");
  //     setSuccess("");
  //     e.preventDefault();
  //     startTransition(() => {
  //       formAction(new FormData(e.currentTarget));
  //     });
  //   }
  //   if (showTwoFactor) {
  //     try {
  //       setError("");
  //       setSuccess("");
  //       e.preventDefault();
  //       const verificationCode = code.join("");
  //       const formData = new FormData(e.currentTarget);
  //       formData.append("code", verificationCode); // Append the token only if it's not null
  //       startTransition(() => {
  //         formAction(formData);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  //     getSession().then(async () => {
  //       console.log("state success");
  //       console.log("in login form userid: ", state?.userId);
  //       await updateProducts(state?.userId);
  //       console.log("state.success");
  //       router.push(state.callbackUrl || "/");
  //     });
  //   }
  // }, [state.success, router, state.callbackUrl]);

  useEffect(() => {
    if (state.success) {
      if (state?.twoFactor) {
        setShowTwoFactor(true);
      } else {
        setShowTwoFactor(false);
        getSession().then(async () => {
          // fetchCartProducts(state.userId).then((saved_products) => {
          //   console.log("saved_products here:", saved_products);
          //   if (saved_products) {
          //     // const p = { id: string;
          //     //   productName: string;
          //     //   productImage: string;
          //     //   productTypeName: string;
          //     //   product_size: string;
          //     //   waterOption?: waterOptionTypes | null;
          //     //   icedOption?: icedOptionTypes | null;
          //     //   foamOption?: foamOptionTypes | null;
          //     //   product_quantity: number;
          //     //             productPrice: number;
          //     //           }
          //     saved_products.map((product) => {
          //       const item: ProductDetails = {
          //         id: product.product.id,
          //         productName: product.product.productName,
          //         productImage: product.product.productImage,
          //         productTypeName: product.product.productTypeName,
          //         product_size: product.productSizes,
          //         waterOption: product.waterOption,
          //         icedOption: product.icedOption,
          //         foamOption: product.foamOption,
          //         product_quantity: product.productQuantity,
          //         productPrice: product.product.productPrice,
          //       };
          //       if (localStorage.getItem("AddToCart") != null) {
          //         const new_saved_products: ProductDetails[] = JSON.parse(
          //           localStorage.getItem("AddToCart")!
          //         );
          //         new_saved_products.push(item);
          //         localStorage.setItem("AddToCart", JSON.stringify(new_saved_products));
          //       } else {
          //         const new_items: ProductDetails[] = [];
          //         new_items.push(item);
          //         localStorage.setItem("AddToCart", JSON.stringify(new_items));
          //       }
          //       updatePerformed();
          //     });

          //     // setCartProducts(saved_products);
          //   } else {
          //     updatePerformed();
          //   }
          // });

          router.push(state.callbackUrl || "/");
        });
      }
    }
  }, [state.success, router, state.callbackUrl, code, state.twoFactor, showTwoFactor]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      if (inputRefs.current[focusIndex]) inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const mockSubmit = () => {
    const formData = new FormData();
    formData.append("email", state.email);
    formData.append("password", state.password);
    // formData.append("rememberMe", state.rememberMe);
    formData.append("code", code.join(""));
    const stateRememberMe = state.rememberMe ? "true" : "false";
    formData.append("rememberMe", stateRememberMe);
    handleSubmit(formData);
  };
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      mockSubmit();
    }
  }, [code]);

  return (
    <div className="w-full h-full items-center justify-center p-6 md:py-6 md:px-0 shadow-md">
      <CardWrapper
        headerLabel={showTwoFactor ? "Two step verification" : "Log in to your account"}
        hrefLabel={showTwoFactor ? "" : " Sign up"}
        buttonLabel={showTwoFactor ? "" : "Don't have an account?"}
        backButtonHref={showTwoFactor ? "" : "/signup"}
        error={state.errors?.other}
        form={showTwoFactor ? "forget" : undefined}
        showSocial
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          // onSubmit={(e) => e.preventDefault()}
          className="w-full h-full flex flex-col justify-evenly"
        >
          {showTwoFactor && (
            <>
              <input
                type="hidden"
                name="email"
                value={state.email}
                placeholder={"Email"}
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
                autoComplete="email"
              />
              <input
                type="hidden"
                name="hiddenRememberMe"
                value={String(state.rememberMe)}
                placeholder={"Remember Me"}
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
              />
              <input
                type="hidden"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={state.password}
              />
              <div className="flex justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-[14%] h-10 sm:!w-12 sm:!h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-slate-400 focus:outline-none"
                  />
                ))}
              </div>
              {state.success && (
                <div className="flex w-full items-center h-[24px] text-green-800 bg-green-300 rounded-sm p-4  font-semibold my-1 ">
                  <BiCheckCircle className="font-semibold text-sm" />
                  <span className="ml-1 -mt-[3px] text-xs">Two step verification code sent!</span>
                </div>
              )}
              <button
                className="w-full max-h-14  h-9 p-2 border border-gray-400 bg-gray-500 grid place-content-center rounded-md shadow-sm text-white cursor-pointer hover:scale-105"
                type="submit"
                disabled={isPending}
              >
                Log in
              </button>
            </>
          )}
          {!showTwoFactor && (
            <>
              <Input state={state} type="text" name="email" placeholder="Email" />
              <Input state={state} type="password" name="password" placeholder="Password" />
              <div className="flex w-full max-h-14 h-fit justify-between items-center">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    name="rememberMe"
                    onChange={(e) => setRememberMe(e.target.checked)}
                    id="remember-checkbox"
                    className="accent-black"
                  />
                  <label htmlFor="remember-checkbox" className="text-xs ml-1 text-slate-400">
                    Remember me
                  </label>
                </div>
                <button className="text-slate-500 text-xs cursor-pointer">
                  <Link href="/password/forgotten">Forgot Password?</Link>
                </button>
              </div>
              {/* <div className="flex w-full items-center h-[24px] text-green-800 bg-green-300 rounded-sm p-4  my-1 font-semibold">
            <BiCheckCircle className="font-semibold text-sm" />
            <span className="ml-1 -mt-[3px] text-xs">Email sent!</span>
          </div> */}
              <button
                className="w-full max-h-14  h-9 p-2 border border-gray-400 bg-gray-500 grid place-content-center rounded-md shadow-sm text-white cursor-pointer hover:scale-105"
                type="submit"
                disabled={isPending}
              >
                Log in
              </button>
            </>
          )}
        </Form>
      </CardWrapper>
    </div>
  );
}
