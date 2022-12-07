import React from "react";
import styled from "styled-components";
import Flex from "../Flex";

const Spinner = styled.div`
  position: absolute;
  top: 250px;
  width: 15.7px;
  height: 15.7px;
  div {
    width: 100%;
    height: 100%;
    background-color: #474bff;
    border-radius: 50%;
    animation: spinner-4t3wzl 1.25s infinite backwards;
  }

  div:nth-child(1) {
    animation-delay: 0.15s;
    background-color: rgba(71, 75, 255, 0.9);
  }

  div:nth-child(2) {
    animation-delay: 0.3s;
    background-color: rgba(71, 75, 255, 0.8);
  }

  div:nth-child(3) {
    animation-delay: 0.45s;
    background-color: rgba(71, 75, 255, 0.7);
  }

  div:nth-child(4) {
    animation-delay: 0.6s;
    background-color: rgba(71, 75, 255, 0.6);
  }

  div:nth-child(5) {
    animation-delay: 0.75s;
    background-color: rgba(71, 75, 255, 0.5);
  }

  @keyframes spinner-4t3wzl {
    0% {
      transform: rotate(0deg) translateY(-200%);
    }

    60%,
    100% {
      transform: rotate(360deg) translateY(-200%);
    }
  }
`;

function MainLoader() {
  return (
    <Flex>
      <Spinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Spinner>
    </Flex>
  );
}

export default MainLoader;
