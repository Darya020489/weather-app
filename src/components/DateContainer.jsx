import React, { useEffect, memo } from "react";
import { useState } from "react";
import { DateTime } from "luxon";
import moment from "moment";
import Flex from "./Flex";
import styled from "styled-components";
import clock from "../assets/images/clock.svg";

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

  console.log("time");

  const weekday = moment().format("dddd");
  const date = moment().format("ll");

  return (
    <Flex>
      <img style={{ width: "30px" }} src={clock} alt="clock" />
      <TimeDisplay>{time}</TimeDisplay>
      <DateDisplay>
        {weekday}, {date}
      </DateDisplay>
    </Flex>
  );
}

export default memo(DateContainer);
