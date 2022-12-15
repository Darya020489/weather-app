import React from "react";
import { useSelector } from "react-redux";
// import styled from 'styled-components';
import styled from "@emotion/styled";
import Flex from "../Flex";
import { getTemperature } from "../../functions/getTemperature";
import day from "../../assets/images/additionalInfoIcons/day.svg";
import night from "../../assets/images/additionalInfoIcons/night.svg";
import wind from "../../assets/images/additionalInfoIcons/wind.svg";
import clouds from "../../assets/images/additionalInfoIcons/clouds.svg";
import humidity from "../../assets/images/additionalInfoIcons/humidity.svg";
import visibility from "../../assets/images/additionalInfoIcons/visibility.svg";
import themeStyles from "../../themeStyles/themeStyles";

function AdditionalInfo() {
  const theme = useSelector((state) => state.theme.theme);
  const styles =
    theme === "dark" ? themeStyles.darkStyles : themeStyles.lightStyles;

  const MoreInfo = styled.div`
  background: ${styles.background};
    h4 {
      margin-top: 10px;
      text-align: left;
    }
    img {
      width: 30px;
      height: 30px;
    }
    .more-info__param {
      font-size: 14px;
    }
    .more-info__value {
      font-size: 14px;
      font-weight: 500;
      color: rgb(55, 130, 220);
    }
  `;




  const info = useSelector(
    (state) => state.townWeather.weatherForecast.list[0]
  );

  const measure = useSelector((state) => state.indicators.measure);
  const temperatureMax = getTemperature(info.main.temp_max, measure);
  const temperatureMin = getTemperature(info.main.temp_min, measure);

  const degValue = info.wind.deg;
  let degWind = "";
  if (degValue >= 0 && degValue < 10) {
    degWind = "North";
  } else if (degValue >= 10 && degValue < 80) {
    degWind = "North-east";
  } else if (degValue >= 80 && degValue < 100) {
    degWind = "East";
  } else if (degValue >= 100 && degValue < 170) {
    degWind = "South-East";
  } else if (degValue >= 170 && degValue < 190) {
    degWind = "South";
  } else if (degValue >= 190 && degValue < 260) {
    degWind = "South-West";
  } else if (degValue >= 260 && degValue < 280) {
    degWind = "West";
  } else if (degValue >= 280 && degValue < 350) {
    degWind = "North-west";
  } else {
    degWind = "North";
  }

  return (
    <MoreInfo>
      <h4>More info</h4>
      <Flex justify="space-between" align="start">
        <Flex direction="column" margin="10px">
          <p className="more-info__param">Day</p>
          <img src={day} alt="" />
          <p className="more-info__value">
            {temperatureMax}
            {measure}
          </p>
        </Flex>
        <Flex direction="column" margin="10px">
          <p className="more-info__param">Night</p>
          <img src={night} alt="" />
          <p className="more-info__value">
            {temperatureMin}
            {measure}
          </p>
        </Flex>
        <Flex direction="column" margin="10px">
          <p className="more-info__param">Wind</p>
          <img src={wind} alt="" />
          <p className="more-info__value">
            {info.wind.speed}m/s,
            <br />
            {degWind}
          </p>
        </Flex>
      </Flex>
      <Flex justify="space-between" align="start">
        <Flex direction="column" margin="10px">
          <p className="more-info__param">Clouds</p>
          <img src={clouds} alt="" />
          <p className="more-info__value">{info.clouds.all}%</p>
        </Flex>
        <Flex direction="column" margin="10px">
          <p className="more-info__param">Humidity</p>
          <img src={humidity} alt="" />
          <p className="more-info__value">{info.main.humidity}%</p>
        </Flex>
        <Flex direction="column" margin="10px">
          <p className="more-info__param">Visibility</p>
          <img src={visibility} alt="" />
          <p className="more-info__value">{info.visibility}m</p>
        </Flex>
      </Flex>
    </MoreInfo>
  );
}

export default AdditionalInfo;
