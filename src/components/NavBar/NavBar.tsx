import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// utils
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setNavCoords,
  setSelectedLocation,
  zipOrNav,
} from "../../store/locationReducer";
import api from "../../api";
import Icoords from "../../interfaces/coords";
// components
import LocationModal from "../LocationModal/LocationModal";
// styles
import "./NavBar.scss";

const NavBar = () => {
  // redux store dispatch and coords access
  const dispatch = useAppDispatch();
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // local state
  const [showLocationModal, setShowLocationModal] = useState(false);
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
    });
  };

  const getCity = (location: Icoords) => {
    console.log("getCity ", location);
    api.geoapify
      .getCity(location.latitude, location.longitude)
      .then((city) => city && setLocationString(city))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!navCoords) getCoordsFromNavigator();

    if (navCoords && selectedLocation === zipOrNav.Nav) getCity(navCoords);

    if (zipCoords && selectedLocation === zipOrNav.Zip) getCity(zipCoords);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navCoords, zipCoords, selectedLocation]);

  return (
    <header>
      <p className="title">Weather Imp</p>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/hourly">Hourly</NavLink>
        <NavLink to="/10day">10 Day Forecast</NavLink>
      </nav>
      {selectedLocation === zipOrNav.Nav ? (
        <button onClick={() => setShowLocationModal(true)}>
          Get Location from Zip
        </button>
      ) : (
        <button onClick={() => dispatch(setSelectedLocation(zipOrNav.Nav))}>
          Use Device Location
        </button>
      )}
      <p className="location">
        {locationString ? locationString : "Loading..."}
      </p>
      {showLocationModal && (
        <LocationModal
          closeModal={() => setShowLocationModal(false)}
          setUseZipCoords={() => dispatch(setSelectedLocation(zipOrNav.Zip))}
        />
      )}
    </header>
  );
};

export default NavBar;
