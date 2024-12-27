"use client";

import Link from "next/link";
import React, { useCallback, useRef } from "react";
import BlurredImage from "./blurred-image";
import Footer from "./footer";
import { FaArrowCircleUp } from "react-icons/fa";
import About from "./about";
import "@/styles/home.css";
import { useMyContext } from "@/context/context";

interface homeProps {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  pageShowHeader: boolean;
  sectionsRef: React.RefObject<(HTMLDivElement | null)[]>;
}

function Home() {
  const { barVisibility, aboutRef, pageShowHeader, sectionsRef } = useMyContext();
  // const outletContext = useOutletContext<homeProps>();
  // const barVisibility = outletContext.barVisibility;
  // const pageShowHeader = outletContext.pageShowHeader;
  // const aboutRef = outletContext.aboutRef;
  // const sectionsRef = outletContext.sectionsRef;
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

  var cranberryState = {
    product_id: 48,
    product_name: "Cranberry Smoothie",
    product_image: "cranberry-smoothie.png",
    coffeeType_name: "Smoothie",
  };
  var frappeState = {
    product_id: 13,
    product_name: "Iced Chocolate Frappe",
    product_image: "iced-chocolate-frappe.png",
    coffeeType_name: "Cold Coffees",
  };

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
                {/* <img src={require("../../component/image/coffee-banner.png")} alt="" /> */}
                <BlurredImage
                  //   src={require("../../component/image/coffee-banner.png")}
                  src="/image/coffee-banner.png"
                  //   blurredSrc={require("../../component/image/blurred-coffee-banner.png")}
                  blurredSrc="/image/blurred-coffee-banner.png"
                  imageAlt="coffee banner"
                ></BlurredImage>
              </div>
              <div className="intro-sentence">
                <div className="intro-sent">Experience the essence</div>
                <div className="intro-sent">of real coffee</div>
                <Link href="/signup" className="create-account-phrase">
                  Create account
                </Link>
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
                {/* <img
                src={require("../../component/image/triple-berry-smoothie-feat-min.png")}
                // width={200}
                // height={200}
              /> */}
                <BlurredImage
                  src={"/image/triple-berry-smoothie-feat-min.png"}
                  //   src={require("../../component/image/triple-berry-smoothie-feat-min.png")}
                  blurredSrc={"/image/blurred-triple-berry-smoothie-feat-min.png"}
                  //   blurredSrc={require("../../component/image/blurred-triple-berry-smoothie-feat-min.png")}
                  imageAlt="berry smoothie"
                ></BlurredImage>
              </div>
              <div className="first-section-paragraph-container">
                <div className="first-section-paragraph">
                  {/* Indulge in the refreshing taste of our Mixed Berry Smoothie with
            Yogurt – a perfect blend of juicy berries and creamy yogurt for a
            deliciously healthy treat!  */}
                  Experience the ultimate refreshment with our Mixed Berry Smoothie with Yogurt.
                  This delightful blend combines the natural sweetness of ripe strawberries,
                  blueberries, and raspberries with the creamy richness of yogurt.
                </div>
                <div className="first-section-button">
                  <Link
                    href={{
                      pathname: "menu/48/Cranberry Smoothie",
                      query: {
                        product_id: 48,
                        product_name: "Cranberry Smoothie",
                        product_image: "cranberry-smoothie.png",
                        coffeeType_name: "Smoothie",
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
                {/* <img
                src={require("../../component/image/iced-chocolate-frappe-coffee.png")}
              /> */}
                <BlurredImage
                  src={"/image/iced-chocolate-frappe-coffee.png"}
                  //   src={require("../../component/image/iced-chocolate-frappe-coffee.png")}
                  blurredSrc={"/image/blurred-iced-chocolate-frappe-coffee.png"}
                  //   blurredSrc={require("../../component/image/blurred-iced-chocolate-frappe-coffee.png")}
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
                      pathname: "menu/13/Iced Chocolate Frappe",
                      query: {
                        product_id: 13,
                        product_name: "Iced Chocolate Frappe",
                        product_image: "iced-chocolate-frappe.png",
                        coffeeType_name: "Cold Coffees",
                      },
                    }}
                    // state={frappeState}
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
            <FaArrowCircleUp
              id="arrow-up-button"
              className="fixed bottom-2 right-3 bg-black rounded-full
               text-white animate-bounce w-7 h-7 cursor-pointer z-50"
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
