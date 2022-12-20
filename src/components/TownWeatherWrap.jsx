import React from "react";
import { useSelector } from "react-redux";
import TownWeather from "./TownWeather";
import styled from "styled-components";
import Map from "./town/Map";

const TownWeatherWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

function TownWeatherWrap() {
  const isLoading = useSelector((state) => state.townWeather.isLoading);

  console.log("wrap");

  return (
    <TownWeatherWrapper>
      <TownWeather />
      <Map />
    </TownWeatherWrapper>
  );
}

export default TownWeatherWrap;
