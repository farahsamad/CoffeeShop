import Link from "next/link";
import React from "react";

interface SignButton {
  backButtonHref: string;
  hrefLabel: string;
  buttonLabel?: string;
  form?: string;
}

const SignButton = ({ backButtonHref, hrefLabel, buttonLabel, form }: SignButton) => {
  return (
    <>
      {form ? (
        <div className="font-normal w-full h-8 mt-3 text-center">
          <Link href={backButtonHref} className="text-slate-500 w-full text-center">
            {hrefLabel}
          </Link>
        </div>
      ) : (
        <div className="font-normal w-full h-8 mt-3">
          <p className=" inline">{buttonLabel}</p>
          <Link href={backButtonHref} className="text-slate-500">
            {hrefLabel}
          </Link>
        </div>
      )}
    </>
  );
};

export default SignButton;
