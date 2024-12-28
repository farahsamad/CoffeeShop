import Link from "next/link";
import React from "react";
import "@/styles/navbar.css";

const page = () => {
  return (
    <div className="logo-container h-screen w-full flex items-center justify-center">
      <Link href="/">CoffeeShop</Link>
    </div>
  );
};

export default page;
