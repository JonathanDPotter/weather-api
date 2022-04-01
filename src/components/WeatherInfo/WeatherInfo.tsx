import React, { FC } from 'react'
import Iweather from '../../interfaces/weather';
// styles 
import "./WeatherInfo.scss";

interface Iprops {
  weather: Iweather;
  title: string;
}

const WeatherInfo: FC<Iprops> = ({title, weather}) => {
  return (
    <div className="weather-info">
      <p className="title">{title}</p>
      <p className="temperature">{weather.current.temp_f}&deg;</p>
      <p className="description">{weather.current.condition.text}</p>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
    </div>
  );
}

export default WeatherInfo