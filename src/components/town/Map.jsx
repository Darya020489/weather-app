import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import styled from "styled-components";
import classNames from "classnames";
import {
  MapContainer,
  TileLayer,
  Marker,
  ImageOverlay,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../../store/slices/townWeatherSlice";
import { getWeatherByCoord } from "../../store/slices/townWeatherSlice";
import { changeSize } from "../../store/slices/mapSlice";
import Flex from "../Flex";

const MapWrapper = styled.div`
  margin-bottom: 10px;
  background-color: #e6e0e0;
  border-radius: ${({ radius }) => radius || ""};
  overflow: hidden;
  .map__display {
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &_small {
      padding: 5px;
      flex-direction: column;
      align-items: stretch;
    }
  }

  .map__desc {
    margin-left: 10px;
    color: rgb(21, 21, 127);
    font-weight: 500;
    text-align: middle;

    &_small {
      margin-bottom: 5px;
      font-size: 14px;
    }
  }

  .map__change-btn {
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

    &_small {
      margin-left: 0;
      padding: 3px;
      font-size: 12px;
    }
  }
  .map__size-btn {
    margin: 0 10px;
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

    &_small {
      margin: 0;
      padding: 3px;
      font-size: 12px;
    }
  }
`;

function MapWrap(props) {
  return <MapWrapper {...props}>{props.children}</MapWrapper>;
}

function Map() {
  const dispatch = useDispatch();
  const mapIsSmall = useSelector((store) => store.map.isSmall);
  const actualPosition = useSelector((state) => state.townWeather.coordinates);
  const [actualSize, setActualSize] = useState(true);

  useEffect(() => {
    setActualSize(mapIsSmall);
  }, [mapIsSmall]);

  const classMapDesc = classNames("map__desc", {
    map__desc_small: actualSize === true,
  });

  const classChangeTownBtn = classNames("map__change-btn", {
    "map__change-btn_small": actualSize === true,
  });

  const classSizeBtn = classNames("map__size-btn", {
    "map__size-btn_small": actualSize === true,
  });

  const classMapDisplay = classNames("map__display", {
    map__display_small: actualSize === true,
  });

  const borderRadius = actualSize ? "" : "20px";
  const btnText = actualSize ? "Show big map" : "Show small map";

  const [center, setCenter] = useState(actualPosition ?? [53.9, 27.5667]);
  const zoom = 7;

  const [bounds, setBounds] = useState([
    [53.9, 27.5667],
    [53.7, 27.3],
  ]);

  useEffect(() => {
    if (actualPosition) {
      setCenter(actualPosition);
      setBounds([
        [+actualPosition.lat, +actualPosition.lon],
        [actualPosition.lat - 0.2, actualPosition.lon - 0.25],
      ]);
    }
  }, [actualPosition]);

  useEffect(() => {
    console.log(bounds);
  }, [bounds]);

  const [img, setImg] = useState("");
  const town = useSelector((state) => state.townWeather.weatherForecast);
  useEffect(() => {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if(!img.length){
    if (town) {
      setImg(town.list[0].weather[0].icon);
    }
  }
  }, [town]);

  const changeMainCity = () => {
    dispatch(getWeatherByCoord(actualPosition));
  };

  const changeMapSize = () => {
    dispatch(changeSize());
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
    <MapWrap radius={borderRadius}>
      {actualPosition && (
        <div className={classMapDisplay}>
          <p className={classMapDesc}>
            latitude: {actualPosition.lat}, longitude: {actualPosition.lon}
          </p>
          <Flex justify="space-between">
            <button className={classChangeTownBtn} onClick={changeMainCity}>
              Change position
            </button>
            <button className={classSizeBtn} onClick={changeMapSize}>
              {btnText}
            </button>
          </Flex>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        // ref={mapRef}
        // crs={CRS.Simple}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ImageOverlay
          bounds={bounds}
          url={`https://openweathermap.org/img/w/${img}.png`}
        />
        <DraggableMarker />
      </MapContainer>
    </MapWrap>
  );
}

export default memo(Map);
