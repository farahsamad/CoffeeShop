import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaMugHot, FaShoppingCart, FaUser, FaStar } from "react-icons/fa";
import BlurredImage from "./blurred-image";
import Counter from "./counter";

interface homeProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  barVisibility: boolean;
  sectionRef: (el: HTMLDivElement | null) => void;
}

function About({ aboutRef, barVisibility, sectionRef }: homeProps) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.init({
      offset: 40, // global offset value
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      id="fourth-container"
      className={`about-page-container  ${barVisibility ? "" : "bar-visible"}`}
    >
      <div ref={aboutRef}>
        <div className="animate-right">
          <div className="first-section" data-aos="fade-up">
            <div className="first-section-image">
              {/* <img
              src={require("../../component/image/latte.png")}
              // width={200}
              // height={200}
            /> */}
              <BlurredImage
                src={"/image/latte.png"}
                // src={require("../../component/image/latte.png")}
                blurredSrc={"/image/blurred-latte.png"}
                // blurredSrc={require("../../component/image/blurred-latte.png")}
                imageAlt="latte"
              ></BlurredImage>
            </div>
            <div className="first-section-paragraph-container">
              <div className="first-section-paragraph">
                Welcome to CoffeeShop, where the aroma of freshly brewed coffee greets you. We are
                passionate about crafting the perfect cup using the finest beans from sustainable
                farms. Our friendly baristas ensure every visit is delightful. Whether you’re here
                to relax, catch up with friends, or work, our inviting atmosphere and delicious
                offerings make us the perfect spot. Discover the true essence of coffee with us.
              </div>
            </div>
          </div>
        </div>
        <div className="first-sec-about">
          <div className="first-section strawberry-background" data-aos="fade-up">
            <div className="first-section-image">
              {/* <img src={require("../../component/image/strawberry-smoothie.png")} /> */}
              <BlurredImage
                src={"../../component/image/strawberry-smoothie.png"}
                // src={require("../../component/image/strawberry-smoothie.png")}
                blurredSrc={"/image/blurred-strawberry-smoothie.png"}
                // blurredSrc={require("../../component/image/blurred-strawberry-smoothie.png")}
                imageAlt="strawberry smoothie"
              ></BlurredImage>
            </div>
            <div className="first-section-paragraph-container">
              <div className="first-section-paragraph">
                “Discover the heart of Tripoli at our cozy coffee shop, where every sip tells a
                story. Savor our rich, aromatic coffee flavors and indulge in our refreshing
                smoothies, crafted with the freshest ingredients. Whether you’re in the mood for a
                classic espresso or a vibrant berry smoothie, we have something to delight every
                palate. Join us for a unique and flavorful experience that will keep you coming back
                for more!”
              </div>
            </div>
          </div>
        </div>
        <div className="animate-right">
          <div className="second-section" data-aos="fade-up">
            <div className="second-section-paragraph-container">
              <div className="first-element min-h-fit">
                <div className="first-element-icon min-h-fit">
                  <FaUser className="search-icon" />
                </div>
                <div className="first-element-number">
                  <Counter initialValue={0} targetValue={200}></Counter>
                </div>
              </div>
              <div className="second-element min-h-fit">
                <div className="second-element-icon min-h-fit">
                  <FaShoppingCart className="search-icon" />
                </div>
                <div className="second-element-number">
                  <Counter initialValue={0} targetValue={200}></Counter>
                </div>
              </div>
              <div className="third-element min-h-fit">
                <div className="third-element-icon min-h-fit">
                  <FaMugHot className="search-icon" />
                </div>
                <div className="third-element-number">
                  <Counter initialValue={0} targetValue={200}></Counter>
                </div>
              </div>
              <div className="fourth-element min-h-fit">
                <div className="fourth-element-icon min-h-fit">
                  <FaStar className="search-icon" />
                </div>
                <div className="fourth-element-number">
                  <Counter initialValue={0} targetValue={200}></Counter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
