import React, { memo } from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../../store/slices/townWeatherSlice";
import { getWeatherByCoord } from "../../store/slices/townWeatherSlice";
import Flex from "../Flex";

const MapWrap = styled.div`
  background-color: #c9c4c4;
  border-radius: 20px;
  overflow: hidden;

  .map__btn {
    margin-left: 30px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: rgb(55, 130, 220);

    &:hover {
      background-color: rgb(91, 148, 217);
    }

    &:active {
      background-color: rgb(26, 112, 217);
    }
  }
`;

function Map() {
  const dispatch = useDispatch();
  const actualPosition = useSelector((state) => state.townWeather.coordinates);

  const [center, setCenter] = useState(actualPosition ?? [53.9, 27.5667]);
  const zoom = 7;

  useEffect(() => {
    if (actualPosition) {
      setCenter(actualPosition);
      console.log(actualPosition);
    }
  }, [actualPosition]);

  useEffect(() => {
    console.log(center);
  }, [center]);

  const changeMainCity = () => {
    dispatch(getWeatherByCoord(actualPosition));
  };

  function DraggableMarker() {
    const map = useMap();
    const actualPosition = useSelector(
      (state) => state.townWeather.coordinates
    );
    const [position, setPosition] = useState(actualPosition ?? center);
    const markerRef = useRef(null);

    useEffect(() => {
      console.log(position);
      map.flyTo(position, map.getZoom());
    }, [position, map]);

    const eventHandlers = useMemo(
      () => ({
        dragend(e) {
          const marker = markerRef.current;
          if (marker != null) {
            dispatch(
              setCoordinates({
                lat: marker.getLatLng().lat.toFixed(4),
                lon: marker.getLatLng().lng.toFixed(4),
              })
            );
          }
        },
      }),
      []
    );

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 40],
            iconAnchor: [12, 41],
          })
        }
      ></Marker>
    );
  }

  return (
    <MapWrap>
      <Flex justify="start" padding="5px">
        <button className="map__btn" onClick={changeMainCity}>
          Change position
        </button>
      </Flex>

      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
      </MapContainer>
    </MapWrap>
  );
}

export default memo(Map);
