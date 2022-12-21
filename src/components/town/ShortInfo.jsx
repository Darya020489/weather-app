import React, { useEffect, memo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTemperature } from "../../functions/getTemperature";

const Info = styled.div`
  .info__title {
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

  .info__container {
    margin-bottom: 10px;
    font-size: 18px;
    /* line-height: 1.4; */
    color: #454444;
  }

  .info__desc {
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    color: rgb(21, 21, 127);
  }

  .info__tomorrow {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 500;
    color: rgb(21, 21, 127);
  }

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
  const [showDiff, setShowDiff] = useState(false);

  const town = useSelector((state) => state.townWeather.weatherForecast);
  const measure = useSelector((state) => state.indicators.measure);
  const temperature = getTemperature(town.list[0].main.temp, measure);
  const description = town.list[0].weather[0].description;
  const feeelsLikeTemp = getTemperature(town.list[0].main.feels_like, measure);
  const maxTemp = getTemperature(town.list[0].main.temp_max, measure);
  const minTemp = getTemperature(town.list[0].main.temp_min, measure);
  const tempTomorrow = getTemperature(town.list[8].main.temp, measure);
  const tempDiff = tempTomorrow - temperature;
  const textDiff = tempDiff < 0 ? "less" : "more";

  console.log("short");

  useEffect(() => {
    if (tempDiff !== 0) {
      setShowDiff(true);
    }
  }, [tempDiff]);

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
      <div className="info__container">
        <p className="info__desc">{description}</p>
        <p className="info__feels">
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
        {showDiff && (
          <p className="info__tomorrow">
            It's {tempTomorrow} {measure} tomorrow.{" "}
            {tempDiff < 0 ? -tempDiff : tempDiff} {measure} {textDiff} than
            today.
          </p>
        )}
      </div>
    </Info>
  );
}

export default memo(ShortInfo);
