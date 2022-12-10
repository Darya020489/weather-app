import React, { useEffect, useMemo, useState, memo } from "react";
import "../assets/styles/townList.css";
import Flex from "./Flex";
import TownItem from "./TownItem";
import InputError from "./errors/inputError";
import { useDispatch, useSelector } from "react-redux";
import { changeMeasure } from "../store/slices/indicatorsSlice";
import weatherService from "../services/weatherService";
import classNames from "classnames";
import AsideLoader from "./loaders/AsideLoader";

function TownList() {
  const ENTER_KEY_CODE = 13;
  const townsArr = useMemo(() => ["Paris", "Moscow", "Cairo"], []);
  const [townsWeather, setTownsWeather] = useState([]);
  const [addingCity, setAddingCity] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const { measure } = useSelector((state) => state.indicators);
  let { theme } = useSelector((state) => state.theme);

  useEffect(() => {
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
  }, [townsArr]);

  const deleteTown = (id) => {
    setTownsWeather(townsWeather.filter((town) => town.city.id !== id));
  };

  const showAddingInput = () => {
    setAddingCity(true);
  };

  const addNewCity = async () => {
    let townInTheList = townsWeather.find(
      (town) => town.city.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (townInTheList) {
      setShowError(true);
    } else {
      try {
        const result = await weatherService.getByName(inputValue);
        setTownsWeather([...townsWeather, result]);
        setShowError(false);
        setAddingCity(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addNewCityByEnter = async (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    let townInList = townsWeather.find(
      (town) => town.city.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (townInList) {
      setShowError(true);
    } else {
      try {
        const result = await weatherService.getByName(inputValue);

        setTownsWeather([...townsWeather, result]);
        setShowError(false);
        setAddingCity(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const inputClass = showError
    ? "town-list__input town-list__input-error"
    : "town-list__input";

  const classTownListHeader = classNames("town-list__header", {
    "town-list__header_dark": theme === "dark",
  });

  return (
    <aside className="town-list">
      <h2 className={classTownListHeader}>Today</h2>
      <Flex direction="column" className="town-list__body">
        {townsWeather.length ? (
          townsWeather.map((town) => (
            <TownItem
              key={town.city.id}
              town={town}
              deleteTown={deleteTown}
              showComponents={true}
            ></TownItem>
          ))
        ) : (
          <AsideLoader />
        )}
      </Flex>
      <Flex>
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
        <Flex margin="20px 0 0">
          <input
            type="text"
            placeholder="Enter the city"
            className={inputClass}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => addNewCityByEnter(e)}
          />
          <button className="town-list__add-city-btn" onClick={addNewCity}>
            Add
          </button>
        </Flex>
      )}
      {showError && <InputError />}
    </aside>
  );
}

export default memo(TownList);
