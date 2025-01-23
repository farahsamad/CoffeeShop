import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const login = (provider: "google" | "facebook") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="w-full h-full ">
      <div className="w-full h-1/2 flex justify-center content-center">
        <div className="w-full h-full relative flex items-center justify-center flex-col">
          <hr className="h-[1.5px] w-full bg-gray-300" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-xs text-black">
            Or continue with
          </span>
        </div>
      </div>

      <div className="w-full h-1/2 flex justify-between ">
        <button
          className="w-[47.5%] h-9 flex justify-center items-center   rounded-md p-2 border border-gray-400 bg-slate-50  shadow-sm cursor-pointer"
          onClick={() => login("google")}
        >
          <FcGoogle className="h-full" />
          <span className="ml-1 -mt-[2px] text-slate-500 ">Google</span>
        </button>
        <button
          className="w-[47.5%] h-9 flex justify-center items-center   rounded-md p-2 border border-gray-400 bg-slate-50  shadow-sm cursor-pointer"
          onClick={() => login("facebook")}
        >
          <BsFacebook className="text-blue-700 h-full" />
          <span className="ml-1 -mt-[2px] text-slate-500">Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default Social;
