import React from "react";
import TownWeather from "./TownWeather";
import Flex from "./Flex";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

function TownWeatherWrap() {
  // const { isLoading } = useSelector((state) => state.townWeather);

  // const changeCity = async () => {
  //   let townInTheList = townsWeather.find(
  //     (town) => town.city.name.toLowerCase() === inputValue.toLowerCase()
  //   );
  //   if (townInTheList) {
  //     setShowError(true);
  //   } else {
  //     try {
  //       const result = await weatherService.getByName(inputValue);
  //       setTownsWeather([...townsWeather, result]);
  //       setShowError(false);
  //       setAddingCity(false);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const TownWeatherWrapper = styled.div`
    padding: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;

    input {
      margin-right: 20px;
    }

    button {
      padding: 5px;
      border: none;
      border-radius: 5px;
      color: white;
      background-color: rgb(55, 130, 220);
    }
  `;

  return (
    <TownWeatherWrapper>
      <Flex>
        <input type="text" placeholder="Enter new city name" />
        <button className="">Change city</button>
      </Flex>
      <TownWeather />
    </TownWeatherWrapper>
  );
}

export default TownWeatherWrap;
