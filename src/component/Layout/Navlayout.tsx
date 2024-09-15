import React, { useEffect, useState, useRef } from "react";
// import Header from "../../Pages/Navbar/Header";
import Header from "../../pages/navbar/Index";
import Home from "../../pages/main/Home";
import Footer from "../../pages/footer/Index";
import "../Styles/Nav.css";
// import "../traverse.css";
import { Outlet, useLocation } from "react-router-dom";

interface ContextType {
  barVisibility: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
}

function Navlayout() {
  const [barVisibility, setBarVisibility] = useState<boolean>(true);
  const aboutRef = useRef<HTMLDivElement>(null);
  // const [search, setSearch] = useState(true);
  // useEffect(() => {
  //   localStorage.setItem("userid", JSON.stringify(""));
  //   localStorage.setItem("username", JSON.stringify(""));
  //   localStorage.setItem("userimage", JSON.stringify(""));
  // }, []);
  // const currentlocation = useLocation().pathname;
  // useEffect(() => {
  //   if (currentlocation == "/Traverse/Search") {
  //     // console.log("yes");
  //     setSearch(false);
  //   } else {
  //     setSearch(true);
  //     // console.log("no");
  //   }
  // }, [search]);

  return (
    <>
      <div className="home-container">
        <Header
          aboutRef={aboutRef}
          barVisibility={barVisibility}
          setBarVisibility={setBarVisibility}
        />
        <Outlet context={{ barVisibility, aboutRef } as ContextType} />
        {/* <Footer></Footer> */}
      </div>
    </>
  );
}

export default Navlayout;
