import React from "react";
import { useSelector } from "react-redux";
import "./styles/townItem.css";

function TownItem({ town, deleteTown }) {
  const measure = useSelector((state) => state.townList.measure);
  let tempereture =
    measure === "°F"
      ? Math.round(town.list[0].main.temp)
      : Math.round(town.list[0].main.temp - 273.15);

  return (
    <div className="town">
      <p className="town__title">
        {town.city.name}, {town.city.country}
      </p>
      <p className="town__temp">
        {tempereture}
        {measure}
      </p>
      <img
        className="town__img"
        src={`http://openweathermap.org/img/w/${town.list[0].weather[0].icon}.png`}
        alt=""
      />
        <p className="town__desc">{town.list[0].weather[0].description}</p>
        <button className="town__delete" onClick={() => deleteTown(town.city.id)}>x</button>
    </div>
  );
}
export default TownItem;
