import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const NavBar = () => {
  const { coords } = useAppSelector((state) => state.location);

  return (
    <header>
      <p className="title">Weather Imp</p>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/10day">10 Day Forecast</NavLink>
      </nav>
      <p>{`Lat: ${coords.latitude} Long: ${coords.longitude}`}</p>
    </header>
  );
};

export default NavBar;
