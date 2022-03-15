import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import TenDay from "./components/TenDay/TenDay";

const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/hourly" element={<p>hourly</p>} />
        <Route path="/10day" element={<TenDay />} />
      </Routes>
    </>
  );
};

export default Router;
