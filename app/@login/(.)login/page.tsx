"use client";

import { Login } from "@/components/auth/login-form";
import { Modal } from "@/components/ui/modal";
import { usePathname } from "next/navigation";
import React from "react";

export default function ModalPage() {
  const pathname = usePathname();
  if (pathname === "/login") {
    return (
      <Modal>
        <Login />
      </Modal>
    );
  }
}
