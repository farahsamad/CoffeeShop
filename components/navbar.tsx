"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import "@/styles/navbar.css";
// import "../../component/Styles/Tailwind.css";
import Link from "next/link";
import { FaShoppingBasket, FaBars, FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { GoSignOut } from "react-icons/go";
import { LogoutButton } from "./auth/logout-button";
import { ProductDetails } from "./cart";
import { useMyContext } from "@/context/context";
import SearchForm from "./search-form";

interface indexProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  barVisibility: boolean;
  setBarVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

function NavBar({ aboutRef, barVisibility, setBarVisibility, sectionsRef }: indexProps) {
  const [showBlock, setShowBlock] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartNumber, setCartNumber] = useState<ProductDetails[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const { update } = useMyContext();

  const user = useCurrentUser();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("AddToCart") || "[]");
    setCartNumber(cartItems);
  }, [update]);

  const barRef = useRef<HTMLInputElement>(null);
  const phoneContainer = useRef<HTMLDivElement>(null);
  // const currentlocation = useLocation().pathname;
  const [currentSection, setCurrentSection] = useState<string>("");
  // if (currentlocation == `/Friend/${name}`) {
  //   var directTo = true;
  // } else {
  //   directTo = false;
  // }

  function barClicked() {
    if (barRef.current) {
      setBarVisibility(() => !barVisibility);
    }
  }
  const scrollToAboutSection = () => {
    setTimeout(() => {
      // console.log("first scroll");
      if (aboutRef.current) {
        // console.log("second scroll");
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
        // console.log("third scroll");
      }
    }, 1000);
  };
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
  const scrollToAboutSectionPhone = () => {
    if (phoneContainer.current)
      if (!barVisibility) {
        phoneContainer.current.style.width = "0vw";
        document.body.style.overflow = "unset";
        setTimeout(() => {
          if (aboutRef.current) {
            if (barRef.current) barRef.current.checked = false;
            setBarVisibility(() => !barVisibility);
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      }

    // setBarVisibility(() => !barVisibility);
  };

  const handleScroll = () => {
    // console.log("window.scrollY: ", window.scrollY);
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
          // console.log("currentSection: ", currentSection);
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

    // return () => {
    //   observer.disconnect();
    // };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const showDropDown = () => {
    setShowBlock((prev) => !prev);
  };
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
                <Link
                  href="/"
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? currentSection !== "fourth-container"
                  //       ? "h-full border-b-4 border-gray-600"
                  //       : "h-full"
                  //     : "h-full"
                  // }
                >
                  <div className="h-[96px] w-full grid place-content-center">HOME</div>
                </Link>
              </li>
              <li className="about h-full">
                <Link
                  href="/#about"
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? currentSection === "fourth-container"
                  //       ? "h-full border-b-4 border-gray-600"
                  //       : "h-full"
                  //     : "h-full"
                  // }
                  // onClick={scrollToAboutSection}
                >
                  <div className="h-[96px] w-full grid place-content-center">ABOUT</div>
                </Link>
              </li>
              <li className="menu h-full">
                <Link
                  // className={({ isActive }) =>
                  //   isActive ? "h-full border-b-4 border-gray-600" : "h-full"
                  // }
                  href={`/menu`}
                >
                  <div className="h-[96px] w-full grid place-content-center">MENU</div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sign-container">
            <div className="second-sign-container not-phone">
              <div id="cart-icon" className="relative mr-[20px] h-full">
                <Link href="/cart">
                  <FaShoppingBasket className="search-icon" />
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
              {/* <div className="sign-div"> */}
              {user ? (
                <>
                  <div
                    className="flex h-[40px] w-[40px] shrink-0 ml-[20px] overflow-hidden rounded-full cursor-pointer"
                    // onClick={() => showDropDown()}
                  >
                    {/* <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    </div> */}

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

              {/* </div> */}
            </div>
            <div className={`second-sign-container phone  `}>
              <label className="hamburger-menu">
                <input type="checkbox" ref={barRef} onClick={() => barClicked()} />
              </label>
              {/* <FaBars className={`bars-icon  ${barVisibility ? "" : "not-display"}`} />
            <FaX className={`bars-icon  ${barVisibility ? "not-display" : ""}`} /> */}
            </div>
          </div>
        </div>
        <div className={`phone-container !h-[100vh]`} id="phoneContainerBar" ref={phoneContainer}>
          <div className="category-phone-container">
            <ul>
              <li className="home">
                <Link
                  href={`/`}
                  onClick={barClick}
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? currentSection !== "fourth-container"
                  //       ? "h-full border-b-4 border-gray-600  grid place-content-center"
                  //       : "h-full grid place-content-center"
                  //     : "h-full grid place-content-center"
                  // }
                >
                  HOME
                </Link>
              </li>
              <li className="about">
                <Link
                  href={"/#about"}
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? currentSection === "fourth-container"
                  //       ? "h-full border-b-4 border-gray-600  grid place-content-center"
                  //       : "h-full grid place-content-center"
                  //     : "h-full grid place-content-center"
                  // }
                  // onClick={scrollToAboutSectionPhone}
                >
                  ABOUT
                </Link>
              </li>
              <li className="menu">
                <Link
                  href="/menu"
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? "h-full border-b-4 border-gray-600  grid place-content-center"
                  //     : "h-full  grid place-content-center"
                  // }
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
            {/* <div className="sign-div">Sign in</div> */}
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
          <SearchForm searchRef={searchRef} />
        </div>
      )}
    </>
  );
}

export default NavBar;
