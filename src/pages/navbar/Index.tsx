import React, { useEffect, useRef, useState } from "react";
import "../../component/Styles/Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

interface indexProps {
  aboutRef: React.RefObject<HTMLDivElement>;
  barVisibility: boolean;
  setBarVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

function Index({ aboutRef, barVisibility, setBarVisibility }: indexProps) {
  const barRef = useRef<HTMLInputElement>(null);
  const phoneContainer = useRef<HTMLDivElement>(null);
  function barClicked() {
    if (barRef.current) setBarVisibility(() => !barVisibility);
  }
  const scrollToAboutSection = () => {
    if (aboutRef.current)
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
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
      } else {
        phoneContainer.current.style.width = "70vw";
        document.body.style.overflow = "hidden";
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
  return (
    <div className="nav-container">
      <div className="navbar-container">
        <div className="logo-container">
          <NavLink to={`/`}>CoffeeShop</NavLink>
        </div>
        <div className="category-container">
          <ul>
            <li className="home">
              <NavLink to={`/`}>HOME</NavLink>
            </li>
            <li className="about">
              <NavLink to={`/`} onClick={scrollToAboutSection}>
                ABOUT
              </NavLink>
            </li>
            <li className="menu">
              <NavLink to={`/menu`}>MENU</NavLink>
            </li>
          </ul>
        </div>
        <div className="sign-container">
          <div className="second-sign-container not-phone">
            <div className="search-div">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <div className="sign-div">Sign in</div>
          </div>
          <div className={`second-sign-container phone  `}>
            <label className="hamburger-menu">
              <input
                type="checkbox"
                ref={barRef}
                onClick={() => barClicked()}
              />
            </label>
            {/* <FontAwesomeIcon
              icon={faBars}
              className={`bars-icon  ${barVisibility ? "" : "not-display"}`}
            />
            <FontAwesomeIcon
              icon={faX}
              className={`bars-icon  ${barVisibility ? "not-display" : ""}`}
            /> */}
          </div>
        </div>
      </div>
      <div
        className={`phone-container`}
        id="phoneContainerBar"
        ref={phoneContainer}
      >
        <div className="category-phone-container">
          <ul>
            <li className="home">
              <NavLink to={`/`} onClick={barClick}>
                HOME
              </NavLink>
            </li>
            <li className="about">
              <NavLink to={`/`} onClick={scrollToAboutSectionPhone}>
                ABOUT
              </NavLink>
            </li>
            <li className="menu">
              <NavLink to={`/menu`} onClick={barClick}>
                MENU
              </NavLink>
            </li>
          </ul>
        </div>
        <hr aria-hidden="true" className="hr-class"></hr>
        <div className="sign-phone-container">
          <div className="search-div">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <div className="sign-div">Sign in</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
