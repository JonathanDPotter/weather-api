import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// utils
import api from "../../api";
import Icoords from "../../interfaces/coords";
// components
import LocationModal from "../LocationModal/LocationModal";
// styles
import "./NavBar.scss";
import { setNavCoords } from "../../store/locationReducer";

const NavBar = () => {
  // redux store dispatch and coords access
  const dispatch = useAppDispatch();
  const { navCoords } = useAppSelector((state) => state.location);

  // local state
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState<Icoords | null>(null);
  const [locationString, setLocationString] = useState<string | null>(null);

  const getCoordsFromNavigator = () => {
    navigator.geolocation.getCurrentPosition((response) => {
      const { latitude, longitude } = response.coords;

      dispatch(
        setNavCoords({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        })
      );

      setLocation({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      });
    });
  };

  useEffect(() => {
    if (!location) getCoordsFromNavigator();

    if (location) {
      const getCity = () => {
        api.geoapify
          .getCity(location.latitude, location.longitude)
          .then((city) => city && setLocationString(city))
          .catch((error) => console.log(error));
      };
      getCity();
    }
  }, [location]);

  return (
    <header>
      <p className="title">Weather Imp</p>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/hourly">Hourly</NavLink>
        <NavLink to="/10day">10 Day Forecast</NavLink>
      </nav>
      <button onClick={() => setShowLocationModal(true)}>
        change location
      </button>
      <p className="location">
        {locationString ? locationString : "Loading..."}
      </p>
      {showLocationModal && (
        <LocationModal closeModal={() => setShowLocationModal(false)} />
      )}
    </header>
  );
};

export default NavBar;
