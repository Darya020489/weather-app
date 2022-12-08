import React from "react";
import { useSelector } from "react-redux";
import Flex from "../Flex";
import WeekdayForecast from "./WeekdayForecast";

function FiveDaysForecastList() {
  const list = useSelector((store) => store.townWeather.weatherForecast.list.filter((day, index) => index % 8 === 0));

  return (
    <Flex direction='column' align="start">
      {list && list.map((day) => <WeekdayForecast key={day.dt} day={day} />)}
    </Flex>
  );
}

export default FiveDaysForecastList;
