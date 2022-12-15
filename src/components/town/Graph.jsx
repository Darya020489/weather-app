import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getTemperature } from "../../functions/getTemperature";

const GraphWrap = styled.div`
  font-size: 20px;
`;

function Graph() {
  const tempList = useSelector((state) =>
    state.townWeather.weatherForecast.list.map((el) => el.main.temp)
  );

  const dataList = tempList.map((temp, index) => {
    return { x: index + 1, y: getTemperature(temp, "°C"), fill: "red" };
  });
  console.log(dataList);

  return (
    <GraphWrap>
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
    </GraphWrap>
  );
}

export default Graph;
