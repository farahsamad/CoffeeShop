import { logout } from "@/actions/logout";
import { useMyContext } from "@/context/context";
import { useCartUpdater } from "@/hooks/useCartUpdater";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { handleUpdateCartDb } from "@/data/handle-cart";

export const LogoutButton = () => {
  const router = useRouter();
  const { updatePerformed } = useMyContext();
  const { handleUpdateCartDb } = useCartUpdater();
  const handleSignout = async () => {
    await handleUpdateCartDb().then(() => {
      updatePerformed();
      setTimeout(() => {
        signOut().then(() => {
          router.push("/logout");
        });
      }, 500);
    });
  };

  // const handleSignout = async () => {
  //   const updatedLikes = await handleUpdateCartDb();
  // };

  return (
    <button
      onClick={async () => {
        await handleSignout();
      }}
      className="cursor-pointer flex w-full h-full justify-center items-center"
    >
      Sign out
    </button>
  );
};
