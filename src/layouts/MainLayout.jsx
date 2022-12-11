import React from "react";
import TownList from "../components/TownList";
import Flex from "../components/Flex";
import CustomizedSwitches from "../components/SwitcherTheme";
import { changeTheme } from "../store/slices/themeSlice";
import TownWeatherWrap from "../components/TownWeatherWrap";
import { useDispatch} from "react-redux";
import DateContainer from "../components/DateContainer";
import logo from "../assets/images/logo.png";
import styled from "styled-components";

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
  const switchTheme = () => {
    dispatch(changeTheme());
  };

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
        justify="space-between"
        padding="0 15px 0 15px"
        background="mistyrose"
        border="1px solid rgba(192, 185, 185, 0.829)"
      >
        <CustomizedSwitches switchTheme={switchTheme} />
        <DateContainer />
      </Flex>
      <Flex align="start">
        <TownList></TownList>
        <TownWeatherWrap></TownWeatherWrap>
      </Flex>
    </MainContainer>
  );
}

export default MainLayout;
