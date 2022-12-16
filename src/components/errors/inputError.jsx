import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const TownListInputError = styled.div`
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: red;
`;

function InputError() {
  const errorText = useSelector(state => state.errors.inputError);
  console.log(errorText);
  return <TownListInputError>{errorText}</TownListInputError>;
}

export default InputError;
