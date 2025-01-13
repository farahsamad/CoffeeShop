import { ForgotPassword } from "@/components/auth/forgot-password";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full grid place-content-center">
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
