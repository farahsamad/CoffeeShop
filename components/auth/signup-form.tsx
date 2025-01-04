"use client";

import { useRouter } from "next/navigation";
import CardWrapper from "../card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import Form from "next/form";
import Input from "../ui/form-input";
import { signup, SignupState } from "@/actions/signin";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { AiFillLock } from "react-icons/ai";
import "@/styles/modal.css";

interface SignupProps {
  children: React.ReactNode;
}

export function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const initialState: SignupState = {
    email: "",
    password: "",
    name: "",
    success: false,
    errors: { email: "", password: "", name: "", other: "" },
  };
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    await formAction(new FormData(e.currentTarget));
  };

  // const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  //     setError('')
  //   setSuccess('')
  //   use
  // }
  console.log("message is: ", state);

  return (
    <div className="w-full h-full items-center justify-center p-6 md:py-6 md:px-0 shadow-md">
      <CardWrapper
        headerLabel="Create an account"
        hrefLabel=" Log in"
        buttonLabel="Already have an account?"
        backButtonHref="/login"
        error={state.errors?.other}
        showSocial
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-evenly"
        >
          <Input state={state} type="text" name="name" placeholder="Name" />
          <Input state={state} type="text" name="email" placeholder="Email" />
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
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px]"
                defaultValue={state.password ? state.password : ""}
                autoComplete="new-password"
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
          {/* <div className="flex w-full max-h-14 h-fit justify-between items-center">
            <div className="flex justify-center items-center">
              <input type="checkbox" name="" id="remember-checkbox" className="accent-black" />
              <label htmlFor="remember-checkbox" className="text-xs ml-1 text-slate-400">
                Remember me
              </label>
            </div>
            <div className="text-slate-500 text-xs cursor-pointer">Forgot Password?</div>
          </div> */}
          {state.success && (
            <div className="flex w-full items-center h-[24px] text-green-800 bg-green-300 rounded-sm p-4  font-semibold my-1 ">
              <BiCheckCircle className="font-semibold text-sm" />
              <span className="ml-1 -mt-[3px] text-xs">{state.success}</span>
            </div>
          )}

          <button
            className="w-full max-h-14  h-9 p-2 border border-gray-400 bg-gray-500 grid place-content-center rounded-md shadow-sm text-white cursor-pointer hover:scale-105"
            type="submit"
            disabled={isPending}
          >
            Sign up
          </button>
        </Form>
      </CardWrapper>
    </div>
  );
}
