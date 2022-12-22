import React, { useMemo, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherForecast } from "../store/slices/townWeatherSlice";
import { changeError } from "../store/slices/errorsSlice";
import {
  getWeatherByCoord,
  getWeatherByName,
  getTownImage,
  setIsError,
} from "../store/slices/townWeatherSlice";
import styled from "@emotion/styled";
import MainLoader from "./loaders/MainLoader";
import Flex from "./Flex";
import ShortInfo from "./town/ShortInfo";
import InputError from "./errors/InputError";
import DayForecast from "./town/DaysForecastList";
import ThreeHourlyForecastList from "./town/ThreeHourlyForecastList";
import AdditionalInfo from "./town/AdditionalInfo";
import Graph from "./town/Graph";
import PersonalInfo from "./town/PersonalInfo";
import Error from "./Error";
import Input from "./Input";

function TownWeather() {
  const townImage = useSelector(
    (state) => localStorage.getItem("cityImage") ?? state.townWeather.townImage
  );

  const Town = useMemo(() => {
    return styled.div`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: start;

      .loader-container {
        position: relative;
        width: 100%;
        height: 190px;
      }

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

      button {
        margin-left: 20px;
        padding: 5px;
        border: none;
        border-radius: 5px;
        color: white;
        background-color: rgb(55, 130, 220);

        &:hover {
          background-color: rgb(91, 148, 217);
        }

        &:active {
          background-color: rgb(26, 112, 217);
        }
      }
    `;
  }, [townImage]);

  const ENTER_KEY_CODE = 13;
  const [coord, setCoord] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [townOptions, setTownOptions] = useState([]);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [temp, setTemp] = useState("");
  const [visibility, setVisibility] = useState("");
  const [main, setMain] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.townWeather.isLoading);
  const isError = useSelector((state) => state.townWeather.isError);

  const optionList = useMemo(
    () => [
      "Amsterdam",
      "Berlin",
      "Dublin",
      "Helsinki",
      "Kyiv",
      "Lisbon",
      "Madrid",
      "Oslo",
      "Prague",
      "Riga",
      "Sofia",
      "Stockholm",
      "Tallinn",
      "Vienna",
      "Vilnius",
      "Warsaw",
      "Tbilisi",
      "Rome",
      "Paris",
      "Moscow",
      "Cairo",
      "Minsk",
      "Milan",
      "London",
    ],
    []
  );

  useEffect(() => {
    if (isError === true) {
      setTimeout(() => {
        dispatch(setIsError(false));
      }, 5000);
    }
  }, [isError]);

  const weatherForecast = useSelector(
    (state) => state.townWeather.weatherForecast
  );

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

  const handleChange = (value, clear) => {
    setInputValue(value);
    if (value.length >= 2) {
      const result = optionList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setTownOptions(result);
    } else {
      setTownOptions([]);
    }
    if (clear) {
      setTownOptions([]);
    }
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

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
      dispatch(getTownImage(inputValue.trimStart().trimEnd().toLowerCase()));

      setShowError(false);
      setInputValue("");
    }
  };

  const changeCityByEnter = (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    changeCity();
    setTownOptions([]);
  };

  useEffect(() => {
    if (weatherForecast) {
      setTemp(weatherForecast.list[0].main.temp - 273.15);
      setVisibility(weatherForecast.list[0].visibility);
      setMain(weatherForecast.list[0].weather[0].main);
    }
  }, [weatherForecast]);

  useEffect(() => {
    if (temp && visibility && main) {
      if (
        (temp > 14 && main === "Clear") ||
        temp >= 30 ||
        temp < -10 ||
        visibility < 2000 ||
        main === "Rain"
      ) {
        setShowPersonalInfo(true);
      } else {
        setShowPersonalInfo(false);
      }
    }
  }, [temp, visibility, main]);

  return (
    <Town>
      {isLoading ? (
        <div className="loader-container">
          <MainLoader />
        </div>
      ) : (
        <>
          <div className="town-weather__container">
            <Flex justify="start">
              <Input
                value={inputValue}
                townOptions={townOptions}
                handleChange={handleChange}
                changeByEnter={changeCityByEnter}
                showError={showError}
              />
              <button onClick={changeCity}>Change city</button>
            </Flex>
            {showError && <InputError />}
            <Flex justify="space-around" align="start">
              <ShortInfo />
              <Flex direction="column">
                <DayForecast />
                {showPersonalInfo && (
                  <PersonalInfo
                    temp={temp}
                    visibility={visibility}
                    main={main}
                  />
                )}
              </Flex>
            </Flex>
          </div>
          <ThreeHourlyForecastList />
          <Flex justify="space-around" align="start">
            <AdditionalInfo />
            <Graph />
          </Flex>
        </>
      )}
      {isError && <Error />}
    </Town>
  );
}

export default memo(TownWeather);
