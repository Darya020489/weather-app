import React from "react";
import { useSelector } from "react-redux";
import ThreeHourlyForecastItem from "./ThreeHourlyForecastItem";
import styled from "@emotion/styled";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function ThreeHourlyForecastList() {
  const { list } = useSelector((state) => state.townWeather.weatherForecast);

  const HourlyForecastList = styled.div`
    /* padding: 10px; */
    display: flex;
    /* flex-direction: column; */
    border: 2px solid rgba(192, 185, 185, 0.829);
    border-radius: 10px;
    box-shadow: 5px 4px 8px 0px rgba(34, 60, 80, 0.2);
  `;

  return (
    <HourlyForecastList>
      <Splide
        options={{
          perPage: 22,
          rewind: true,
          width: 910,
          gap: "5px",
          arrows: false,
          pagination: false,
        }}
        aria-label="My Favorite Images"
      >
        {list.map((threeHours) => (
          <SplideSlide key={threeHours.dt}>
            <ThreeHourlyForecastItem weather={threeHours} />
          </SplideSlide>
        ))}
      </Splide>
    </HourlyForecastList>
  );
}

export default ThreeHourlyForecastList;
