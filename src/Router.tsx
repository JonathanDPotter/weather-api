import React from "react";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Weather Imp</h1>} />;
    </Routes>
  );
};

export default Router;
