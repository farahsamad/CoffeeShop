import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  const signout = () => {
    signOut();
    //   logout()
  };
  return (
    <button
      onClick={() => signout()}
      className="cursor-pointer flex w-full h-full justify-center items-center"
    >
      Sign out
    </button>
  );
};
