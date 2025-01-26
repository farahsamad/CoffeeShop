"use client";

import * as z from "zod";
import { twoFactorAuthenticationSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { BiMobileAlt } from "react-icons/bi";
import "@/styles/modal.css";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { foamOptionTypes, icedOptionTypes, productSize, waterOptionTypes } from "@prisma/client";
import { Mail, Trash, User2 } from "lucide-react";
import { getUserPayment } from "@/actions/getUserPayment";
import { removePayment } from "@/actions/removePayment";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { toast } from "@/hooks/use-toast";
import { twoFactorAuthentication } from "@/actions/twoFactorAuthentication";
import { FiLogOut } from "react-icons/fi";
import { LogoutButton } from "./logout-button";
import { FaBoxOpen } from "react-icons/fa";

// type Product = {
//   id: string;
//   productName: string;
//   productImage: string;
//   productPrice: number;
//   productSizes: productSize;
//   productTypeName: string;
//   waterOption: waterOptionTypes | null;
//   icedOption: icedOptionTypes | null;
//   foamOption: foamOptionTypes | null;
// };

// type AddedToCart = {
//   id: string;
//   userId: string;
//   discount: number | null;
//   Tax: number | null;
//   subTotal: number;
//   total: number;
//   createdAt: Date;
// };
interface paymentProducts {
  id: string;
  productId: string;
  paymentId: string;
  productQuantity: number;
  productSizes: productSize | null;
  waterOption: waterOptionTypes | null;
  icedOption: icedOptionTypes | null;
  foamOption: foamOptionTypes | null;
}
interface paymentData {
  name: string;
  id: string;
  phone: number;
  city: string;
  Address: string;
  deliveryDate: Date;
  total: number;
  paymentProducts: paymentProducts[];
}

// type CartProduct = {
//   id: string;
//   ProductId: string;
//   userId: string;
//   AddedToCartId: string;
//   productQuantity: number;
//   productSizes: productSize;
//   waterOption: waterOptionTypes | null;
//   icedOption: icedOptionTypes | null;
//   foamOption: foamOptionTypes | null;
//   product: Product;
//   addedToCart: AddedToCart;
// };

export function ProfileForm() {
  const user = useCurrentUser();
  const [paymentsData, setPaymentsData] = useState<paymentData[] | null>([]);
  const [uniqAddress, setUniqAddress] = useState<paymentData[] | undefined>([]);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const [checkEnableModal, setCheckEnableModal] = useState<boolean>(false);
  const [checkDisableModal, setCheckDisableModal] = useState<boolean>(false);
  // const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean>(
  //   user?.isTwoFactorEnabled ? true : false
  // );
  const [removePaymentOrder, setRemovePaymentOrder] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

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
  //   if (state.success) {
  //     if (state?.twoFactor) {
  //       setShowTwoFactor(true);
  //     } else {
  //       setShowTwoFactor(false);
  //       getSession().then(async () => {
  //         console.log("state success");
  //         console.log("in login form userid: ", state?.userId);
  //         fetchCartProducts(state.userId).then((saved_products) => {
  //           console.log("saved_products here:", saved_products);
  //           if (saved_products) {
  //             // const p = { id: string;
  //             //   productName: string;
  //             //   productImage: string;
  //             //   productTypeName: string;
  //             //   product_size: string;
  //             //   waterOption?: waterOptionTypes | null;
  //             //   icedOption?: icedOptionTypes | null;
  //             //   foamOption?: foamOptionTypes | null;
  //             //   product_quantity: number;
  //             //             productPrice: number;
  //             //           }
  //             saved_products.map((product) => {
  //               const item: ProductDetails = {
  //                 id: product.product.id,
  //                 productName: product.product.productName,
  //                 productImage: product.product.productImage,
  //                 productTypeName: product.product.productTypeName,
  //                 product_size: product.productSizes,
  //                 waterOption: product.waterOption,
  //                 icedOption: product.icedOption,
  //                 foamOption: product.foamOption,
  //                 product_quantity: product.productQuantity,
  //                 productPrice: product.product.productPrice,
  //               };
  //               if (localStorage.getItem("AddToCart") != null) {
  //                 const new_saved_products: ProductDetails[] = JSON.parse(
  //                   localStorage.getItem("AddToCart")!
  //                 );
  //                 new_saved_products.push(item);
  //                 localStorage.setItem("AddToCart", JSON.stringify(new_saved_products));
  //               } else {
  //                 const new_items: ProductDetails[] = [];
  //                 new_items.push(item);
  //                 localStorage.setItem("AddToCart", JSON.stringify(new_items));
  //               }
  //               updatePerformed();
  //             });

  //             // setCartProducts(saved_products);
  //           } else {
  //             updatePerformed();
  //           }
  //         });

  //         router.push(state.callbackUrl || "/");
  //       });
  //     }
  //   }
  // }, [state.success, router, state.callbackUrl, code, state.twoFactor, showTwoFactor]);

  const formatDate = (date: string) => {
    const today = new Date(date);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const getUserPayments = async () => {
    if (user?.id) {
      const data = await getUserPayment(user?.id);
      setPaymentsData(data);
      // const uniqueAddresses = data?.filter(
      //   (val, index, self) =>
      //     index ===
      //     self.findIndex(
      //       (predicate) =>
      //         predicate.Address.toLocaleLowerCase() === val.Address.toLocaleLowerCase() &&
      //         predicate.city.toLocaleLowerCase() === val.city.toLocaleLowerCase()
      //     )
      // );
      const uniqueAddresses = Array.from(
        new Map(data?.map((item) => [`${item.Address}|${item.city}`, item])).values()
      );
      setUniqAddress(uniqueAddresses);
      console.log("data: ", data);
      return data;
    }
  };

  useEffect(() => {
    getUserPayments();
  }, [removePaymentOrder]);

  const handleRemoveOrder = async (id: string) => {
    console.log("order to be deleted id: ", id);
    const removedOrder = await removePayment(id);
    console.log("removedOrder: ", removedOrder);
    if (removedOrder) {
      setRemovePaymentOrder(true);
    }
    if (!removePayment) {
      setRemovePaymentOrder(false);
    }
  };
  // useEffect(() => {
  //   const data = paymentsData?.map
  // }, [paymentsData]);
  // console.log("//////paymentsData: ", paymentsData);
  // console.log("window.innerWidth: ", window.innerWidth);

  const form = useForm<z.infer<typeof twoFactorAuthenticationSchema>>({
    resolver: zodResolver(twoFactorAuthenticationSchema),
    defaultValues: {
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  function onSubmit(data: z.infer<typeof twoFactorAuthenticationSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    if (user?.id) {
      const userId = user.id;
      const isTwoFactorEnabled = data.isTwoFactorEnabled;
      console.log("isTwoFactorEnabled: ", isTwoFactorEnabled);
      if (isTwoFactorEnabled === true || isTwoFactorEnabled === false) {
        startTransition(() => {
          twoFactorAuthentication({ userId, isTwoFactorEnabled }).then((data) => {
            console.log("data: ", data);
            if (data) {
              console.log("setIsTwoFactorEnabled: true");
              // setIsTwoFactorEnabled(isTwoFactorEnabled);
              setCheckEnableModal(false);
              setCheckDisableModal(false);
            } else {
              console.log("setIsTwoFactorEnabled: false");

              // setIsTwoFactorEnabled(isTwoFactorEnabled);
              setCheckEnableModal(false);
              setCheckDisableModal(false);
            }
          });
          // .catch(() => setError("Something went wrong"));
        });
      }
    }
  }

  console.log("uniqAddress: ", uniqAddress);

  return (
    <div
      className="w-full h-full flex flex-col md:!flex md:!flex-row md:justify-center p-6   mt-[100px]"
      // style={{ maxHeight: `calc(100vh - 150px)` }}
    >
      <div className="md:!w-1/2 md:!h-full md:!flex md:!flex-col h-fit max-h-[40%] md:!my-0 ">
        <div
          id="user-info-container"
          className=" min-h-fit flex w-full justify-evenly py-4 md:!py-10 shadow-inner h-[110px] md:!h-[150px] max-w-[600px] bg-gray-50 rounded-sm md:!w-[95%] mb-2"
        >
          <div>
            <img
              src={user?.image || "/image/default-user.png"}
              alt="user image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/image/default-user.png";
              }}
              className="aspect-square h-[60px] w-[60px] md:!h-[80px] md:!w-[80px] rounded-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col h-4/5 justify-evenly max-w-[60%] mt-1 md:!mt-3 min-h-fit">
            <div className="text-slate-500 inline-flex items-center">
              <User2 className="w-4 h-4 md:!mr-0 mr-2 " />
              <span className="md:!ml-[30px] ml-0">{user?.name}</span>
            </div>
            <div className="text-slate-500 inline-flex items-center">
              <Mail className="w-4 h-4 md:!mr-0 mr-2" />
              <span className=" md:!ml-[30px] ml-0">{user?.email}</span>
            </div>
            <div className="text-slate-500 inline-flex items-center">
              <FiLogOut className="w-4 h-4 md:!mr-0 mr-2">
                <LogoutButton />
              </FiLogOut>
              <span className=" md:!ml-[30px] ml-0">
                <LogoutButton />
              </span>
            </div>
            <div className="inline-flex items-center  md:!min-w-fit">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            // onCheckedChange={() => {
                            //   field.onChange;
                            //   setCheckValue((prev) => !prev);
                            // }}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (!user?.isTwoFactorEnabled) {
                                if (checked === false && checkEnableModal === false) {
                                }
                                if (checked === true && checkEnableModal === false) {
                                  setCheckEnableModal(true);
                                }
                                if (checked === false && checkEnableModal === true) {
                                  setCheckEnableModal(false);
                                }
                                if (checked === true && checkEnableModal === true) {
                                }
                              }
                              if (user?.isTwoFactorEnabled) {
                                if (checked === false && checkDisableModal === false) {
                                  setCheckDisableModal(true);
                                }
                                if (checked === true && checkEnableModal === false) {
                                  // setCheckDisableModal(false);
                                }
                                if (checked === false && checkEnableModal === true) {
                                  // setCheckDisableModal(false);
                                }
                                if (checked === true && checkEnableModal === true) {
                                }
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {checkEnableModal && (
                    <div
                      id="modal-container"
                      className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    >
                      <div className="min-w-[250px] md:w-[300px]  fixed left-[50%] top-[30%] z-50 max-w-[300px] translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[170px] flex flex-col justify-evenly">
                        <div
                          id="payment-success"
                          className="flex flex-col w-full py-2 justify-around items-center px-2 h-full"
                        >
                          <div className="text-slate-500 font-serif">
                            Are you sure you want to enable two-factor authentication?
                          </div>
                          <div className="flex w-full justify-end mr-3">
                            <div
                              className="p-2 bg-slate-400 cursor-pointer text-white w-1/4 text-center rounded-lg shadow-md hover:scale-110"
                              onClick={() => setCheckEnableModal(false)}
                            >
                              No
                            </div>
                            <button
                              type="submit"
                              className="p-2 bg-slate-400 cursor-pointer ml-3 text-white w-1/4  rounded-lg shadow-md hover:scale-110"
                            >
                              <div>Submit</div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {checkDisableModal && (
                    <div
                      id="modal-container"
                      className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                    >
                      <div className="min-w-[250px] md:w-[300px]  fixed left-[50%] top-[30%] z-50 max-w-[300px] translate-x-[-50%] translate-y-[-50%] border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[170px] flex flex-col justify-evenly">
                        <div
                          id="payment-success"
                          className="flex flex-col w-full py-2 justify-around items-center px-2 h-full"
                        >
                          <div className="text-slate-500 font-serif">
                            Are you sure you want to disable two-factor authentication?
                          </div>
                          <div className="flex w-full justify-end mr-3">
                            <div
                              className="p-2 bg-slate-400 cursor-pointer text-white w-1/4 text-center rounded-lg shadow-md hover:scale-110"
                              onClick={() => setCheckDisableModal(false)}
                            >
                              No
                            </div>
                            <button
                              type="submit"
                              className="p-2 bg-slate-400 cursor-pointer ml-3 text-white w-1/4  rounded-lg shadow-md hover:scale-110"
                            >
                              <div>Submit</div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
              <span className="text-slate-500 text-sm min-w-fit md:!text-base ml-2 mb-2">
                Two factor authentication
                {/* <span> {isTwoFactorEnabled ? "enabled" : "disabled"}</span> */}
              </span>
            </div>
          </div>
        </div>
        <div
          id="payment-info-container"
          className="hidden md:!block w-full justify-evenly py-4 shadow-inner h-[150px] md:!h-[200px] bg-gray-50 rounded-sm max-w-[600px]  md:!mt-10 md:!w-[95%] md:!px-1 !text-slate-500 relative min-h-fit md:!text-xs lg:!text-base"
        >
          <div className="ml-2 text-lg">Order</div>
          <table
            // id="purchased-product"
            className="w-full mb-2"
          >
            <thead>
              <tr className="font-serif shadow-lg rounded-3xl">
                <th id="order-id" className="w-[19%] max-w-[19%]  py-4">
                  #Order
                </th>
                <th id="order-receiver" className="w-[19%] max-w-[19%] py-4">
                  Receiver
                </th>
                <th id="order-quantity" className="w-[19%] max-w-[19%] py-4">
                  Quantity
                </th>
                <th id="order-date" className="w-[19%] max-w-[19%]  py-4">
                  DeliveryDate
                </th>
                <th id="order-total-price" className="w-[19%] max-w-[19%]  py-4">
                  Total
                </th>
                <th id="order-remove" className="w-[5%] max-w-[5%] min-w-4  py-4"></th>
              </tr>
            </thead>
            <tbody className="max-h-fit">
              {paymentsData &&
                window.innerWidth >= 768 &&
                paymentsData.map((val: paymentData) => {
                  const quantity = val.paymentProducts.reduce((quantity, product) => {
                    return quantity + product.productQuantity;
                  }, 0);
                  // console.log("//////////index here: ", index);
                  return (
                    <tr
                      id="cart-product"
                      className="text-center h-fit relative shadow-lg rounded-3xl my-10 "
                      key={val.id}
                    >
                      <td
                        id="product-image"
                        className="py-4 w-1/4 min-w-1/4 max-w-1/4 max-w-[20px] md:!max-w-[30px] truncate overflow-hidden"
                      >
                        {val.id}
                      </td>
                      <td id="product-quantity" className="py-4">
                        {val.name}
                      </td>
                      <td id="product-price" className="py-4">
                        {quantity}
                      </td>
                      <td id="product-total-price" className="py-4">
                        {formatDate(val.deliveryDate.toString())}
                      </td>
                      <td id="product-total-price" className="py-4">
                        ${val.total}
                      </td>

                      {new Date(val.deliveryDate) > new Date() && (
                        <td id="order-removes" className="py-4 cursor-pointer">
                          <Trash
                            className="w-4 h-4 text-red-600"
                            onClick={() => handleRemoveOrder(val.id)}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {!paymentsData && (
            <div className="h-fit absolute  my-10 text-2xl text-center w-full inline-flex items-center justify-center">
              <FaBoxOpen className="mr-2 text-4xl" />
              No order added yet!
            </div>
          )}
        </div>
      </div>

      <div
        id="address-info-container"
        className="flex flex-col w-full justify-evenly py-px px-2 shadow-inner min-h-fit h-fit max-h-[350px] bg-gray-50 rounded-sm max-w-[500px]  md:!max-h-fit md:!h-fit md:!min-h-[250px] md:!w-1/2 md:!px-10 my-10 md:!my-0"
      >
        {uniqAddress && uniqAddress.length > 0 ? (
          uniqAddress.map((value, index) => {
            // console.log("index: ", index);
            return (
              <div key={`address-${value.id}`}>
                <div className="text-slate-500 font-semibold my-2">Address {index + 1}</div>
                <div className="border border-gray-400 rounded-md pr-2 whitespace-normal break-words w-full flex md:!px-3 md:!py-3">
                  <div className="text-slate-500 text-xs px-1 w-[90%]">
                    <p>{value.name}</p>
                    <p className="line-clamp-2 w-full">{value.Address}</p>
                    <p>{value.city}</p>
                    <div className="inline-flex">
                      <BiMobileAlt className="mr-1 w-4 h-4 " />
                      {value.phone}
                    </div>
                  </div>
                  <div className="w-[10%] !text-gray-700 flex justify-end  mt-1">
                    {/* <Edit className="w-4 h-4 cursor-pointer" /> */}
                    <Trash className="w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-fit text-slate-500 font-semibold  my-10 text-2xl text-center w-full">
            No address added yet!
          </div>
        )}

        <div className="text-slate-500 font-semibold cursor-pointer my-2">+ Add new address</div>
      </div>
      <div
        id="payment-info-container"
        className={`md:!hidden flex flex-col w-full py-4 px-1 shadow-inner h-[150px] max-h-fit md:!h-[200px] bg-gray-50 rounded-sm max-w-[500px] md:!w-1/4 !text-xs !text-slate-500 !mb-16 md:!mb-0 relative ${
          paymentsData ? "min-h-fit" : "min-h-36 "
        }`}
      >
        <div className="ml-2 text-lg max-h-fit">Order</div>
        <table
          // id="purchased-product"
          className="w-full"
        >
          <thead>
            <tr className="font-serif shadow-lg rounded-3xl">
              <th id="order-id" className="w-[19%] max-w-[19%]  py-4">
                #Order
              </th>
              <th id="order-receiver" className="w-[19%] max-w-[19%] py-4">
                Receiver
              </th>
              <th id="order-quantity" className="w-[19%] max-w-[19%] py-4">
                Quantity
              </th>
              <th id="order-date" className="w-[19%] max-w-[19%]  py-4">
                Date
              </th>
              <th id="order-total-price" className="w-[19%] max-w-[19%]  py-4">
                Total
              </th>
              <th id="order-remove" className="w-[6%] max-w-[6%] min-w-4  py-4 mr-1"></th>
            </tr>
          </thead>
          <tbody className="max-h-fit">
            {paymentsData &&
              window.innerWidth < 768 &&
              paymentsData.map((val: paymentData) => {
                const quantity = val.paymentProducts.reduce((quantity, product) => {
                  return quantity + product.productQuantity;
                }, 0);
                // console.log("//////////index: ", index);
                return (
                  <tr
                    id="cart-product"
                    className="text-center h-fit relative shadow-lg rounded-3xl my-10 "
                    key={val.id}
                  >
                    <td
                      id="product-image"
                      className="py-4 w-1/4 min-w-1/4 max-w-1/4 max-w-[20px] md:!max-w-[30px] truncate overflow-hidden"
                    >
                      {val.id}
                    </td>
                    <td id="product-quantity" className="py-4">
                      {val.name}
                    </td>
                    <td id="product-price" className="py-4">
                      {quantity}
                    </td>
                    <td id="product-total-price" className="py-4">
                      {formatDate(val.deliveryDate.toString())}
                    </td>
                    <td id="product-total-price" className="py-4">
                      ${val.total}
                    </td>
                    <td id="order-removes" className="py-4 cursor-pointer">
                      {new Date(val.deliveryDate) > new Date() && (
                        <Trash
                          className="w-4 h-4 text-red-600"
                          onClick={() => handleRemoveOrder(val.id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!paymentsData && (
          <div className="h-fit absolute  my-10 top-16 text-2xl text-center w-full inline-flex items-center justify-center">
            <FaBoxOpen className="mr-2 text-4xl" />
            No order added yet!
          </div>
        )}
      </div>
    </div>
  );
}
