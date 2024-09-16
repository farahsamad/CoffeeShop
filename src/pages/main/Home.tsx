import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router";
import "../../component/Styles/Home.css";
import About from "./About";
import Footer from "../footer/Index";

interface homeProps {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
}

function Home() {
  const outletContext = useOutletContext<homeProps>();
  const barVisibility = outletContext.barVisibility;
  const aboutRef = outletContext.aboutRef;
  return (
    <div
      className={`home-page-container ${barVisibility ? "" : "bar-visible"}`}
    >
      <div className="intro-container">
        <div className="second-intro-container">
          <div className="intro-image">
            <img src={require("../../image/coffee-banner.png")} alt="" />
          </div>
          <div className="intro-sentence">
            <div className="intro-sent">Experience the essence</div>
            <div className="intro-sent">of real coffee</div>
            <div className="create-account-phrase">Create account</div>
          </div>
        </div>
      </div>
      <div className="animate-right">
        <div
          className="first-section first-section-home berry-background"
          data-aos="fade-up"
        >
          <div className="first-section-image">
            <img
              src={require("../../image/triple-berry-smoothie-feat-min.jpg")}
              // width={200}
              // height={200}
            />
          </div>
          <div className="first-section-paragraph-container">
            <div className="first-section-paragraph">
              {/* Indulge in the refreshing taste of our Mixed Berry Smoothie with
            Yogurt – a perfect blend of juicy berries and creamy yogurt for a
            deliciously healthy treat!  */}
              Experience the ultimate refreshment with our Mixed Berry Smoothie
              with Yogurt. This delightful blend combines the natural sweetness
              of ripe strawberries, blueberries, and raspberries with the creamy
              richness of yogurt.
            </div>
            <div className="first-section-button">
              <button className="order-now">Order now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="first-sec-about">
        <div
          className="first-section first-section-home black-background"
          data-aos="fade-up"
        >
          <div className="first-section-image">
            <img
              src={require("../../image/iced-chocolate-frappe-coffee.png")}
            />
          </div>
          <div className="first-section-paragraph-container">
            <div className="first-section-paragraph">
              Indulge in our Iced Chocolate Frappe Coffee topped with luscious
              white cream – a perfect blend of rich chocolate and smooth coffee,
              finished with a creamy touch for a refreshing and decadent treat!
            </div>
            <div className="first-section-button">
              <button className="order-now">Order now</button>
            </div>
          </div>
        </div>
      </div>
      <About aboutRef={aboutRef} barVisibility={barVisibility}></About>
      <div className="footer-pages-container">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
