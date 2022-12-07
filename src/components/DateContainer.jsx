import React, { useEffect } from "react";
import { useState } from "react";
import { DateTime } from "luxon";
import Flex from "./Flex";
import styled from "@emotion/styled";
// import styled from "styled-components";
import clock from "../img/clock.svg";

function DateContainer() {
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

  const TimeDisplay = styled.div`
    margin-right: 30px;
    font-family: lcdnova;
    font-weight: 700;
    color: #13136b;
  `;

  const DateDisplay = styled.div`
    font-weight: 700;
    letter-spacing: -1px;
    color: #13136b;
  `;

  return (
    <Flex>
      <img style={{ width: "30px" }} src={clock} alt="clock" />
      <TimeDisplay>{time}</TimeDisplay>
      <DateDisplay>{date}</DateDisplay>
    </Flex>
  );
}

export default DateContainer;
