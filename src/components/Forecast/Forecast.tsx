import React, { FC } from "react";
import { IforecastDay } from "../../interfaces/forecast";
// styles
import "./Forecast.scss";

interface Iprops {
  forecast: IforecastDay;
}

const Forecast: FC<Iprops> = ({ forecast }) => {
  const { date, day } = forecast;
  const {
    maxtemp_f,
    mintemp_f,
    daily_chance_of_rain,
    daily_chance_of_snow,
    condition,
  } = day;

  return (
    <div className="forecast">
      <h3>{date}</h3>
      <div className="temps">
        <div className="high">
          <h4>High</h4>
          <p className="high-temp">{maxtemp_f}</p>
        </div>
        <div className="low">
          <h4>Low</h4>
          <p className="low-temp">{mintemp_f}</p>
        </div>
      </div>
        <h4>Chance of Rain</h4>
      <p className="chance-rain">{daily_chance_of_rain}%</p>
      {daily_chance_of_snow > 0 && (
        <>
          <h4>Chance of Snow</h4>
          <p className="chance-snow">{daily_chance_of_snow}%</p>
        </>
      )}
      <img src={condition.icon} alt={condition.text} />
    </div>
  );
};

export default Forecast;
