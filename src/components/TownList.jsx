import React, { useEffect, useMemo, useState, memo } from "react";
import styled from "styled-components";
import Flex from "./Flex";
import TownItem from "./TownItem";
import InputError from "./errors/InputError";
import { useDispatch, useSelector } from "react-redux";
import { changeError } from "../store/slices/errorsSlice";
import { changeMeasure } from "../store/slices/indicatorsSlice";
import weatherService from "../services/weatherService";
import classNames from "classnames";
import AsideLoader from "./loaders/AsideLoader";
import checkMarkIcon from "../assets/images/check-mark-icon.svg";
import Input from "./Input";

const CityList = styled.div`
  .town-list__header {
    margin: 10px 0;
    font-size: 16px;
  }

  .town-list__header_dark {
    color: white;
    background-color: black;
  }

  .town-list__adding-btn {
    margin-right: 20px;
    padding: 5px;
    white-space: nowrap;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: rgb(55, 131, 221);
    /* @media(max-width: 768px){
      background-color: red;
          } */
    &:hover {
      background-color: rgb(91, 148, 217);
    }
    &:active {
      background-color: rgb(26, 112, 217);
    }
  }

  .town-list__input {
    margin-right: 10px;
    padding: 3px;
    max-width: 130px;
    outline: none;
    border-radius: 5px;
    border: 1px solid black;

    &-error {
      border-color: red;
    }
  }

  .town-list__add-city-btn {
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: rgb(55, 130, 220);
    &:hover {
      background-color: rgb(91, 148, 217);
    }
    &:active {
      background-color: rgb(26, 112, 217);
    }
  }

  .checkbox {
    margin-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .checkbox__element {
    margin-right: 10px;
    margin-left: 5px;
    width: 0;
    height: 0;
    visibility: hidden;
    opacity: 0;
  }

  .checkbox__element:checked ~ .checkbox__decorate::after {
    display: block;
  }

  .checkbox__decorate {
    position: absolute;
    top: 0;
    left: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgb(55, 130, 221);
  }

  .checkbox__decorate::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 20px;
    height: 20px;
    background-image: url(${checkMarkIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

function TownList() {
  const ENTER_KEY_CODE = 13;
  const [townsWeather, setTownsWeather] = useState([]);
  const [addingCity, setAddingCity] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [townOptions, setTownOptions] = useState([]);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const measure = useSelector((state) => state.indicators.measure);
  let theme = useSelector((state) => state.theme.theme);

  const townsArr = useMemo(() => ["Paris", "Moscow", "Cairo"], []);
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
    const currentList = JSON.parse(localStorage.getItem("cityList"));
    if (currentList && currentList.length) {
      setTownsWeather(currentList);
    } else {
      townsArr.forEach(async (town) => {
        console.log(town);
        try {
          const result = await weatherService.getByName(town);
          setTownsWeather((townsWeather) => [...townsWeather, result]);
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }, [townsArr]);

  const deleteTown = (id) => {
    setTownsWeather(townsWeather.filter((town) => town.city.id !== id));
  };

  const showAddingInput = () => {
    setAddingCity(true);
  };

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

  const addNewCity = async () => {
    let townInList = townsWeather.find(
      (town) => town.city.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (townInList) {
      dispatch(changeError("alreadyExists"));
      setShowError(true);
    } else if (inputValue.trim() === "") {
      dispatch(changeError("emptyEnter"));
      setShowError(true);
    } else {
      try {
        const result = await weatherService.getByName(inputValue);
        setTownsWeather([...townsWeather, result]);
        setShowError(false);
        setAddingCity(false);
        setInputValue("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addNewCityByEnter = async (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    addNewCity();
    setTownOptions([]);
  };

  useEffect(() => {
    localStorage.setItem("cityList", JSON.stringify(townsWeather));
  }, [townsWeather]);

  const classTownListHeader = classNames("town-list__header", {
    "town-list__header_dark": theme === "dark",
  });

  return (
    <CityList className="town-list">
      <h2 className={classTownListHeader}>Today</h2>
      <Flex direction="column" className="town-list__body">
        {!!townsWeather.length ? (
          townsWeather.map((town) => (
            <TownItem
              key={town.city.id}
              town={town}
              deleteTown={deleteTown}
            ></TownItem>
          ))
        ) : (
          <AsideLoader />
        )}
      </Flex>
      <Flex margin="0 0 10px 0">
        {!addingCity && (
          <button className="town-list__adding-btn" onClick={showAddingInput}>
            + Add city
          </button>
        )}
        <label htmlFor="C" className="checkbox">
          °C
          <input
            className="checkbox__element"
            type="radio"
            value="°C"
            name="measure"
            checked={measure === "°C"}
            id="C"
            onChange={(e) => dispatch(changeMeasure(e.target.value))}
          />
          <span className="checkbox__decorate"></span>
        </label>

        <label htmlFor="F" className="checkbox">
          °F
          <input
            className="checkbox__element"
            type="radio"
            value="°F"
            name="measure"
            checked={measure === "°F"}
            id="F"
            onChange={(e) => dispatch(changeMeasure(e.target.value))}
          />
          <span className="checkbox__decorate"></span>
        </label>
      </Flex>
      {addingCity && (
        <Flex justify="space-around">
          <Input
            value={inputValue}
            townOptions={townOptions}
            handleChange={handleChange}
            changeByEnter={addNewCityByEnter}
            showError={showError}
            width="90%"
          />
          <button className="town-list__add-city-btn" onClick={addNewCity}>
            Add
          </button>
        </Flex>
      )}
      {showError && <InputError />}
    </CityList>
  );
}

export default memo(TownList);
