import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import TownItem from "../TownItem";
import { getTemperature } from "../../functions/getTemperature";

const Info = styled.div`
.info__title{
  font-size: 22px;
}
  .info__temp {
    font-size: 26px;
    font-weight: 700;
    color: rgb(21, 21, 127);
  }

  .info__img {
    width: 110px;
    height: 110px;
    display: inline-block;
    animation: pulsate-bck 1s ease-in-out infinite both;
  }

  .info__desc {
    margin-bottom: 10px;
  }

  .info__temp-max {
    margin-bottom: 10px;
  }
  .info__temp-min {
    margin-bottom: 10px;
  }

  /* .info__desc {
      color: rgba(86, 78, 78, 0.829);
    } */

  @keyframes pulsate-bck {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;

function ShortInfo() {
  const town = useSelector((state) => state.townWeather.weatherForecast);
  const measure = useSelector((state) => state.indicators.measure);
  const temperature = getTemperature(town.list[0].main.temp, measure);
  const maxTemp = getTemperature(town.list[0].main.temp_max, measure);
  const minTemp = getTemperature(town.list[0].main.temp_min, measure);
  const feeelsLikeTemp = getTemperature(town.list[0].main.feels_like, measure);
  return (
    <Info town={town}>
      <h2 className="info__title">
        {town.city.name}, {town.city.country}
      </h2>
      <p className="info__temp">
        {temperature}
        {measure}
      </p>
      <img
        className="info__img"
        src={`https://openweathermap.org/img/w/${town.list[0].weather[0].icon}.png`}
        alt=""
      />
      <p className="info__desc">
        feels like {feeelsLikeTemp}
        {measure}
      </p>
      <p className="info__temp-max">
        night temperature {minTemp}
        {measure}
      </p>
      <p className="info__temp-min">
        day temperature {maxTemp}
        {measure}
      </p>
    </Info>
  );
}

export default ShortInfo;
