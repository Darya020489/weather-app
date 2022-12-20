import styled from "styled-components";
import React from "react";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  margin: ${({ margin }) => margin || ""};
  padding: ${({ padding }) => padding || ""};
  background-color: ${({ background }) => background || ""};
  border: ${({ border }) => border || ""};
`;

function Flex(props) {
  return <FlexContainer {...props}>{props.children}</FlexContainer>;
}

export default Flex;
