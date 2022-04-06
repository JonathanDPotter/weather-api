import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import Home from "./components/Home/Home";
import Hourly from "./components/Hourly/Hourly";
import NavBar from "./components/NavBar/NavBar";
import ThreeDay from "./components/ThreeDay/ThreeDay";

const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/hourly" element={<Hourly />} />
        <Route path="/threeday" element={<ThreeDay />} />
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </>
  );
};

export default Router;
