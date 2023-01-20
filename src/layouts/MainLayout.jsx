import React, { useState, useEffect } from "react";
import TownList from "../components/TownList";
import Flex from "../components/Flex";
import CustomizedSwitches from "../components/SwitcherTheme";
import { changeTheme } from "../store/slices/themeSlice";
import TownWeatherWrap from "../components/TownWeatherWrap";
import { useDispatch, useSelector } from "react-redux";
import DateContainer from "../components/DateContainer";
import logo from "../assets/images/logo.png";
import styled from "styled-components";
import Map from "../components/town/Map";
import { setSize } from "../store/slices/mapSlice";

const MainContainer = styled.section`
  .main__header {
    padding: 10px;
    font-size: 24px;
    text-shadow: 1px 1px 2px grey;
  }

  .main__img {
    width: 45px;
  }
`;

function MainLayout() {
  const dispatch = useDispatch();
  const mapIsSmall = useSelector((store) => store.map.isSmall);
  const [actualSize, setActualSize] = useState(true);

  useEffect(() => {
    const size = JSON.parse(localStorage.getItem("mapSize"));
    if (typeof size === "boolean") {
      dispatch(setSize(size));
      setActualSize(size);
    }
  }, []);

  useEffect(() => {
    setActualSize(mapIsSmall);
  }, [mapIsSmall]);

  // const switchTheme = () => {
  //   dispatch(changeTheme());
  // };

  return (
    <MainContainer>
      <Flex
        background="mistyrose"
        border="1px solid rgba(192, 185, 185, 0.829)"
      >
        <h1 className="main__header">Weather App</h1>
        <img className="main__img" src={logo} alt="weather" />
      </Flex>
      <Flex
        // justify="space-between"
        justify="flex-end"
        padding="0 15px 0 15px"
        background="mistyrose"
        border="1px solid rgba(192, 185, 185, 0.829)"
      >
        {/* <CustomizedSwitches switchTheme={switchTheme} /> */}
        <DateContainer />
      </Flex>
      <Flex align="start">
        <Flex
          direction="column"
          width="20%"
          height="100%"
          padding="0 0 10px 0"
          border="1px solid rgba(144, 141, 141, 0.829)"
        >
          {actualSize && <Map />}
          <TownList />
        </Flex>
        <TownWeatherWrap />
      </Flex>
    </MainContainer>
  );
}

export default MainLayout;
