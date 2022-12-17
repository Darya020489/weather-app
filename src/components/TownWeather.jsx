import React, { useMemo, memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherForecast } from "../store/slices/townWeatherSlice";
import { changeError } from "../store/slices/errorsSlice";
import {
  getWeatherByCoord,
  getWeatherByName,
} from "../store/slices/townWeatherSlice";
import weatherService from "../services/weatherService";
import styled from "@emotion/styled";
// import styled from "styled-components";
import MainLoader from "./loaders/MainLoader";
import Flex from "./Flex";
import ShortInfo from "./town/ShortInfo";
import InputError from "./errors/InputError";
import Map from "./town/Map";
import DayForecast from "./town/DaysForecastList";
import ThreeHourlyForecastList from "./town/ThreeHourlyForecastList";
import AdditionalInfo from "./town/AdditionalInfo";
import Graph from "./town/Graph";

// function Town(props) {
//   return <TownContainer {...props}>{props.children}</TownContainer>;
// }

function TownWeather() {
  const [townImage, setTownImage] = useState(
    localStorage.getItem("cityImage") ?? undefined
  );



  const Town = useMemo(() => {
    return styled.div`
      .town-weather__container {
        background: ${`linear-gradient(
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.7) 100%
      ),
      url(`}${townImage ??
          "https://narodna-pravda.ua/wp-content/uploads/2019/05/1-739378-XSIHuatR.jpg"}${`)
        center/cover no-repeat`};
        border-radius: 10px;
      }
    `;
  }, [townImage]);

  const ENTER_KEY_CODE = 13;
  const [coord, setCoord] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.townWeather.isLoading);

  const weatherForecast = useSelector(
    (state) => state.townWeather.weatherForecast
  );

  // const params = useParams();
  // console.log(params);

  useEffect(() => {
    const currentForecast = JSON.parse(localStorage.getItem("weatherForecast"));

    if (currentForecast) {
      dispatch(setWeatherForecast(currentForecast));
    } else {
      const pos = navigator.geolocation;
      pos.getCurrentPosition((loc) => {
        setCoord({ lat: loc.coords.latitude, lon: loc.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (coord) {
      dispatch(getWeatherByCoord(coord));
    }
  }, [coord, dispatch]);

  useEffect(() => {
    async function getImage() {
      // if(!weatherForecast) return;
      if (!townImage && weatherForecast) {
        try {
          const result = await weatherService.getImageByName(
            weatherForecast.city.name.toLowerCase()
          );
          setTownImage(result);

          localStorage.setItem("cityImage", result);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getImage();
  }, [weatherForecast]);

  const changeCity = async () => {
    if (inputValue === "") {
      dispatch(changeError("emptyEnter"));
      setShowError(true);
    } else if (
      inputValue.toLowerCase() === weatherForecast.city.name.toLowerCase()
    ) {
      dispatch(changeError("alreadyExists"));
      setShowError(true);
    } else {
      dispatch(getWeatherByName(inputValue));
      const newImage = await weatherService.getImageByName(inputValue.trimStart().trimEnd());
      setTownImage(newImage);
      localStorage.setItem("cityImage", newImage);
      setShowError(false);
      setInputValue("");
    }
  };

  const changeCityByEnter = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    changeCity();
  };

  const inputClass = showError
    ? "town-weather__input town-weather__input-error"
    : "town-weather__input";

  return (
    <Town>
      {/* <Outlet /> */}
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <div className="town-weather__container">
            <Flex justify="start">
              <input
                autoFocus="autofocus"
                className={inputClass}
                type="text"
                placeholder="Enter new city name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => changeCityByEnter(e)}
              />
              <button onClick={changeCity}>Change city</button>
            </Flex>
            {showError && <InputError />}

            <h2 className="town-weather__header">
              {weatherForecast.city.name}, {weatherForecast.city.country}
            </h2>
            <Flex justify="space-between" align="start">
              <ShortInfo />
              <Graph />
              <DayForecast />
            </Flex>
          </div>
          <ThreeHourlyForecastList />
          <Flex justify="space-between" align="start">
            <AdditionalInfo />

            <Map />
          </Flex>
        </>
      )}
    </Town>
  );
}

export default memo(TownWeather);
