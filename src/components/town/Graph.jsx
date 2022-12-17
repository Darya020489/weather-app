import React, {useMemo, memo} from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import { useSelector } from "react-redux";
import { getTemperature } from "../../functions/getTemperature";

function Graph() {
  const tempList = useSelector((state) =>
  state.townWeather.weatherForecast.list.filter((el, index) => index % 8 === 0
  )
);

  const dataList = tempList.map((el, index) => {
    return { x: index, y: getTemperature(el.main.temp, "°C") };
  });
  console.log('graph');

  return (
    <>
      <VictoryChart height={250}>
        {/* <VictoryLabel text="Temperature" x={50} y={210} textAnchor="middle"/>
      <VictoryLabel text="Days" x={420} y={50} textAnchor="middle"/> */}

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
    </>
  );
}

export default memo(Graph);
