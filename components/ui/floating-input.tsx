import React, { useState, useEffect } from "react";
import { FaAt, FaUser, FaUserAlt } from "react-icons/fa";
import { PhoneInput } from "./phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";

interface inputProps {
  placeholder: string;
  icon: string;
  id: string;
  type: string;
  name: string;
}

const FloatingInput: React.FC<inputProps> = ({ placeholder, icon, id, type, name }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  // console.log("isFocused: ", isFocused);
  // console.log("phoneValue", phoneValue.length);

  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  const FormSchema = z.object({
    phone: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });
  useEffect(() => {
    setPhoneValue(JSON.stringify(form.watch("phone"), null));
  }, [form.watch("phone")]);

  return (
    <div
      id={id}
      className="flex  items-center w-full"
      style={{
        borderBottomWidth: isFocused ? "2px " : "2px",
        borderBottomColor: isFocused ? "rgb(17,44,103)" : "",
      }}
    >
      {icon === "FaUser" && (
        <BiUser
          style={{
            color: isFocused ? "rgb(17,44,103)" : "",
          }}
          className="text-black ml-[2px] mr-[2px] w-5 h-3"
        />
      )}
      {icon === "FaAt" && (
        <FaAt
          style={{
            color: isFocused ? "rgb(17,44,103)" : "",
          }}
          className="text-black ml-[2px] mr-[2px] w-5 h-3"
        />
      )}
      {icon === "FaAt" || icon === "FaUser" ? (
        <hr
          className="h-[2%] w-[14px] my-2 border  rotate-90"
          style={{
            borderColor: isFocused ? "rgb(17,44,103)" : "",
          }}
        />
      ) : null}

      <div className="relative">
        {id === "phone-number-container" ? (
          <>
            <label
              className={`absolute left-0 transition-all ml-[50px] text-xs ${
                isFocused || phoneValue.length > 2
                  ? "-top-[6px] text-gray-700"
                  : "top-[17px] text-gray-600 cursor-text"
              }`}
              htmlFor="phone-input-container"
              style={{
                color: isFocused ? "rgb(17,44,103)" : "",
              }}
            >
              Phone Number
              <span className="text-red-500 font-bold">*</span>
            </label>
            <Form {...form}>
              <form
              // onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormControl className="w-full">
                        <PhoneInput {...field} setIsFocused={setIsFocused} isFocused={isFocused} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </>
        ) : (
          <>
            <label
              className={`absolute left-0 transition-all text-xs  ${
                isFocused || value
                  ? "-top-[6px] text-gray-700"
                  : "top-[10px] text-gray-600 cursor-text"
              }`}
              htmlFor={type}
              style={{
                color: isFocused ? "rgb(17,44,103)" : "",
              }}
            >
              {placeholder}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id={type}
              type={type}
              name={name}
              maxLength={type === "text" ? 20 : 40}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setValue(e.target.value)}
              className="check-input  block w-full  py-2 outline-none cursor-text bg-transparent focus:outline-none "
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingInput;
