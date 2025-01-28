"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import CardWrapper from "../card-wrapper";
import { newVerification } from "@/actions/newVerification";
import { BiCheckCircle } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";

function VerificationForm() {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      hrefLabel="Back to Login"
      buttonLabel=""
      backButtonHref="/login"
      form="forget"
    >
      <div className="flex items-center w-full justify-center">
        <div className="flex w-full items-center h-[24px] text-green-800 bg-green-300 rounded-sm p-4  font-semibold my-1 ">
          <BiCheckCircle className="font-semibold text-sm" />
          <span className="ml-1 -mt-[3px] text-xs">{success}</span>
        </div>
        {!success && (
          <div className="flex w-full items-center h-[24px] text-green-800 bg-green-300 rounded-sm p-4  font-semibold my-1 ">
            <FiAlertTriangle className="font-semibold text-sm" />
            <span className="ml-1 -mt-[3px] text-xs">{error}</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}

export default VerificationForm;
