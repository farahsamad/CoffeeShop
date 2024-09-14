import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router";
import "../../component/Styles/Home.css";
import About from "./About";

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
          {/* <div className="intro-image">
            <img src={require("../../image/coffee-banner.png")} alt="" />
          </div> */}
          <div className="intro-sentence">
            <div className="intro-sent">Experience the essence</div>
            <div className="intro-sent">of real coffee</div>
            <div className="create-account-phrase">Create account</div>
          </div>
        </div>
      </div>
      <About aboutRef={aboutRef} barVisibility={barVisibility}></About>
    </div>
  );
}

export default Home;
