import { Login } from "@/components/auth/login-form";
import React from "react";

export default function LoginPage() {
  return (
    <div className=" w-full h-screen ">
      <div className=" w-full h-full grid place-content-center">
        <Login />
      </div>
    </div>
  );
}
