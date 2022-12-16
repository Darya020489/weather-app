import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherForecast } from "../store/slices/townWeatherSlice";
import { changeError } from "../store/slices/errorsSlice";
import {
  getWeatherByCoord,
  getWeatherByName,
} from "../store/slices/townWeatherSlice";
import styled from "styled-components";
import MainLoader from "./loaders/MainLoader";
import Flex from "./Flex";
import ShortInfo from "./town/ShortInfo";
import InputError from "./errors/InputError";
import Map from "./town/Map";
import FiveDaysForecastList from "./town/FiveDaysForecastList";
import ThreeHourlyForecastList from "./town/ThreeHourlyForecastList";
import AdditionalInfo from "./town/AdditionalInfo";
import Graph from "./town/Graph";

const Town = styled.div`
  position: relative;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;

  h2 {
    margin-top: 20px;
    padding-bottom: 15px;
    font-size: 20px;
    text-align: left;
  }

  .town-weather__input {
    margin-right: 20px;
    padding: 3px;
    outline: none;
    border-radius: 5px;
    border: 1px solid black;

    &-error {
      border-color: red;
    }
  }

  button {
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: rgb(55, 130, 220);
  }
`;

function TownWeather() {
  const ENTER_KEY_CODE = 13;
  const [coord, setCoord] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const weatherForecast = useSelector(
    (state) => state.townWeather.weatherForecast
  );

  const isLoading = useSelector((state) => state.townWeather.isLoading);

  // const params = useParams();
  // console.log(params);

  useEffect(() => {
    const currentForecast = JSON.parse(localStorage.getItem("weatherForecast"));
    if (currentForecast) {
      dispatch(setWeatherForecast(currentForecast));
    } else {
      const pos = navigator.geolocation;
      pos.getCurrentPosition((loc) => {
        setCoord({ lat: loc.coords.latitude, lon: loc.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (coord) {
      dispatch(getWeatherByCoord(coord));
    }
  }, [coord, dispatch]);

  const changeCity = async () => {
    if (inputValue.toLowerCase() === weatherForecast.city.name.toLowerCase()) {
      dispatch(changeError("alreadyExists"));
      setShowError(true);
    } else if (inputValue.trim() === "") {
      dispatch(changeError("emptyEnter"));
      setShowError(true);
    } else {
      dispatch(getWeatherByName(inputValue));
      setShowError(false);
      setInputValue("");
    }
  };

  const changeCityByEnter = async (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    if (inputValue.toLowerCase() === weatherForecast.city.name.toLowerCase()) {
      dispatch(changeError("alreadyExists"));
      setShowError(true);
    } else if (inputValue.trim() === "") {
      dispatch(changeError("emptyEnter"));
      setShowError(true);
    } else {
      dispatch(getWeatherByName(inputValue));
      setShowError(false);
      setInputValue("");
    }
  };

  const inputClass = showError
    ? "town-weather__input town-weather__input-error"
    : "town-weather__input";

  return (
    <Town>
      {/* <Outlet /> */}
      <Flex justify="start">
        <input
          className={inputClass}
          type="text"
          placeholder="Enter new city name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => changeCityByEnter(e)}
        />
        <button onClick={changeCity}>Change city</button>
      </Flex>
      {showError && <InputError />}
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <h2 className="town-weather__header">
            {weatherForecast.city.name}, {weatherForecast.city.country}
          </h2>
          <Flex justify="space-between" align="start">
            <ShortInfo />
            <Graph />
            <FiveDaysForecastList />
          </Flex>
          <ThreeHourlyForecastList />
          <Flex justify="space-between" align="start">
            <AdditionalInfo />

            <Map />
          </Flex>
        </>
      )}
    </Town>
  );
}

export default TownWeather;
