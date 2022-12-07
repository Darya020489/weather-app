import React from "react";
import styled from "styled-components";

const AsideSpinner = styled.div`
  margin: 30px;
  width: 44.8px;
  height: 44.8px;
  animation: spinner-y0fdc1 2s infinite ease;
  transform-style: preserve-3d;

  div {
    background-color: rgba(92, 94, 239, 0.2);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 2.2px solid rgb(11, 70, 219);
  }

  div:nth-of-type(1) {
    transform: translateZ(-22.4px) rotateY(180deg);
  }

  div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }

  div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }

  div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }

  div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }

  div:nth-of-type(6) {
    transform: translateZ(22.4px);
  }

  @keyframes spinner-y0fdc1 {
    0% {
      transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }

    50% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }

    100% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
  }
`;

function AsideLoader() {
  return (
    <AsideSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </AsideSpinner>
  );
}

export default AsideLoader;
