"use client";

import React, { useEffect, useRef, useState } from "react";
import NavBar from "./navbar";
import FixedFooter from "./fixed-footer";
import { MyContextProvider } from "@/context/context";

interface ContextType {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  const [barVisibility, setBarVisibility] = useState<boolean>(true);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [pageShowHeader, setPageShowHeader] = useState(true);
  const [pageLastScrollY, setPageLastScrollY] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = () => {
    if (window.scrollY < pageLastScrollY) {
      setPageShowHeader(true);
    } else {
      setPageShowHeader(false);
    }
    setPageLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageLastScrollY]);

  return (
    <div className="home-container">
      <NavBar
        aboutRef={aboutRef}
        barVisibility={barVisibility}
        setBarVisibility={setBarVisibility}
        sectionsRef={sectionsRef}
      />
      <MyContextProvider value={{ barVisibility, aboutRef, pageShowHeader, sectionsRef }}>
        {children}
      </MyContextProvider>
      <FixedFooter />
    </div>
  );
}

export default Header;
