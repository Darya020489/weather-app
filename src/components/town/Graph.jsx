import React, { memo } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getTemperature } from "../../functions/getTemperature";

const WeatherChart = styled.div`
  width: 50%;
  height: 230px;
`;

function Graph() {
  const measure = useSelector((state) => state.indicators.measure);
  const tempList = useSelector((state) =>
    state.townWeather.weatherForecast.list.filter(
      (el, index) => index % 8 === 0
    )
  );

  const dataList = tempList.map((el, index) => {
    return { x: index, y: getTemperature(el.main.temp, measure) };
  });
  console.log("graph");

  return (
    <WeatherChart>
      <VictoryChart height={250}>
        <VictoryAxis label="Days" />
        <VictoryAxis dependentAxis label="Temperature" />
        <VictoryLine
          style={{
            data: { stroke: "rgb(55, 131, 221)", strokeWidth: 5 },
            parent: { border: "1px solid #ccc" },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1500 },
          }}
          data={dataList}
        />
      </VictoryChart>
    </WeatherChart>
  );
}

export default memo(Graph);
