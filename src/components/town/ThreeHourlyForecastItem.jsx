import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";
import { getTemperature } from "../../functions/getTemperature";

const ThreeHourlyItem = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding: 15px 0px;
font-size: 12px;
font-weight: 700;

img {
  width: 30px;
}
.threeHourlyItem__time {
  color: grey;
}
`;

function ThreeHourlyForecastItem({ weather }) {
  const measure = useSelector((state) => state.indicators.measure);
  const temperature = getTemperature(weather.main.temp, measure);

  const date = weather.dt_txt;
  const dateNow = useSelector(
    (state) => state.townWeather.weatherForecast.list[0].dt_txt
  );
  const weatherNow = date === dateNow ? true : false;

  const time = date.split(" ")[1].slice(0, 5);

  return (
    <ThreeHourlyItem>
      {weatherNow ? (
        <p style={{ color: "rgb(55, 130, 220)" }}>Now</p>
      ) : (
        <p className="threeHourlyItem__time">{time}</p>
      )}
      <img
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt=""
      />
      <p>
        {temperature}
        {measure}
      </p>
    </ThreeHourlyItem>
  );
}

export default ThreeHourlyForecastItem;
