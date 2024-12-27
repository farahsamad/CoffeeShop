import { Login } from "../auth/login-form";

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="modal-container"
      className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div className="min-w-[200px] md:w-[500px] lg:w-[600px] fixed left-[50%] top-[50%] z-50 grid max-w-[600px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
        {children}
      </div>
    </div>
  );
}
