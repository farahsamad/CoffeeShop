"use server";

import * as z from "zod";
import { AddProductSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { addProductToDb } from "@/data/add-product";

// }
export type AddProductState = {
  productName: string;
  productImage: string;
  productPrice: number;
  productTypeName: string;
  success?: boolean | string;
  errors?: AddProductErrors;
  callbackUrl?: string | null;
};

export type AddProductErrors = {
  productName?: string;
  productImage?: string;
  productPrice?: string;
  productTypeName?: string;
  other?: string;
};

export async function addProduct(state: AddProductState, form: FormData): Promise<AddProductState> {
  console.log("add product to db .ts");
  const data = Object.fromEntries(form);
  // const result = LoginSchema.safeParse(data);
  // const values: z.infer<typeof LoginSchema> = {
  //   email: form.get("email"),
  //   password: form.get("password") as string,
  // };

  const validatedFields = AddProductSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors: AddProductErrors = {};
    validatedFields.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof AddProductErrors;
      errors[key] = issue.message;
      console.log("key", key, "issue.message: ", issue.message);
    });
    // const errors = validatedFields.error.formErrors;
    // const errors:LoginErrors = validatedFields.error.issues.reduce((acc, issue) => {
    //   acc[issue.path[0]] = issue.message;
    //   return acc;
    // }, {} as Record<string, string>);

    return { ...state, success: false, errors };
  }

  const {
    productName,
    productImage,
    productPrice: productPriceString,
    productTypeName,
  } = validatedFields.data;
  const productPrice = parseInt(productPriceString.replace(/\s/g, ""), 10);
  console.log("productName: ", productName);
  console.log("productImage: ", productImage);
  console.log("productPrice: ", productPrice);
  console.log("productTypeName: ", productTypeName);

  const addProduct = await addProductToDb({
    productName,
    productImage,
    productPrice,
    productTypeName,
  });
  console.log("addProduct: ", addProduct);
  if (!addProduct) {
    const errors: AddProductErrors = { other: "Add product failed!" };
    return {
      ...state,
      success: "",
      errors,
    };
  }
  console.log("succeed to add product");
  return {
    productName,
    productImage,
    productPrice,
    productTypeName,
    success: "succeed to add product",
    callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT,
    errors: {},
  };
}

// if (result?.ok) {
// return { ...state, success: true, callbackUrl: state.callbackUrl || DEFAULT_LOGIN_REDIRECT };
