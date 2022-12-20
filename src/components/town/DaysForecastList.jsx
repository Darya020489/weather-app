import React, { memo } from "react";
import { useSelector } from "react-redux";
import Flex from "../Flex";
import DayForecast from "./DayForecast";

function DaysForecastList() {
  const list = useSelector((store) =>
    store.townWeather.weatherForecast.list.filter(
      (day, index) => index % 8 === 0
    )
  );
  console.log("weekdays");
  return (
    <Flex direction="column" align="start">
      {list && list.map((day) => <DayForecast key={day.dt} day={day} />)}
    </Flex>
  );
}

export default memo(DaysForecastList);
