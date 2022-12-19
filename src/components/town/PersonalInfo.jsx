import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import hot from "../../assets/images/personalInfo/hot.svg";
import sun from "../../assets/images/personalInfo/sun.svg";
import cold from "../../assets/images/personalInfo/cold.svg";
import foggy from "../../assets/images/personalInfo/foggy.svg";
import umbrella from "../../assets/images/personalInfo/umbrella.svg";
import Flex from "../Flex";

const PersonalInfoContainer = styled.div`
padding: 10px;
  border-radius: 10px;
  background-color: #b2afaf;

  .personal-info__img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .personal-info__text {
    font-size: 14px;
  }
`;

function PersonalInfo({ temp, visibility, main }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const name = useSelector(
    (state) => state.townWeather.weatherForecast.city.name
  );

  useEffect(() => {
    if (temp >= 30) {
      setText(
        `A red danger level was declared in ${name}. Stay in the shadows.`
      );
      setImage(hot);
    } else if (temp > 14 && main === "Clear") {
      setText(
        `The weather is great in ${name}. We advise you to go for a walk.`
      );
      setImage(sun);
    } else if (temp < -10) {
      setText(`It's very cold in ${name} right now. Dress warmly.`);
      setImage(cold);
    } else if (visibility < 2000) {
      setText(`There is a heavy fog in ${name}. Be careful driving.`);
      setImage(foggy);
    } else if (main === "Rain") {
      setText(`It's raining in ${name}. Don't forget to bring an umbrella.`);
      setImage(umbrella);
    }
  }, [temp, visibility, main]);

  return (
    <PersonalInfoContainer>
      <Flex>
      <img className="personal-info__img" src={image} alt="" />
      <p className="personal-info__text">{text}</p>
      </Flex>
    </PersonalInfoContainer>
  );
}

export default PersonalInfo;
