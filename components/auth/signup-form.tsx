"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../card-wrapper";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import Form from "next/form";
import Input from "../ui/form-input";
import { signup, SignupState } from "@/actions/signup";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { AiFillLock } from "react-icons/ai";
import "@/styles/modal.css";
import { getSession } from "next-auth/react";

export function Signup() {
  const [verificationCode, setVerificationCode] = useState(false);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const initialState: SignupState = {
    userId: "",
    email: "",
    password: "",
    name: "",
    verificationCode: false,
    success: false,
    errors: { userId: "", email: "", password: "", name: "", verificationCode: "", other: "" },
    callbackUrl: callbackUrl,
  };
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const router = useRouter();

  // const form = useForm<z.infer<typeof LoginSchema>>({
  //   resolver: zodResolver(LoginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
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
    if (!verificationCode) {
      startTransition(() => {
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
  //   if (!verificationCode) {
  //     setError("");
  //     setSuccess("");
  //     e.preventDefault();
  //     startTransition(() => {
  //       formAction(new FormData(e.currentTarget));
  //     });
  //   }
  //   if (verificationCode) {
  //     console.log("verificationCode!!!!!!!!!!!!!!!!!!!!!");
  //     try {
  //       setError("");
  //       setSuccess("");
  //       e.preventDefault();
  //       const verificationCode = code.join("");
  //       const formData = new FormData(e.currentTarget);
  //       console.log("verificationCode!!!!!!!!!!!!!!!!!!!!!: ", verificationCode);
  //       formData.append("code", verificationCode); // Append the token only if it's not null
  //       startTransition(() => {
  //         console.log("formAction");
  //         formAction(formData);
  //       });
  //     } catch (error) {
  //       console.log("error is: ", error);
  //     }
  //   }
  // };

  useEffect(() => {
    if (state.success === "Confirmation email sent!") {
      if (state.verificationCode) {
        setVerificationCode(true);
      }
    }
    if (state.success === "Signin success!") {
      setVerificationCode(false);
      getSession().then(async () => {
        console.log("state success");
        console.log("in login form userid: ", state?.userId);
        setTimeout(() => {
          window.location.reload();
          router.push(state.callbackUrl || "/");
        }, 500);
      });
    }
  }, [state.success, router, state.callbackUrl, state.verificationCode, verificationCode]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex] && inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

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
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("code", code.join(""));
    handleSubmit(formData);
  };
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      console.log("handle mock submit");
      mockSubmit();
      console.log("handleSubmit mock submitted!");
    }
  }, [code]);

  console.log("message is: ", state);

  return (
    <div className="w-full h-full items-center justify-center p-6 md:py-6 md:px-0 shadow-md">
      <CardWrapper
        headerLabel={verificationCode ? "Verify an account" : "Create an account"}
        hrefLabel={verificationCode ? "Back to Login" : " Log in"}
        buttonLabel={verificationCode ? "" : "Already have an account?"}
        backButtonHref={verificationCode ? "" : "/login"}
        error={state.errors?.other}
        form={verificationCode ? "forget" : undefined}
        showSocial
      >
        <Form
          action={""}
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-evenly"
        >
          {verificationCode && (
            <>
              <input
                type="hidden"
                name="name"
                value={state.name}
                placeholder={"Name"}
                className="bg-slate-50 outline-none placeholder-slate-500 text-slate-500 ml-2 w-[85%] -mt-[2px] autofill:text-slate-500 autofill:bg-yellow-200 "
                autoComplete="name"
              />
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
                    className="w-[14%] h-10 sm:!w-12 sm:!h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-white focus:outline-none"
                  />
                ))}
              </div>
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
            </>
          )}
          {!verificationCode && (
            <>
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
            </>
          )}
        </Form>
      </CardWrapper>
    </div>
  );
}
