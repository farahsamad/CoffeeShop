import { Signup } from "@/components/auth/signup-form";
import React from "react";

const SignupPage = () => {
  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full grid place-content-center">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
