import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherByCoord } from "../store/slices/townWeatherSlice";
import "./styles/mainBlock.css";

function MainBlock() {
  const [coord, setCoord] = useState(null);
  const dispatch = useDispatch();
  const { townWeather } = useSelector((state) => state.townWeather);
  const { isLoading } = useSelector((state) => state.townWeather);
  console.log(isLoading);

  useEffect(() => {
    const pos = navigator.geolocation;
    pos.getCurrentPosition((loc) => {
      setCoord({ lat: loc.coords.latitude, lon: loc.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (coord) {
      dispatch(getWeatherByCoord(coord));
    }
  }, [coord, dispatch]);

  return (
    <>
      <section className="mainBlock">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2 className="mainBlock__header">{townWeather.name}</h2>
            <div className="mainBlock__body"></div>
          </>
        )}
      </section>
    </>
  );
}

export default MainBlock;
