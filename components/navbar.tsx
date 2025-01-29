"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/styles/navbar.css";
import Link from "next/link";
import { FaShoppingBasket, FaSearch } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProductDetails } from "./cart";
import { useMyContext } from "@/context/context";
import SearchForm from "./search-form";
import { usePathname } from "next/navigation";

interface indexProps {
  barVisibility: boolean;
  setBarVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

function NavBar({ barVisibility, setBarVisibility, sectionsRef }: indexProps) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartNumber, setCartNumber] = useState<ProductDetails[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const location = usePathname();
  const { update } = useMyContext();
  const barRef = useRef<HTMLInputElement>(null);
  const phoneContainer = useRef<HTMLDivElement>(null);

  const user = useCurrentUser();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("AddToCart") || "[]");
    setCartNumber(cartItems);
  }, [update]);

  function barClicked() {
    if (barRef.current) {
      setBarVisibility(() => !barVisibility);
    }
  }
  // const scrollToAboutSection = () => {
  //   setTimeout(() => {
  //     if (aboutRef.current) {
  //       aboutRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, 1000);
  // };
  const barClick = () => {
    setBarVisibility(() => !barVisibility);
    if (barRef.current) barRef.current.checked = false;
  };
  useEffect(() => {
    if (phoneContainer.current)
      if (barVisibility) {
        phoneContainer.current.style.width = "0vw";
        document.body.style.overflow = "unset";
        document.body.style.maxHeight = "100%";
      } else {
        phoneContainer.current.style.width = "80vw";
        document.body.style.overflow = "hidden";
        document.body.style.maxHeight = "100vh";
      }
  }, [barVisibility]);
  // const scrollToAboutSectionPhone = () => {
  //   if (phoneContainer.current)
  //     if (!barVisibility) {
  //       phoneContainer.current.style.width = "0vw";
  //       document.body.style.overflow = "unset";
  //       setTimeout(() => {
  //         if (aboutRef.current) {
  //           if (barRef.current) barRef.current.checked = false;
  //           setBarVisibility(() => !barVisibility);
  //           aboutRef.current.scrollIntoView({ behavior: "smooth" });
  //         }
  //       }, 50);
  //     }

  //   // setBarVisibility(() => !barVisibility);
  // };

  const handleScroll = () => {
    if (window.scrollY < 300) {
      setShowHeader(true);
    } else {
      if (window.scrollY < lastScrollY) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.5,
    });

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // const showDropDown = () => {
  //   setShowBlock((prev) => !prev);
  // };
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchVisible) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isSearchVisible]);

  return (
    <>
      <div
        className={`nav-container bg-white  w-full fixed ease-in-out shadow-md !z-[100] ${
          showHeader ? "translate-y-0 duration-100" : "-translate-y-[1000px] duration-500"
        } `}
      >
        <div className="navbar-container">
          <div className="logo-container h-full w-full flex items-start">
            <Link href="/" className="w-full h-[96px] flex items-center">
              CoffeeShop
            </Link>
          </div>
          <div className="category-container h-full">
            <ul className="h-full">
              <li className="home h-full">
                <Link href="/" className={`${location === "/" ? "text-slate-400" : ""}`}>
                  <div className="h-[96px] w-full grid place-content-center">HOME</div>
                </Link>
              </li>
              <li className="about h-full">
                <Link
                  href="/#about"
                  className={`${location === "/#about" ? "text-slate-400" : ""}`}
                >
                  <div className="h-[96px] w-full grid place-content-center">ABOUT</div>
                </Link>
              </li>
              <li className="menu h-full">
                <Link href={`/menu`} className={`${location === "/menu" ? "text-slate-400" : ""}`}>
                  <div className="h-[96px] w-full grid place-content-center">MENU</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sign-container">
            <div className="second-sign-container not-phone">
              <div id="cart-icon" className="relative mr-[20px] h-full">
                <Link href="/cart">
                  <FaShoppingBasket
                    className={`search-icon ${location === "/cart" ? "text-slate-400" : ""}`}
                  />
                </Link>
                <div
                  id="cart-products-number"
                  className="absolute top-[-9px] right-[-9px] text-xs !text-[9px] rounded-full px-[5px] py-0 text-white bg-[#7e7d7d]"
                >
                  {cartNumber.length > 0 ? cartNumber.length : 0}
                </div>
              </div>
              <div className="search-div">
                <FaSearch
                  className="search-icon"
                  onClick={() => setIsSearchVisible((prev) => !prev)}
                />
              </div>
              {user ? (
                <>
                  <div
                    className="flex h-[40px] w-[40px] shrink-0 ml-[20px] overflow-hidden rounded-full cursor-pointer"
                    // onClick={() => showDropDown()}
                  >
                    <div className="h-full w-full">
                      <Link href={"/profile"}>
                        <img
                          src={user?.image || "/image/default-user.png"}
                          alt="user image"
                          className="aspect-square h-full w-full cursor-pointer"
                        />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link className="sign-div" href="/login">
                  Sign in
                </Link>
              )}
            </div>
            <div className={`second-sign-container phone  `}>
              <label className="hamburger-menu">
                <input type="checkbox" ref={barRef} onClick={() => barClicked()} />
              </label>
            </div>
          </div>
        </div>
        <div className={`phone-container !h-[100vh]`} id="phoneContainerBar" ref={phoneContainer}>
          <div className="category-phone-container">
            <ul>
              <li className="home">
                <Link
                  href={`/`}
                  className={`${location === "/" ? "text-slate-400" : ""}`}
                  onClick={barClick}
                >
                  HOME
                </Link>
              </li>
              <li className="about">
                <Link
                  href="/#about"
                  className={`${location === "/#about" ? "text-slate-400" : ""}`}
                  onClick={barClick}
                >
                  ABOUT
                </Link>
              </li>
              <li className="menu">
                <Link
                  href="/menu"
                  className={`${location === "/menu" ? "text-slate-400" : ""}`}
                  onClick={barClick}
                >
                  MENU
                </Link>
              </li>
            </ul>
          </div>
          <hr aria-hidden="true" className="hr-class"></hr>
          <div className="sign-phone-container">
            <div className="search-div">
              <FaSearch
                className="search-icon"
                onClick={() => setIsSearchVisible((prev) => !prev)}
              />
            </div>
            {!user && (
              <Link className="sign-div" href="/login">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      {isSearchVisible && (
        <div id="search-section" className="absolute h-full w-full">
          <SearchForm
            searchRef={searchRef}
            setIsSearchVisible={setIsSearchVisible}
            barClick={barClick}
          />
        </div>
      )}
    </>
  );
}

export default NavBar;
