import React from "react";
import { useOutletContext } from "react-router";

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
    </div>
  );
}

export default Menu;
