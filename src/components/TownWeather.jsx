import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCoord } from "../store/slices/townWeatherSlice";
// import styled from "styled-components";
import styled from "@emotion/styled";
import MainLoader from "./loaders/MainLoader";
import Flex from "./Flex";
import ShortInfo from "./town/ShortInfo";
import Map from "./town/Map";
import WeekWeather from "./town/WeekWeather";
import DayWeather from "./town/DayWeather";
import AdditionalInfo from "./town/AdditionalInfo";
import Graph from "./town/Graph";

function TownWeather() {
  const [coord, setCoord] = useState(null);
  const dispatch = useDispatch();
  const { townWeather } = useSelector((state) => state.townWeather);
  const { isLoading } = useSelector((state) => state.townWeather);

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

  const Town = styled.div`
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;

    h2 {
      padding: 10px;
      font-size: 16px;
      text-align: left;
    }
  `;

  return (
    <Town>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          {/* <Outlet /> */}
          <h2 className="town-weather__header">{townWeather.city.name}</h2>
          <Flex justify='space-around'>
            <ShortInfo />
            <Map />
            <WeekWeather />
          </Flex>
          <DayWeather />
          <Flex justify='space-around'>
            <AdditionalInfo />
            <Graph />
          </Flex>
        </>
      )}
    </Town>
  );
}

export default TownWeather;
