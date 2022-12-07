import React from "react";
import { useSelector } from "react-redux";
import TownItem from "../TownItem";

function ShortInfo() {
  const town = useSelector((state) => state.townWeather.townWeather);

  return <TownItem town={town} showComponents={false} />;
}

export default ShortInfo;
