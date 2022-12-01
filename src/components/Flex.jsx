import styled from "styled-components";
import React from "react";

const FlexContainer = styled.div`
  display: flex;
  /* margin: 20px 0px; */
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
`;

function Flex(props) {
  return <FlexContainer {...props}>{props.children}</FlexContainer>;
}

export default Flex;
