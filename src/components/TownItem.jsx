import React from "react";
import { useSelector } from "react-redux";
import "../assets/styles/townItem.css";
import { getTemperature } from "../functions/getTemperature";
import classNames from "classnames";

function TownItem({ town, deleteTown, showComponents }) {
  console.log(town);
  const measure = useSelector((state) => state.indicators.measure);
  const temperature = getTemperature(town.list[0].main.temp, measure);
  const feeelsLikeTemp = getTemperature(town.list[0].main.feels_like, measure);

  const classSize = classNames("town__temp", {
    "town__temp_big": (showComponents === undefined),
  });

  return (
    <div className="town">
      {showComponents && (
        <p className="town__title">
          {town.city.name}, {town.city.country}
        </p>
      )}
      <p className={classSize}>
        {temperature}
        {measure}
      </p>
      <img
        className="town__img"
        src={`https://openweathermap.org/img/w/${town.list[0].weather[0].icon}.png`}
        alt=""
      />
      <p className="town__desc">{town.list[0].weather[0].description}</p>
      {showComponents && (
        <button
          className="town__delete"
          onClick={() => deleteTown(town.city.id)}
        >
          x
        </button>
      )}
      {!showComponents && (
        <p className="town__desc">
          feels like {feeelsLikeTemp}{measure}
        </p>
      )}
    </div>
  );
}
export default TownItem;
