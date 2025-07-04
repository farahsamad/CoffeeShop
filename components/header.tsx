"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "./navbar";
import FixedFooter from "./fixed-footer";
import { MyContextProvider } from "@/context/context";

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  const [update, setUpdate] = useState<number>(0);
  const [barVisibility, setBarVisibility] = useState<boolean>(true);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [pageShowHeader, setPageShowHeader] = useState(true);
  const [pageLastScrollY, setPageLastScrollY] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updatePerformed = useCallback(() => {
    setUpdate((prev) => prev + 1);
  }, []);

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
      <MyContextProvider
        value={{ barVisibility, aboutRef, pageShowHeader, sectionsRef, update, updatePerformed }}
      >
        <NavBar
          barVisibility={barVisibility}
          setBarVisibility={setBarVisibility}
          sectionsRef={sectionsRef}
        />
        {children}
        <FixedFooter />
      </MyContextProvider>
    </div>
  );
}

export default Header;
