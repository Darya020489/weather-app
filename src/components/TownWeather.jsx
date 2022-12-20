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
import { setMapLatLng } from "../store/slices/positionSlice";
import weatherService from "../services/weatherService";
import styled from "@emotion/styled";
import MainLoader from "./loaders/MainLoader";
import Flex from "./Flex";
import ShortInfo from "./town/ShortInfo";
import InputError from "./errors/InputError";
import Map from "./town/Map";
import DayForecast from "./town/DaysForecastList";
import ThreeHourlyForecastList from "./town/ThreeHourlyForecastList";
import AdditionalInfo from "./town/AdditionalInfo";
import Graph from "./town/Graph";
import PersonalInfo from "./town/PersonalInfo";
// import Ocean from "../components/town/Ocean";

function TownWeather() {
  const [townImage, setTownImage] = useState(
    localStorage.getItem("cityImage") ?? null
  );

  const Town = useMemo(() => {
    return styled.div`
      position: relative;
      padding: 20px;
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: start;

      h2 {
        margin-top: 20px;
        padding-bottom: 15px;
        font-size: 20px;
        text-align: left;
      }

      .town-weather__container {
        padding: 20px;
        background: ${`linear-gradient(
        rgba(255, 255, 255, 0.7) 0%,
        rgba(255, 255, 255, 0.7) 100%
      ),
      url(`}${townImage ??
          "https://narodna-pravda.ua/wp-content/uploads/2019/05/1-739378-XSIHuatR.jpg"}${`)
        center/cover no-repeat`};
        border-radius: 10px;
      }

      .town-weather__input {
        margin-right: 20px;
        padding: 3px;
        outline: none;
        border-radius: 5px;
        border: 1px solid black;

        &-error {
          border-color: red;
        }
      }

      button {
        padding: 5px;
        border: none;
        border-radius: 5px;
        color: white;
        background-color: rgb(55, 130, 220);
      }
    `;
  }, [townImage]);

  const ENTER_KEY_CODE = 13;
  const [coord, setCoord] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [temp, setTemp] = useState("");
  const [visibility, setVisibility] = useState("");
  const [main, setMain] = useState("");




  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.townWeather.isLoading);

  const weatherForecast = useSelector(
    (state) => state.townWeather.weatherForecast
  );

  // const coordinates = useSelector(
  //   (state) => state.position.coordinates
  // );


      // const temp = useSelector(
      //   (state) => state.townWeather.weatherForecast.list[0].main.temp - 273.15);
      // const visibility = useSelector(
      //   (state) => state.townWeather.weatherForecast.list[0].visibility);
      // const main = useSelector(
      //   (state) => state.townWeather.weatherForecast.list[0].weather[0].main);
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
        // console.log(loc.coords.latitude);
   
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

  // useEffect(() => {
  //   const townCoord = weatherForecast.coordinates;
  //     if (Math.round(coordinates.lat) !== Math.round(townCoord.lat) || Math.round(coordinates.lon) !== Math.round(townCoord.lon)) {
  //       dispatch(
  //         setMapLatLng({
  //           lat: townCoord.lat,
  //           lon: townCoord.lon,
  //         })
  //       );
  //     }
  // }, [weatherForecast]);

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
      try {
        const newImage = await weatherService.getImageByName(
          inputValue.trimStart().trimEnd().toLowerCase()
        );
        setTownImage(newImage);
        localStorage.setItem("cityImage", newImage);
        
      } catch (err) {
        console.log(err);
        setTownImage(null);
        localStorage.removeItem("cityImage");
      }
      setShowError(false);
      setInputValue("");
    }
  };

  const changeCityByEnter = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    changeCity();
  };

  useEffect(() => {
    if(weatherForecast){
      setTemp(weatherForecast.list[0].main.temp - 273.15);
      setVisibility(weatherForecast.list[0].visibility);
      setMain(weatherForecast.list[0].weather[0].main);
    }
  },[weatherForecast]);

  useEffect(() => {
    if (temp && visibility && main) {
      if ((temp > 14 && main === "Clear") || temp >= 30 || temp < -10 || visibility < 2000 || main === "Rain") {
        setShowPersonalInfo(true);
        console.log(temp);
      }else{setShowPersonalInfo(false)}
    }
  }, [temp, visibility, main]);

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
            <Flex justify="space-around" align="start">
              <ShortInfo />
              <Flex direction="column">
                <DayForecast />
                {showPersonalInfo && <PersonalInfo temp={temp} visibility={visibility} main={main}/>}
              </Flex>
            </Flex>
          </div>
          <ThreeHourlyForecastList />
          <Flex justify="space-around" align="start">
            <AdditionalInfo />
            <Graph />
          </Flex>
          <Map />
        </>
      )}
      {/* <Ocean /> */}
    </Town>
  );
}

export default memo(TownWeather);
