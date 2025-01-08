import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";
import { handleUpdateCartDb } from "@/data/handle-cart";

export const LogoutButton = async () => {
  const signout = () => {
    handleUpdateCartDb(), signOut();
    //   logout()
  };

  return (
    <button
      onClick={() => {
        signout();
      }}
      className="cursor-pointer flex w-full h-full justify-center items-center"
    >
      Sign out
    </button>
  );
};
