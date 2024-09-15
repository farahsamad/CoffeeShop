import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faMugHot,
  faShoppingBasket,
  faShoppingCart,
  faUser,
  faStarAndCrescent,
  faStarHalf,
  faStarHalfStroke,
  faBox,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "../../component/Styles/Home.scss";
import Counter from "../../component/Elements/Counter";
import { useOutletContext } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

interface homeProps {
  aboutRef: React.RefObject<HTMLDivElement>;
  barVisibility: boolean;
}
interface animationProps {
  obj: HTMLElement;
  start: number;
  end: number;
  duration: number;
}

function About({ aboutRef, barVisibility }: homeProps) {
  // const barsVisibility = useOutletContext<homeProps>();
  // const barVisibility = barsVisibility.barVisibility;
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.init({
      offset: 40, // global offset value
    });
  }, []);

  return (
    <div
      ref={aboutRef}
      className={`about-page-container  ${barVisibility ? "" : "bar-visible"}`}
    >
      <div className="">
        <div className="first-section" data-aos="fade-up">
          <div className="first-section-image">
            <img
              src={require("../../image/latte.png")}
              // width={200}
              // height={200}
            />
          </div>
          <div className="first-section-paragraph-container">
            <div className="first-section-paragraph">
              Welcome to CoffeeShop, where the aroma of freshly brewed coffee
              greets you. We are passionate about crafting the perfect cup using
              the finest beans from sustainable farms. Our friendly baristas
              ensure every visit is delightful. Whether you’re here to relax,
              catch up with friends, or work, our inviting atmosphere and
              delicious offerings make us the perfect spot. Discover the true
              essence of coffee with us.
            </div>
          </div>
        </div>
      </div>
      <div className="first-sec-about">
        <div className="first-section strawberry-background" data-aos="fade-up">
          <div className="first-section-image">
            <img src={require("../../image/strawberry-smoothie.png")} />
          </div>
          <div className="first-section-paragraph-container">
            <div className="first-section-paragraph">
              “Discover the heart of Tripoli at our cozy coffee shop, where
              every sip tells a story. Savor our rich, aromatic coffee flavors
              and indulge in our refreshing smoothies, crafted with the freshest
              ingredients. Whether you’re in the mood for a classic espresso or
              a vibrant berry smoothie, we have something to delight every
              palate. Join us for a unique and flavorful experience that will
              keep you coming back for more!”
            </div>
          </div>
        </div>
      </div>
      <div className="second-sec-about">
        <div className="second-section" data-aos="fade-up">
          <div className="second-section-paragraph-container">
            <div className="first-element">
              <div className="first-element-icon">
                <FontAwesomeIcon icon={faUser} className="search-icon" />
              </div>
              <div className="first-element-number">
                <Counter initialValue={0} targetValue={200}></Counter>
              </div>
            </div>
            <div className="second-element">
              <div className="second-element-icon">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="search-icon"
                />
              </div>
              <div className="second-element-number">
                <Counter initialValue={0} targetValue={200}></Counter>
              </div>
            </div>
            <div className="third-element">
              <div className="third-element-icon">
                <FontAwesomeIcon icon={faMugHot} className="search-icon" />
              </div>
              <div className="third-element-number">
                <Counter initialValue={0} targetValue={200}></Counter>
              </div>
            </div>
            <div className="fourth-element">
              <div className="fourth-element-icon">
                <FontAwesomeIcon icon={faStar} className="search-icon" />
              </div>
              <div className="fourth-element-number">
                <Counter initialValue={0} targetValue={200}></Counter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
