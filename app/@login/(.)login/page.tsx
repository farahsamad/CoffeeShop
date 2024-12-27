import { Login } from "@/components/auth/login-form";
import { Modal } from "@/components/ui/modal";
import React from "react";

export default function ModalPage() {
  return (
    <Modal>
      <Login />
    </Modal>
  );
}
