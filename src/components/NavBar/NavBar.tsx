import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// utils
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setNavCoords,
  setSelectedLocation,
  zipOrNav,
} from "../../store/slices/locationSlice";
import api from "../../api";
import Icoords from "../../interfaces/coords";
// components
import LocationModal from "../LocationModal/LocationModal";
// images
import { ReactComponent as ImpLogo } from "../../images/impLogo.svg";
// styles
import "./NavBar.scss";

const NavBar = () => {
  // redux store dispatch and coords access
  const dispatch = useAppDispatch();
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // navigation hook from react-router
  const navigate = useNavigate();

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
      <div className="title">
        <ImpLogo height="1rem" className="logo" />
        <h1>Weather Imp</h1>
      </div>

      <nav>
        <NavLink to="/">Current</NavLink>
        <NavLink to="/hourly">Hourly</NavLink>
        <NavLink to="/threeday">3 Day Forecast</NavLink>
      </nav>
      {selectedLocation === zipOrNav.Nav ? (
        <button onClick={() => setShowLocationModal(true)} className="zip-nav">
          Enter Zip
        </button>
      ) : (
        <button
          onClick={() => dispatch(setSelectedLocation(zipOrNav.Nav))}
          className="zip-nav"
        >
          Use Location
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
