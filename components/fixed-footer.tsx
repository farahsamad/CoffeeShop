import React, { useEffect, useState } from "react";
import "@/styles/navbar.css";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";
import { ProductDetails } from "./cart";
import { useMyContext } from "@/context/context";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserCircle2 } from "lucide-react";
import { GoHomeFill } from "react-icons/go";
import { usePathname } from "next/navigation";

function FixedFooter() {
  const [cartNumber, setCartNumber] = useState<ProductDetails[]>([]);
  // const [showBlock, setShowBlock] = useState<boolean>(false);
  const location = usePathname();

  console.log("location: ", location);
  const user = useCurrentUser();
  // const cartNumber: ProductDetails[] = JSON.parse(localStorage.getItem("AddToCart")!) || [];
  const { update } = useMyContext();

  // const showDropDown = () => {
  //   setShowBlock((prev) => !prev);
  // };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("AddToCart") || "[]");
    setCartNumber(cartItems);
  }, [update]);

  return (
    <div
      id="fixed-footer"
      className="bg-[#C0C0C0] fixed bottom-0 w-full h-[64px] text-white cursor-pointer transform z-[100] shadow-2xl shadow-emerald-200"
    >
      <div id="cart-icon-container" className="h-full w-full flex items-center pr-4">
        <div id="home-icon" className="relative inline-block h-full min-w-fit w-1/3">
          <div className="flex justify-center w-full h-full">
            <Link href="/" className={`${location === "/" ? "text-slate-400" : "text-white"}`}>
              <div className="h-full relative flex items-center">
                <GoHomeFill className="cart-icon  h-[30px] w-[30px]" />
              </div>
            </Link>
          </div>
        </div>
        <div id="user-icon" className="relative inline-block h-full min-w-fit w-1/3">
          {user ? (
            <>
              <div
                className="flex h-full w-full shrink-0 overflow-hidden"
                // onClick={() => showDropDown()}
              >
                {/* <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    </div> */}
                <div className="h-full w-full grid place-content-center">
                  <Link
                    href={"/profile"}
                    className={`${location === "/profile" ? "text-slate-400" : "text-white"}`}
                  >
                    <img
                      src={user?.image || "/image/default-user.png"}
                      alt="user image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/image/default-user.png";
                      }}
                      className="aspect-square h-[40px] w-[40px] rounded-full cursor-pointer"
                    />
                  </Link>
                </div>

                {/* {showBlock && (
                  <div className="absolute top-[-75px] right-px bg-[#7e7d7d] !z-[200] w-24 h-16 grid place-content-center rounded-md shadow-sm text-white">
                    <LogoutButton />
                  </div>
                )} */}
              </div>
            </>
          ) : (
            <div className="h-full w-full grid place-content-center">
              <Link
                href="/login"
                className={`${location === "/login" ? "text-slate-400" : "text-white"}`}
              >
                <UserCircle2 className=" h-[30px] w-[30px]" />
              </Link>
            </div>
          )}
        </div>
        <div id="cart-icon" className="relative inline-block h-full min-w-fit w-1/3">
          <div className="flex justify-center w-full h-full">
            <Link
              href="/cart"
              className={`${location === "/cart" ? "text-slate-400" : "text-white"}`}
            >
              <div className="h-full relative flex items-center">
                <FaShoppingBasket className="cart-icon  h-[30px] w-[30px]" />
                <div
                  id="cart-products-number"
                  className="absolute top-[11px] right-[-7px] w-[15px] text-xs !text-[12px] rounded-full text-white shadow-lg shadow-black  grid place-content-center"
                >
                  <p>{cartNumber.length > 0 ? cartNumber.length : 0}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixedFooter;
