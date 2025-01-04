"use client";

import { useMyContext } from "@/context/context";
import React, { useRef } from "react";

interface homeProps {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

function Card() {
  const firstDiv = useRef<HTMLDivElement>(null);
  const { barVisibility, aboutRef, pageShowHeader, sectionsRef } = useMyContext();
  //   const outletContext = useOutletContext<homeProps>();
  //   const barVisibility = outletContext.barVisibility;
  return (
    <div ref={firstDiv}>
      <div className={`main-home-page-container mt-[100px] ${barVisibility ? "" : "bar-visible"}`}>
        <div id="card-payment-container"></div>
      </div>
    </div>
  );
}

export default Card;
