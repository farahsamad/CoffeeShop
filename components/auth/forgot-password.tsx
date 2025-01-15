"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { login, LoginState } from "@/actions/login";
import Form from "next/form";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import Input from "../ui/form-input";
import { BiCheckCircle, BiLockAlt } from "react-icons/bi";
import { getSession } from "next-auth/react";
import "@/styles/modal.css";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getUserCartProductsFromDb } from "@/actions/getUserCartProducts";
import { foamOptionTypes, icedOptionTypes, productSize, waterOptionTypes } from "@prisma/client";
import { ProductDetails } from "../cart";
import { useMyContext } from "@/context/context";
import { AiFillLock } from "react-icons/ai";
import { forgotPassword, ForgotPasswordState } from "@/actions/forgotPassword";

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

export function ForgotPassword() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { updatePerformed } = useMyContext();
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
    setError("");
    setSuccess("");
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

  useEffect(() => {
    if (state.success) {
      // getSession().then(async () => {
      console.log("state success");
      // console.log("in login form userid: ", state?.userId);
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
      //   }
      // });

      // router.push(state.callbackUrl || "/");
      // });
    }
  }, [state.success, router, state.callbackUrl]);

  useEffect(() => {
    if (state.errors?.other) {
      setError(state.errors.other);
    } else if (state.success) {
      setSuccess("Email sent!");
    }
  }, [state.errors, state.success]);
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
