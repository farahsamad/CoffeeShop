import React from "react";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { FaFacebook, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Social = () => {
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
        <div className="w-[47.5%] h-9 flex justify-center items-center   rounded-md p-2 border border-gray-400 bg-slate-50  shadow-sm cursor-pointer">
          <FcGoogle className="h-full" />
          <span className="ml-1 -mt-[2px] text-slate-500 ">Google</span>
        </div>
        <div className="w-[47.5%] h-9 flex justify-center items-center   rounded-md p-2 border border-gray-400 bg-slate-50  shadow-sm cursor-pointer">
          <BsFacebook className="text-blue-700 h-full" />
          <span className="ml-1 -mt-[2px] text-slate-500">Facebook</span>
        </div>
      </div>
    </div>
  );
};

export default Social;
