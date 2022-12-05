import React, { useEffect } from "react";
import { useState } from "react";
import { DateTime } from "luxon";
import Flex from "./Flex";
import styled from "@emotion/styled";

function TimeContainer() {
  const [time, setTime] = useState(
    DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const date = DateTime.now().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

  const DateDisplay = styled.div`
    margin-right: ${({ margin }) => margin || ""};
    font-weight: 700;
    color: #13136b;
  `;

  return (
    <Flex>
      <DateDisplay margin="30px">{time}</DateDisplay>
      <DateDisplay>{date}</DateDisplay>
    </Flex>
  );
}

export default TimeContainer;
