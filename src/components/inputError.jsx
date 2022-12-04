import React from "react";
import styled from "styled-components";

const TownsInputError = styled.div`
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: red;
`;

function inputError() {
  return <TownsInputError>Such a city already exists</TownsInputError>;
}

export default inputError;
