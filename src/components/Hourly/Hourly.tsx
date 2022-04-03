import React, { useEffect, useState } from 'react'
// interfaces
import Icoords from '../../interfaces/coords';
import Iforecast from '../../interfaces/forecast';
// utils
import api from '../../api';
import { useAppSelector } from '../../store/hooks';
import { zipOrNav } from '../../store/slices/locationSlice';
// styles
import "./Hourly.scss"

const Hourly = () => {
  // get location data from redux
  const { navCoords, zipCoords, selectedLocation } = useAppSelector(
    (state) => state.location
  );

  // local state
  const [coords, setCoords] = useState<Icoords | null>(null);
  const [weather, setWeather] = useState<Iforecast | null>(null);

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

  return <div className="hourly page">
    <h2>Hourly Forecast</h2>
  </div>;
}

export default Hourly