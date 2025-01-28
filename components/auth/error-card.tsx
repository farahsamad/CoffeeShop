import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Link from "next/link";

const ErrorCard = () => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <div className="min-w-32 w-80 md:!w-80 h-44  p-6 md:py-6 md:px-0 shadow-md flex flex-col items-center justify-evenly">
        <div>Oops something went wrong!</div>
        <FiAlertTriangle className="text-xl text-red-800" />
        <Link href="/login" className="cursor-pointer">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ErrorCard;
