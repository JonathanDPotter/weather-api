import React, { useEffect, useState } from "react";
// interfaces
import Icoords from "../../interfaces/coords";
import Iforecast, { IforecastHour } from "../../interfaces/forecast";
// utils
import api from "../../api";
import { useAppSelector } from "../../store/hooks";
import { zipOrNav } from "../../store/slices/locationSlice";
// styles
import "./Hourly.scss";
import HourCast from "../HourCast/HourCast";

const Hourly = () => {
  // get location data from redux
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // local state
  const [coords, setCoords] = useState<Icoords | null>(null);
  const [weather, setWeather] = useState<Iforecast | null>(null);
  const [hoursArray, setHoursArray] = useState<IforecastHour[]>([]);

  useEffect(() => {
    if (coords) {
      const getWeather = async () => {
        return await api.weather.getThreeDay(coords);
      };

      getWeather().then((response) => {
        response && setWeather(response.data);
      });
    }
  }, [coords]);

  useEffect(() => {
    if (navCoords && selectedLocation === zipOrNav.Nav) setCoords(navCoords);
    if (zipCoords && selectedLocation === zipOrNav.Zip) setCoords(zipCoords);
  }, [navCoords, zipCoords, selectedLocation]);

  useEffect(() => {
    if (weather)
      setHoursArray(
        [
          ...weather.forecast.forecastday[0].hour,
          ...weather.forecast.forecastday[1].hour,
        ].filter((item) => {
          const hour = new Date(item.time);
          const now = new Date();
          return hour > now;
        })
      );
  }, [weather]);

  return (
    <div className="hourly page">
      <h2 className="page-title">Hourly Forecast</h2>
      {weather &&
        hoursArray.map((hour, i) => {
          const forecastHour = new Date(hour.time);
          const now = new Date();
          if (i < 24) {
            return <HourCast weather={hour} key={`Hour${hour.time_epoch}`} />;
          }
        })}
    </div>
  );
};

export default Hourly;
