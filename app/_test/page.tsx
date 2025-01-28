"use client";

import React, { startTransition, useActionState, useEffect } from "react";
import "@/styles/navbar.css";
import Form from "next/form";
import { addProduct, AddProductState } from "@/actions/addProduct";
import { useSearchParams } from "next/navigation";

const TestPage = () => {
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: AddProductState = {
    productName: "",
    productImage: "",
    productPrice: 0,
    productTypeName: "",
    success: false,
    errors: { productName: "", productImage: "", productPrice: "", productTypeName: "" },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(addProduct, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // setError("");
    // setSuccess("");
    e.preventDefault();
    startTransition(() => {
      formAction(new FormData(e.currentTarget));
    });
  };

  useEffect(() => {
    if (state.errors?.other) {
      console.log(state.errors.other);
    } else if (state.success) {
      console.log(state.success.toString());
    }
  }, [state.errors, state.success]);

  return (
    <div className="logo-container h-screen w-full flex items-center justify-center">
      <Form
        action={""}
        onSubmit={handleSubmit}
        className="flex flex-col mt-[100px] h-[80%] justify-evenly w-full items-center"
      >
        <input
          type="text"
          name="productName"
          placeholder="productName"
          className="!bg-white !text-black border border-gray-500"
        />
        <input
          type="text"
          name="productImage"
          placeholder="productImage"
          className="!bg-white !text-black border border-gray-500"
        />
        <input
          type="text"
          name="productPrice"
          placeholder="productPrice"
          className="!bg-white !text-black border border-gray-500"
        />
        <input
          type="text"
          name="productTypeName"
          placeholder="productTypeName"
          className="!bg-white !text-black border border-gray-500"
        />
        <button className="border-2 cursor-pointer" type="submit" disabled={isPending}>
          Add
        </button>
      </Form>
    </div>
  );
};

export default TestPage;
