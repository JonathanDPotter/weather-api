import React, { FC } from "react";
import { IforecastDay } from "../../interfaces/forecast";
// styles
import "./Forecast.scss";

interface Iprops {
  forecast: IforecastDay;
}

const Forecast: FC<Iprops> = ({ forecast }) => {
  const { hour, day } = forecast;
  const {
    maxtemp_f,
    mintemp_f,
    daily_chance_of_rain,
    daily_chance_of_snow,
    totalprecip_in,
    condition,
    maxwind_mph,
  } = day;

  return (
    <div className="forecast">
      <h3 className="title">
        {`${new Date(hour[0].time).toLocaleDateString([], {
          month: "short",
          weekday: "short",
          day: "numeric",
        })}`}
      </h3>
      <div className="temps">
        <div className="high">
          <h4>High</h4>
          <p className="high-temp">{maxtemp_f}&deg;</p>
        </div>
        <div className="low">
          <h4>Low</h4>
          <p className="low-temp">{mintemp_f}&deg;</p>
        </div>
      </div>
      <div className="precip-wind">
        <h4>Chance of Rain</h4>
        <p className="chance-rain">{daily_chance_of_rain}%</p>
        {daily_chance_of_snow > 0 && (
          <>
            <h4>Chance of Snow:</h4>
            <p className="chance-snow">{daily_chance_of_snow}%</p>
          </>
        )}
        {totalprecip_in > 0 && <h4>Total Precipitation:</h4>}
        {totalprecip_in > 0 && <p>{totalprecip_in} in</p>}
        <h4>Winds up to:</h4>
        <p className="wind-speed">{maxwind_mph}mph</p>
      </div>
      <h4>{condition.text}</h4>
      <img src={condition.icon} alt={condition.text} />
    </div>
  );
};

export default Forecast;
