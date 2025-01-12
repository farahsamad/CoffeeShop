"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface ContextType {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
  update: number;
  updatePerformed: () => void;
}

const MyContext = createContext<ContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ContextType;
}) => {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
