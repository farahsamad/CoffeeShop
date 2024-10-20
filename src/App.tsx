import React from "react";
import Home from "./pages/main/Home";
// import About from "./pages/main/About";
import Menu from "./pages/main/Menu";
import Navlayout from "./Controllers/Layout/Navlayout";
// import Index from "./pages/navbar/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Navlayout />}>
        <Route index element={<Home />}></Route>
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/menu" element={<Menu />} />
      </Route>

      {/*
      <Route path="/signin" element={<Signin />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
