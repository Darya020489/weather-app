import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCoord } from "../store/slices/townWeatherSlice";
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
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: start;

h2 {
  padding-bottom: 15px;
  font-size: 20px;
  text-align: left;
}
`;

function TownWeather() {
  const [coord, setCoord] = useState(null);
  const dispatch = useDispatch();
  const weatherForecast = useSelector((state) => state.townWeather.weatherForecast);
  // console.log(townWeather);
  useEffect(() => {
    console.log(weatherForecast);
  }, [weatherForecast])
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

  return (
    <Town>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          {/* <Outlet /> */}
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
