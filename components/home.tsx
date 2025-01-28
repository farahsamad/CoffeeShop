"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import BlurredImage from "./ui/blurred-image";
import Footer from "./footer";
import { IoIosArrowUp } from "react-icons/io";
import About from "./about";
import "@/styles/home.css";
import { useMyContext } from "@/context/context";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function Home() {
  const { barVisibility, aboutRef, sectionsRef } = useMyContext();
  const user = useCurrentUser();
  const arrowDown = useRef<HTMLDivElement>(null);
  const firstDiv = useRef<HTMLDivElement>(null);
  const observe = useRef<IntersectionObserver | null>(null);

  const lastDiv2 = useCallback((msg: HTMLDivElement | null) => {
    if (observe.current) observe.current.disconnect();
    observe.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === false) {
          if (arrowDown.current) arrowDown.current.style.display = "block";
        } else {
          if (arrowDown.current) arrowDown.current.style.display = "none";
        }
      },
      {
        root: firstDiv.current,
        rootMargin: "-300px 0px 0px 0px",
      }
    );
    if (msg) {
      observe.current.observe(msg);
    }
  }, []);

  const cranberryState = {
    product_id: "cm5lovkfw0014u0m8qoig3bg4",
    product_name: "Cranberry Smoothie",
    product_image: "cranberry-smoothie.png",
    coffeeType_name: "Smoothie",
    product_price: 5,
  };
  const frappeState = {
    product_id: "cm5lokx1d000bu0m82ngkkyam",
    product_name: "Iced Chocolate Frappe",
    product_image: "iced-chocolate-frappe.png",
    coffeeType_name: "Cold Coffees",
    product_price: 5,
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop < lastScrollTop) {
        // Scroll up
        document.getElementById("arrow-up-button")?.classList.remove("bottom-2");
        document.getElementById("arrow-up-button")?.classList.add("bottom-[0.75rem]");
      } else {
        // Scroll down
        document.getElementById("arrow-up-button")?.classList.remove("bottom-[0.75rem]");
        document.getElementById("arrow-up-button")?.classList.add("bottom-2");
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={firstDiv} className={`${barVisibility ? "" : "bar-visible"}`}>
      <div className={`main-home-page-container  mt-[100px]`}>
        <div className="absolute w-1/6 h-[100vh] invisible" ref={lastDiv2}></div>
        <div className={`home-page-container`}>
          <div
            className="intro-container"
            ref={(el) => {
              sectionsRef.current[0] = el;
            }}
            id="intro-container"
          >
            <div className="second-intro-container">
              <div className="intro-image">
                <BlurredImage
                  src="/image/coffee-banner.png"
                  blurredSrc="/image/blurred-coffee-banner.png"
                  imageAlt="coffee banner"
                  priority={true}
                ></BlurredImage>
              </div>
              <div className="intro-sentence">
                <div className="intro-sent">Experience the essence</div>
                <div className="intro-sent">of real coffee</div>
                {user ? (
                  <Link href="/signup" className="create-account-phrase">
                    Create account
                  </Link>
                ) : (
                  <Link href="/menu" className="create-account-phrase capitalize">
                    order now
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div
            className="animate-right"
            ref={(el) => {
              sectionsRef.current[1] = el;
            }}
            id="second-container"
          >
            <div className="first-section first-section-home berry-background" data-aos="fade-up">
              <div className="first-section-image">
                <BlurredImage
                  src={"/image/triple-berry-smoothie-feat-min.png"}
                  blurredSrc={"/image/blurred-triple-berry-smoothie-feat-min.png"}
                  imageAlt="berry smoothie"
                ></BlurredImage>
              </div>
              <div className="first-section-paragraph-container">
                <div className="first-section-paragraph">
                  Experience the ultimate refreshment with our Mixed Berry Smoothie with Yogurt.
                  This delightful blend combines the natural sweetness of ripe strawberries,
                  blueberries, and raspberries with the creamy richness of yogurt.
                </div>
                <div className="first-section-button">
                  <Link
                    href={{
                      pathname: `menu/${cranberryState.product_id}/${cranberryState.product_name}`,
                      query: {
                        product_id: cranberryState.product_id,
                        product_name: cranberryState.product_name,
                        product_image: cranberryState.product_image,
                        product_price: cranberryState.product_price,
                        coffeeType_name: cranberryState.coffeeType_name,
                      },
                    }}
                    // state={cranberryState}

                    className="order-now"
                  >
                    Order now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="first-sec-about"
            ref={(el) => {
              sectionsRef.current[2] = el;
            }}
            id="third-container"
          >
            <div className="first-section first-section-home black-background" data-aos="fade-up">
              <div className="first-section-image">
                <BlurredImage
                  src={"/image/iced-chocolate-frappe-coffee.png"}
                  blurredSrc={"/image/blurred-iced-chocolate-frappe-coffee.png"}
                  imageAlt="iced chocolate frappe coffee"
                ></BlurredImage>
              </div>
              <div className="first-section-paragraph-container">
                <div className="first-section-paragraph">
                  Indulge in our Iced Chocolate Frappe Coffee topped with luscious white cream – a
                  perfect blend of rich chocolate and smooth coffee, finished with a creamy touch
                  for a refreshing and decadent treat!
                </div>
                <div className="first-section-button">
                  <Link
                    href={{
                      pathname: `menu/${frappeState.product_id}/${frappeState.product_name}`,
                      query: {
                        product_id: frappeState.product_id,
                        product_name: frappeState.product_name,
                        product_image: frappeState.product_image,
                        product_price: frappeState.product_price,
                        coffeeType_name: frappeState.coffeeType_name,
                      },
                    }}
                    className="order-now"
                  >
                    Order now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <About
            aboutRef={aboutRef}
            sectionRef={(el: HTMLDivElement | null) => (sectionsRef.current[3] = el)}
            barVisibility={barVisibility}
          ></About>
          <div
            className="scroll-down-button-container"
            ref={arrowDown}
            onClick={() => {
              if (firstDiv.current) firstDiv.current.scrollIntoView({ behavior: "smooth" });
              if (arrowDown.current) arrowDown.current.style.display = "none";
            }}
            style={{ display: "none" }}
          >
            <IoIosArrowUp
              id="arrow-up-button"
              className="fixed right-3 bg-white rounded-full text-slate-500 animate-bounce w-7 h-7 cursor-pointer z-50 border !border-slate-500"
            />
          </div>
          <div className="footer-pages-container  mb-[64px] -mx-[10px]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
