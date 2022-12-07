import React from "react";
import { useSelector } from "react-redux";
import "./styles/townItem.css";
import { getTemperature } from "../functions/getTemperature";

function TownItem({ town, deleteTown, showComponents }) {
  const measure = useSelector((state) => state.townList.measure);
  const temperature = getTemperature(town, measure);

  return (
    <div className="town">
      {showComponents && (
        <p className="town__title">
          {town.city.name}, {town.city.country}
        </p>
      )}
      <p className="town__temp">
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
    </div>
  );
}
export default TownItem;
