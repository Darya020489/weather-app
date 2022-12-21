import React, { useState, useEffect, memo } from "react";
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
  const mapIsSmall = useSelector((store) => store.map.isSmall);
  const [actualSize, setActualSize] = useState(true);
  console.log("wrap");

  useEffect(() => {
    setActualSize(mapIsSmall);
  }, [mapIsSmall]);

  return (
    <TownWeatherWrapper>
      <TownWeather />
      {!actualSize && <Map />}
    </TownWeatherWrapper>
  );
}

export default memo(TownWeatherWrap);
