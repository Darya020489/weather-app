import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Flex from '../Flex';
import day from "../../assets/images/additionalInfoIcons/day.svg";
import night from "../../assets/images/additionalInfoIcons/night.svg";
import wind from "../../assets/images/additionalInfoIcons/wind.svg";
import clouds from "../../assets/images/additionalInfoIcons/clouds.svg";
import humidity from "../../assets/images/additionalInfoIcons/humidity.svg";
import visibility from "../../assets/images/additionalInfoIcons/visibility.svg";

const MoreInfo = styled.div`
h3{
  text-align: left;
}
  img{
    width: 40px;
    height: 40px;
  }
`;

function AdditionalInfo() {
const info = useSelector(state => state.townWeather.weatherForecast.list[0]);


  return (
    <MoreInfo>
      <h3>More info</h3>
      <Flex justify="space-between">
      <Flex direction="column" margin="10px">
        <p>Day</p>
        <img src={day} alt="" />
        <p>{info.main.temp_max}</p>
      </Flex>
      <Flex direction="column" margin="10px">
        <p>Night</p>
        <img src={night} alt="" />
        <p>{info.main.temp_min}</p>
      </Flex>
      <Flex direction="column" margin="10px">
        <p>Wind</p>
        <img src={wind} alt="" />
        <p>{info.wind.speed}</p>
      </Flex>
      </Flex>
      <Flex justify="space-between">
      <Flex direction="column" margin="10px">
        <p>Clouds</p>
        <img src={clouds} alt="" />
        <p>{info.clouds.all}</p>
      </Flex>
      <Flex direction="column" margin="10px">
        <p>Humidity</p>
        <img src={humidity} alt="" />
        <p>{info.main.humidity}</p>
      </Flex>
      <Flex direction="column" margin="10px">
        <p>Visibility</p>
        <img src={visibility} alt="" />
        <p>{info.visibility}</p>
      </Flex>
      </Flex>
      
      
      
      </MoreInfo>
  )
}

export default AdditionalInfo;