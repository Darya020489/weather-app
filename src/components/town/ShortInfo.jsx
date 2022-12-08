import React from "react";
import { useSelector } from "react-redux";
import TownItem from "../TownItem";

function ShortInfo() {
  const town = useSelector((state) => state.townWeather.weatherForecast);

  return <TownItem town={town} />;
}

export default ShortInfo;
