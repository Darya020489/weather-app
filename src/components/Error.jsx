import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import errorImg from "../assets/images/error-404-not-found.jpg";

const ErrorWrap = styled.div`
  position: absolute;
  top: 43%;
  right: 0;
  width: 32%;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
  animation: bounce-in-top 1.5s both;

  .error__img {
    width: 100%;
    height: 100%;
  }

  .error__desc {
    padding: 5px;
    font-size: 16px;
    color: white;
    background-color: #621048;
  }

  @keyframes bounce-in-top {
    0% {
      transform: translateY(-500px);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    38% {
      transform: translateY(0);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55% {
      transform: translateY(-65px);
      animation-timing-function: ease-in;
    }
    72% {
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
    81% {
      transform: translateY(-28px);
      animation-timing-function: ease-in;
    }
    90% {
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
    95% {
      transform: translateY(-8px);
      animation-timing-function: ease-in;
    }
    100% {
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
  }
`;

function Error() {
  const errorText = useSelector((state) => state.townWeather.error);

  console.log("error");

  return (
    <ErrorWrap>
      <img className="error__img" src={errorImg} alt="" />
      <p className="error__desc">{errorText}</p>
    </ErrorWrap>
  );
}

export default memo(Error);
