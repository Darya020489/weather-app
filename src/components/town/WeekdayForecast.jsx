import React from "react";
import { DateTime } from "luxon";
import styled from "@emotion/styled";
import Flex from "../Flex";
import {useSelector} from 'react-redux';
import { getTemperature } from "../../functions/getTemperature";

function WeekdayForecast({ day }) {
  const weekdays = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  const weekdayNumber = DateTime.fromISO(day.dt_txt.split(" ")[0]).weekday;

  const {measure} = useSelector((state) => state.indicators);
  const tempMax = getTemperature(day.main.temp_max, measure);
  const tempMin = getTemperature(day.main.temp_min, measure);

  const DayWeather = styled.div`
    font-weight: 600;
    display: flex;

    .weekday {
      width: 100px;
      text-align: left;
      color: grey;
    }

    img {
      width: 35px;
      margin-right: 20px;
    }

    .temp-max {
      margin-right: 20px;
      width: 50px;
    }

    .temp-min {
      color: grey;
      width: 50px;
    }
  `;
  return (
    <DayWeather>
      {/* <Flex justify="space-between"> */}
        <p className="weekday">{weekdays[weekdayNumber]}</p>
        <img
          className="weekday-img"
          src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
          alt=""
        />
        <p className="temp-max">{tempMax}{measure}</p>
        <p className="temp-min">{tempMin}{measure}</p>
      {/* </Flex> */}
    </DayWeather>
  );
}

export default WeekdayForecast;
