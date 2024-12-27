import { Login } from "@/components/auth/login-form";
import { Signup } from "@/components/auth/signup-form";
import { Modal } from "@/components/ui/modal";

import React from "react";

export default function ModalPage() {
  return (
    <Modal>
      <Signup />
    </Modal>
  );
}
