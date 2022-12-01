import React, { useEffect, useMemo, useState } from "react";
import "./styles/townList.css";
import Flex from "./Flex";
import TownItem from "./TownItem";
import { useDispatch, useSelector } from "react-redux";
import { changeMeasure } from "../store/slices/townSlice";
import weatherService from "../services/weatherService";
import classNames from "classnames";

function TownList() {

  const ENTER_KEY_CODE = 13;
  const townsArr = useMemo(
    () => ["Paris", "Moscow", "Cairo", "Riyadh", "Barcelona"],
    []
  );
  const [townsWeather, setTownsWeather] = useState([]);
  const [addingCity, setAddingCity] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { measure } = useSelector((state) => state.townList);
  let { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    townsArr.forEach(async (town) => {
      console.log(town);
      try {
        const result = await weatherService.getTownWeatherByName(town);
        setTownsWeather((townsWeather) => [...townsWeather, result]);
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
    try {
      const result = await weatherService.getTownWeatherByName(inputValue);
      console.log(result);
      setTownsWeather([...townsWeather, result]);
      setAddingCity(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewCityByEnter = async (e) => {
    if (e.keyCode !== ENTER_KEY_CODE) return;
    try {
      const result = await weatherService.getTownWeatherByName(inputValue);
      console.log(result);
      setTownsWeather([...townsWeather, result]);
      setAddingCity(false);
    } catch (err) {
      console.log(err);
    }
  };

  const classTownListHeader = classNames("town-list__header", {
    "town-list__header_dark": (theme = "dark"),
  });

  return (
    <aside className="town-list">
      <h2 className={classTownListHeader}>Today in the world</h2>
      <Flex direction="column" className="town-list__body">
        {townsWeather.length ? (
          townsWeather.map((town) => (
            <TownItem
              key={town.city.id}
              town={town}
              deleteTown={deleteTown}
            ></TownItem>
          ))
        ) : (
          <div>Loading...</div>
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
        <Flex>
          <input
            type="text"
            placeholder="Enter the city"
            className="town-list__input"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => addNewCityByEnter(e)}
          />
          <button className="town-list__add-city-btn" onClick={addNewCity}>
            Add
          </button>
        </Flex>
      )}
    </aside>
  );
}

export default TownList;
