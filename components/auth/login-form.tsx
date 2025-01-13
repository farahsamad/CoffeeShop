"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { login, LoginState } from "@/actions/login";
import Form from "next/form";
import { FaRegEnvelope } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import Input from "../ui/form-input";
import { BiCheckCircle } from "react-icons/bi";
import { getSession } from "next-auth/react";
import "@/styles/modal.css";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserCartProductsFromDb } from "@/actions/getUserCartProducts";
import { foamOptionTypes, icedOptionTypes, productSize, waterOptionTypes } from "@prisma/client";
import { ProductDetails } from "../cart";
import { useMyContext } from "@/context/context";
import Link from "next/link";

interface LoginProps {
  children: React.ReactNode;
}
// ({ product: { id: string; waterOption: waterOptionTypes | null; icedOption: icedOptionTypes | null; foamOption: foamOptionTypes | null; ... 4 more ...; productTypeName: string; }; addedToCart: { ...; }; } & { ...; })

// interface savedProductsProps {
//   product: {
//     id: string;
//     waterOption: waterOptionTypes | null;
//     icedOption: icedOptionTypes | null;
//     foamOption: foamOptionTypes | null;
//     productName: string;
//     productImage: string;
//     productPrice: number;
//     productSizes: productSize;
//     productTypeName: string;
//   };
//   addedToCart: {
//     id: string;
//     userId: string;
//     discount: number;
//     Tax: number;
//     subTotal: number;
//     total: number;
//     createdAt: Date;
//   };
//   id: string;
//   ProductId: string;
//   userId: string;
//   AddedToCartId: string;
//   productQuantity: number;
//   waterOption: waterOptionTypes;
//   icedOption: icedOptionTypes;
//   foamOption: foamOptionTypes;
// }

type Product = {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productSizes: productSize;
  productTypeName: string;
  waterOption: waterOptionTypes | null;
  icedOption: icedOptionTypes | null;
  foamOption: foamOptionTypes | null;
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
  productSizes: productSize;
  waterOption: waterOptionTypes | null;
  icedOption: icedOptionTypes | null;
  foamOption: foamOptionTypes | null;
  product: Product;
  addedToCart: AddedToCart;
};

export function Login() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { updatePerformed } = useMyContext();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: LoginState = {
    userId: "",
    email: "",
    password: "",
    name: "",
    twoFactor: false,
    success: false,
    errors: { userId: "", email: "", password: "", name: "", twoFactor: "", other: "" },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(login, initialState);
  const router = useRouter();
  console.log("state.errors: ", state.errors);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!showTwoFactor) {
      setError("");
      setSuccess("");
      e.preventDefault();
      startTransition(() => {
        formAction(new FormData(e.currentTarget));
      });
    }
    if (showTwoFactor) {
      try {
        setError("");
        setSuccess("");
        e.preventDefault();
        const verificationCode = code.join("");
        const formData = new FormData(e.currentTarget);
        formData.append("code", verificationCode); // Append the token only if it's not null
        startTransition(() => {
          formAction(formData);
        });
      } catch (error) {
        console.log(error);
      }
    }
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

  const fetchCartProducts = async (userId: string): Promise<CartProduct[] | null> => {
    try {
      if (localStorage.getItem("AddToCart") != null) {
        localStorage.removeItem("AddToCart");
        console.log("removeItem");
      }
      console.log("Fetching cart products for userId:", userId);
      const response = await fetch(`/api/getCartProduct?userId=${userId}`);
      const data = await response.json();
      console.log("Fetched cart products:", data.products);
      return data.products;
    } catch (error) {
      console.error("Error fetching cart products:", error);
      return null;
    }
  };

  useEffect(() => {
    if (state.success) {
      if (state?.twoFactor) {
        setShowTwoFactor(true);
      } else {
        setShowTwoFactor(false);
        getSession().then(async () => {
          console.log("state success");
          console.log("in login form userid: ", state?.userId);
          fetchCartProducts(state.userId).then((saved_products) => {
            console.log("saved_products here:", saved_products);
            if (saved_products) {
              // const p = { id: string;
              //   productName: string;
              //   productImage: string;
              //   productTypeName: string;
              //   product_size: string;
              //   waterOption?: waterOptionTypes | null;
              //   icedOption?: icedOptionTypes | null;
              //   foamOption?: foamOptionTypes | null;
              //   product_quantity: number;
              //             productPrice: number;
              //           }
              saved_products.map((product) => {
                const item: ProductDetails = {
                  id: product.product.id,
                  productName: product.product.productName,
                  productImage: product.product.productImage,
                  productTypeName: product.product.productTypeName,
                  product_size: product.productSizes,
                  waterOption: product.waterOption,
                  icedOption: product.icedOption,
                  foamOption: product.foamOption,
                  product_quantity: product.productQuantity,
                  productPrice: product.product.productPrice,
                };
                if (localStorage.getItem("AddToCart") != null) {
                  const new_saved_products: ProductDetails[] = JSON.parse(
                    localStorage.getItem("AddToCart")!
                  );
                  new_saved_products.push(item);
                  localStorage.setItem("AddToCart", JSON.stringify(new_saved_products));
                } else {
                  const new_items: ProductDetails[] = [];
                  new_items.push(item);
                  localStorage.setItem("AddToCart", JSON.stringify(new_items));
                }
                updatePerformed();
              });

              // setCartProducts(saved_products);
            }
          });

          router.push(state.callbackUrl || "/");
        });
      }
    }
  }, [state.success, router, state.callbackUrl]);

  useEffect(() => {
    if (state.errors?.other) {
      setError(state.errors.other);
    } else if (state.success) {
      setSuccess("Login successful!");
    }
  }, [state.errors, state.success]);
  console.log("message is: ", state);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // const navigate = useNavigate();

  // const { error, isLoading, verifyEmail } = useAuthStore();

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
      inputRefs.current[focusIndex] && inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        //  if (inputRefs.current[index + 1]) {
        //  inputRefs.current[index + 1].focus();
        //  }

        // Alternatively, for added safety, use optional chaining:
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      // Create a mock FormEvent
      const mockEvent = {
        preventDefault: () => {},
        // Add any other properties or methods needed by handleSubmit
      } as React.FormEvent<HTMLFormElement>;

      handleSubmit(mockEvent);
    }
  }, [code]);

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
        headerLabel="Log in to your account"
        hrefLabel=" Sign up"
        buttonLabel="Don't have an account?"
        backButtonHref="/signup"
        error={state.errors?.other}
        showSocial
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          // onSubmit={(e) => e.preventDefault()}
          className="w-full h-full flex flex-col justify-evenly"
        >
          {showTwoFactor && (
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
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                />
              ))}
            </div>
          )}
          {!showTwoFactor && (
            <>
              <Input state={state} type="text" name="email" placeholder="Email" />
              <Input state={state} type="password" name="password" placeholder="Password" />
              <div className="flex w-full max-h-14 h-fit justify-between items-center">
                <div className="flex justify-center items-center">
                  <input type="checkbox" name="" id="remember-checkbox" className="accent-black" />
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
