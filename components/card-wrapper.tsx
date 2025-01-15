import React from "react";
import SignButton from "./sign-button";
import Social from "./social";
import { FiAlertTriangle } from "react-icons/fi";
import { FaX } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

interface CardProps {
  children: React.ReactNode;
  headerLabel: string;
  hrefLabel: string;
  buttonLabel?: string;
  backButtonHref: string;
  error?: string;
  showSocial?: boolean;
  form?: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  hrefLabel,
  buttonLabel,
  backButtonHref,
  error,
  showSocial,
  form,
}: CardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const closeButton = () => {
    pathname === "/login" ? router.back() : (router.back(), router.back());
  };

  return (
    <div className="min-w-[200px] md:w-[500px] lg:w-[600px] grid place-content-center text-sm md:text-base">
      <div className="h-full min-w-44 w-60 lg:w-[300px]">
        {form ? (
          <div id="header-label" className="h-[24px] w-full text-center text-slate-500">
            {headerLabel}
          </div>
        ) : (
          <div id="header-label" className="h-[24px] ">
            {headerLabel}
          </div>
        )}

        {error && (
          <div className="flex w-full items-center h-[24px] text-red-800 bg-red-300 rounded-sm p-4 my-1 font-semibold">
            <FiAlertTriangle className="font-semibold text-sm" />
            <span className="ml-1 -mt-[3px] text-xs">{error}</span>
          </div>
        )}

        <div id="form-content" className="w-full min-h-48 h-56">
          {children}
        </div>
        {showSocial && form !== "forget" && (
          <div id="social-content" className="h-28">
            <Social />
          </div>
        )}
        <SignButton
          backButtonHref={backButtonHref}
          hrefLabel={hrefLabel}
          buttonLabel={buttonLabel}
          form={form}
        />
      </div>
      <div
        className="absolute top-2 right-3 md:!text-sm text-xs cursor-pointer"
        onClick={() => closeButton()}
      >
        <FaX />
      </div>
    </div>
  );
};

export default CardWrapper;
