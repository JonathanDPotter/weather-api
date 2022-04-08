import React, { useEffect, useState } from "react";
// components
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import Loading from "../Loading/Loading";
// utils
import { useAppSelector } from "../../store/hooks";
import { zipOrNav } from "../../store/slices/locationSlice";
import api from "../../api";
// interfaces
import Icoords from "../../interfaces/coords";
import Icurrent from "../../interfaces/current";
// styles
import "./Home.scss";

const Home = () => {
  // get location data from redux
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // local state
  const [coords, setCoords] = useState<Icoords | null>(null);
  const [weather, setWeather] = useState<Icurrent | null>(null);

  useEffect(() => {
    if (coords) {
      const getWeather = async () => {
        return await api.weather.getCurrent(coords);
      };

      getWeather().then((response) => response && setWeather(response.data));
    }
  }, [coords]);

  useEffect(() => {
    if (navCoords && selectedLocation === zipOrNav.Nav) setCoords(navCoords);
    if (zipCoords && selectedLocation === zipOrNav.Zip) setCoords(zipCoords);
  }, [navCoords, zipCoords, selectedLocation]);

  return weather ? (
    <div className="home page">
      <h2 className="page-title">Welcome to Weather Imp</h2>
      <WeatherInfo title="Current" weather={weather} />
    </div>
  ) : (
    <div className="page">
      <Loading />
    </div>
  );
};

export default Home;
