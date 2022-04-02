import React, { useEffect, useState } from "react";
import api from "../../api";
// utils
import { useAppSelector } from "../../store/hooks";
import { zipOrNav } from "../../store/slices/locationSlice";
// interfaces
import Icoords from "../../interfaces/coords";
// components
import WeatherInfo from "../WeatherInfo/WeatherInfo";
// styles
import "./ThreeDay.scss";
import Iforecast from "../../interfaces/forecast";

const ThreeDay = () => {
  // get location data from redux
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // local state
  const [coords, setCoords] = useState<Icoords | null>(null);
  const [weather, setWeather] = useState<Iforecast | null>(null);

  useEffect(() => {
    weather && console.log(weather);
  }, [weather]);

  useEffect(() => {
    if (coords) {
      const getWeather = async () => {
        return await api.weather.getThreeDay(coords);
      };

      getWeather().then((response) => response && setWeather(response.data));
    }
  }, [coords]);

  useEffect(() => {
    if (navCoords && selectedLocation === zipOrNav.Nav) setCoords(navCoords);
    if (zipCoords && selectedLocation === zipOrNav.Zip) setCoords(zipCoords);
  }, [navCoords, zipCoords, selectedLocation]);
  return weather ? (
    <div className="three-day page">
      <WeatherInfo title="Current" weather={weather} />
    </div>
  ) : (
    <></>
  );
};

export default ThreeDay;
