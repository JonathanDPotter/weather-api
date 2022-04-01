import React, { useEffect, useState } from "react";
// components
import WeatherInfo from "../WeatherInfo/WeatherInfo";
// utils
import { useAppSelector } from "../../store/hooks";
import { zipOrNav } from "../../store/slices/locationSlice";
// interfaces
import Icoords from "../../interfaces/coords";
// styles
import "./Home.scss";
import api from "../../api";
import Iweather from "../../interfaces/weather";

const Home = () => {
  // get location data from redux
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // local state
  const [coords, setCoords] = useState<Icoords | null>(null);
  const [weather, setWeather] = useState<Iweather | null>(null);

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

  return (
    <div className="home page">
      <h1>Welcome to Weather Imp</h1>
      {weather && <WeatherInfo title="Current" weather={weather} />}
    </div>
  );
};

export default Home;
