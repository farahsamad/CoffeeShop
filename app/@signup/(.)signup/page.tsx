"use client";

import { Signup } from "@/components/auth/signup-form";
import { Modal } from "@/components/ui/modal";
import { usePathname } from "next/navigation";

import React from "react";

export default function ModalPage() {
  const pathname = usePathname();
  if (pathname === "/signup") {
    return (
      <Modal>
        <Signup />
      </Modal>
    );
  }
}
