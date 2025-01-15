import { ResetPassword } from "@/components/auth/reset-password";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full grid place-content-center">
        <ResetPassword />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
