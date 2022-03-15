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

const NavBar = () => {
  const dispatch = useAppDispatch();

  // get coordinates from redux state
  const { coords } = useAppSelector((state) => state.location);
  // local state
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<Icoords | null>(null);
  const [autolocate, setAutolocate] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const changeLocation = () => {
    setShowLocationModal(true);
  };

  const closeModal = () => setShowLocationModal(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const success = (position: any) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      };

      navigator.geolocation.getCurrentPosition(success, (error) =>
        console.log(error)
      );
    }

    if (coords) {
      setLocation(coords);
    }

    if (location) {
      const getCity = async () => {
        return await api.geoapify.getCity(
          location.latitude,
          location.longitude
        );
      };

      getCity()
        .then((result) => {
          if (result) setCity(result);
        })
        .catch((error) => console.log(error));
    }
  }, [coords, location]);

  return (
    <header>
      <p className="title">Weather Imp</p>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/hourly">Hourly</NavLink>
        <NavLink to="/10day">10 Day Forecast</NavLink>
      </nav>
      <button onClick={changeLocation}>change location</button>
      {city ? (
        <p className="location">{city}</p>
      ) : (
        <p className="location">Loading...</p>
      )}
      {showLocationModal && <LocationModal closeModal={closeModal}/>}
    </header>
  );
};

export default NavBar;
