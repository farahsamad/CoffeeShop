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
      className={`home-page-container ${barVisibility ? "" : "bar-visible"}`}
    >
      Menu
      <Footer></Footer>
    </div>
  );
}

export default Menu;
