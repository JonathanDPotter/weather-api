import React, { FC } from "react";
import { IforecastHour } from "../../interfaces/forecast";
// styles
import "./HourCast.scss";

interface Iprops {
  weather: IforecastHour;
}

const HourCast: FC<Iprops> = ({ weather }) => {
  return (
    <div className="hour-cast">
      <p className="date day">
        {new Date(weather.time).toLocaleDateString([], {
          month: "short",
          weekday: "short",
          day: "numeric",
        })}
      </p>{" "}
      <p className="date time">
        {new Date(weather.time)
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/^\b0/g, "")}
      </p>
      <p className="temperature">{weather.temp_f}&deg;</p>
      <p className="condition">{weather.condition.text}</p>
      {weather.chance_of_rain > 0 && (
        <p>Chance of Precipitation {weather.chance_of_rain}%</p>
      )}
      {weather.chance_of_snow > 0 && (
        <p>Chance of Precipitation {weather.chance_of_snow}%</p>
      )}
      <p>
        Wind {weather.wind_dir} {weather.wind_mph}mph
      </p>
      <img src={weather.condition.icon} alt={weather.condition.text} />
    </div>
  );
};

export default HourCast;
