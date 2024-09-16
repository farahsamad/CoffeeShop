import React from "react";
import { useOutletContext } from "react-router";
import "../../component/Styles/Menu.css";
import Footer from "../footer/Index";

interface homeProps {
  barVisibility: boolean;
}

function Menu() {
  const barsVisibility = useOutletContext<homeProps>();
  const barVisibility = barsVisibility.barVisibility;
  return (
    <div
      className={`main-home-page-container ${
        barVisibility ? "" : "bar-visible"
      }`}
    >
      <div className={`home-page-container`}>
        Menu
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Menu;
