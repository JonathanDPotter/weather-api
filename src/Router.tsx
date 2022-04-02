import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import ThreeDay from "./components/ThreeDay/ThreeDay";

const Router = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/hourly" element={<h1>Hourly</h1>} />
        <Route path="/10day" element={<ThreeDay />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </>
  );
};

export default Router;
