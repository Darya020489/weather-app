import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTemperature } from "../functions/getTemperature";

const CityItem = styled.div`
  position: relative;
  padding: 15px;
  min-width: 150px;
  max-width: 200px;
  margin-bottom: 15px;
  border: 2px solid rgba(192, 185, 185, 0.829);
  border-radius: 30px;
  box-shadow: 5px 4px 8px 0px rgba(34, 60, 80, 0.2);

  .city__temp {
    font-size: 18px;
    font-weight: 700;
    color: rgb(21, 21, 127);
  }

  .city__img {
    width: 40px;
    height: 40px;
    margin: 0;
    display: inline-block;
  }

  .city__delete {
    position: absolute;
    top: 50%;
    right: 3px;
    padding: 0px 5px;
    background: rgb(241, 105, 105);
    border: 1px solid black;
    border-radius: 5px;
  }
`;

function TownItem({ town, deleteTown }) {
  const measure = useSelector((state) => state.indicators.measure);
  const temperature = getTemperature(town.list[0].main.temp, measure);

  console.log("item");
  return (
    <CityItem className="city">
      <p className="city__title">
        {town.city.name}, {town.city.country}
      </p>
      <p className="city__temp">
        {temperature}
        {measure}
      </p>
      <img
        className="city__img"
        src={`https://openweathermap.org/img/w/${town.list[0].weather[0].icon}.png`}
        alt=""
      />
      <p className="city__desc">{town.list[0].weather[0].description}</p>

      <button className="city__delete" onClick={() => deleteTown(town.city.id)}>
        x
      </button>
    </CityItem>
  );
}
export default memo(TownItem);
