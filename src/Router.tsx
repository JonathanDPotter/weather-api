import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// utils
import { useAppDispatch } from "./store/hooks";
// components
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import TenDay from "./components/TenDay/TenDay";
import { setCoords } from "./store/locationReducer";

const Router = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      const success = (position: any) => {
        const { latitude, longitude } = position.coords;
        dispatch(setCoords({ latitude, longitude }));
      };

      navigator.geolocation.getCurrentPosition(success, (error) =>
        console.log(error)
      );
    } else {
      console.log("Unavailable");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/10day" element={<TenDay />} />
      </Routes>
    </>
  );
};

export default Router;
