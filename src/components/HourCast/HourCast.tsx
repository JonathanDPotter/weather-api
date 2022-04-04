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
      <p className="title">
        {`${new Date(weather.time).toLocaleDateString([], {
          month: "short",
          weekday: "long",
          day: "numeric",
        })} ${new Date(weather.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`}
      </p>
      <p className="temperature">{weather.temp_f}&deg;</p>
      <p className="description">{weather.condition.text}</p>
      {weather.chance_of_rain > 0 && (
        <p>Chance of Precipitation {weather.chance_of_rain}%</p>
      )}
      {weather.chance_of_snow > 0 && (
        <p>Chance of Precipitation {weather.chance_of_snow}%</p>
      )}
      <img src={weather.condition.icon} alt={weather.condition.text} />
    </div>
  );
};

export default HourCast;
