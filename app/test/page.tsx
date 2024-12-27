import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-100vh mt-[100px]">
      <nav>
        <Link href="/login" className="bg-pink-700">
          Open modal
        </Link>
      </nav>
    </div>
  );
};

export default page;
