import React, {useMemo, memo} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTemperature } from "../functions/getTemperature";
import classNames from "classnames";

const CityItem = styled.div`
  position: relative;
  padding: 15px;
  /* width: 90%; */
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

    &_big {
      font-size: 26px;
    }
  }

  .city__img {
    width: 40px;
    height: 40px;
    margin: 0;
    display: inline-block;

    &_big {
      width: 100px;
      height: 100px;
      animation: pulsate-bck 1s ease-in-out infinite both;
    }
  }

  .city__desc {
    color: rgba(86, 78, 78, 0.829);
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

function TownItem({ town, deleteTown, showComponents }) {
  const measure = useSelector((state) => state.indicators.measure);
  const temperature = getTemperature(town.list[0].main.temp, measure);
  const feeelsLikeTemp = getTemperature(town.list[0].main.feels_like, measure);

  const classTempSize = classNames("city__temp", {
    city__temp_big: showComponents === undefined,
  });

  const classImgSize = classNames("city__img", {
    city__img_big: showComponents === undefined,
  });

  console.log('item');
  return (
    <CityItem className="city">
      {showComponents && (
        <p className="city__title">
          {town.city.name}, {town.city.country}
        </p>
      )}
      <p className={classTempSize}>
        {temperature}
        {measure}
      </p>
      <img
        className={classImgSize}
        src={`https://openweathermap.org/img/w/${town.list[0].weather[0].icon}.png`}
        alt=""
      />
      <p className="city__desc">{town.list[0].weather[0].description}</p>
      {showComponents && (
        <button
          className="city__delete"
          onClick={() => deleteTown(town.city.id)}
        >
          x
        </button>
      )}
      {!showComponents && (
        <p className="city__desc">
          feels like {feeelsLikeTemp}
          {measure}
        </p>
      )}
    </CityItem>
  );
}
export default memo(TownItem);
