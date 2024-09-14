import React from "react";
import Home from "./pages/main/Home";
import About from "./pages/main/About";
import Menu from "./pages/main/Menu";
import Navlayout from "./component/Layout/Navlayout";
import Index from "./pages/navbar/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => (
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Navlayout />}>
  //       <Route index element={<Home />}></Route>
  //       {/* <Route path="/about" element={<About />} /> */}
  //       <Route path="/menu" element={<Menu />} />
  //     </Route>

  //     {/*
  //     <Route path="/signin" element={<Signin />} /> */}
  //   </Routes>
  // </BrowserRouter>
  <div className="hello">
    <h1 className="hello">hello</h1>
    <h2 className="hello">hello</h2>
    <h3 className="hello">hello</h3>
    <h4 className="hello">hello</h4>
    <h5 className="hello">hello</h5>
    <h6 className="hello">hello</h6>
  </div>
);

export default App;
