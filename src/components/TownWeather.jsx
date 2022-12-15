import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeatherByCoord,
  getWeatherByName,
} from "../store/slices/townWeatherSlice";
import styled from "styled-components";
import MainLoader from "./loaders/MainLoader";
import Flex from "./Flex";
import ShortInfo from "./town/ShortInfo";
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
    padding-bottom: 15px;
    font-size: 20px;
    text-align: left;
  }

  input {
    margin-right: 20px;
    padding: 3px;
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
  const dispatch = useDispatch();
  const weatherForecast = useSelector(
    (state) => state.townWeather.weatherForecast
  );

  const isLoading = useSelector((state) => state.townWeather.isLoading);

  // const params = useParams();
  // console.log(params);

  useEffect(() => {
    const pos = navigator.geolocation;
    pos.getCurrentPosition((loc) => {
      setCoord({ lat: loc.coords.latitude, lon: loc.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (coord) {
      dispatch(getWeatherByCoord(coord));
    }
  }, [coord, dispatch]);

  const changeCity = async () => {
    if (inputValue.toLowerCase() === weatherForecast.city.name.toLowerCase())
      return;
    dispatch(getWeatherByName(inputValue));
  };

  const changeCityByEnter = async (e) => {
    if (
      e.keyCode !== ENTER_KEY_CODE ||
      inputValue.toLowerCase() === weatherForecast.city.name.toLowerCase()
    )
      return;
    dispatch(getWeatherByName(inputValue));
  };

  return (
    <Town>
      {/* <Outlet /> */}
      <Flex margin="0 0 20px 0" justify="start">
        <input
          type="text"
          placeholder="Enter new city name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => changeCityByEnter(e)}
        />
        <button onClick={changeCity}>Change city</button>
      </Flex>
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
