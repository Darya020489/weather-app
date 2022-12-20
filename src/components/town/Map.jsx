import React, { memo } from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
// import './MapObject.css';
// import MapObject from './MapObject';
// import "leaf/distance/leaf.css";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "../../store/slices/townWeatherSlice";
import {
  getWeatherByCoord
} from "../../store/slices/townWeatherSlice";
import Flex from "../Flex";
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import "leaflet-defaulticon-compatibility";

const MapWrap = styled.div`
  background-color: #c9c4c4;
  .map__display {
    margin-right: 20px;
    font-weight: 500;
    color: rgb(21, 21, 127);
  }

  .map__btn {
  }
`;

function Map() {
  const dispatch = useDispatch();
  const actualPosition = useSelector((state) => state.townWeather.coordinates);
  // const weatherForecast = useSelector((state) => state.townWeather.weatherForecast);
  // const [markerPosition, setMarkerPosition] = useState(false);
  // const marker = marker.current;
  console.log(actualPosition);

  // const changeMarkerPosition = (pos) => {
  //   setMarkerPosition(pos);
  // };

  //   useEffect(() => {
  // console.log(markerPosition);
  //   }, [markerPosition]);

  console.log("map");
  const center = actualPosition ?? [53.9, 27.5667];
  const zoom = 7;
  // dispatch(setMapLatLng('aaa'));
  // function DisplayPosition({ map }) {
  // //   map.on('draw:created', function (e) {
  // //     var type = e.layerType,
  // //         layer = e.layer;

  // //     map.addLayer(layer);

  // //     if (type === 'marker') {
  // //         layer.bindPopup('LatLng: ' + layer.getLatLng()).openPopup();
  // //     }

  // // });


  const changeMainCity = () => {
dispatch(getWeatherByCoord(actualPosition));
  };
  //   //?????????????????????????????????????
  //   const [position, setPosition] = useState(() => map.getCenter())

  //   const onClick = useCallback(() => {
  //     map.setView(center, zoom)
  //   }, [map])

  //   const onMove = useCallback(() => {
  //     setPosition(map.getCenter())
  //   }, [map])
  // //?????????????????????????????????????????
  //   useEffect(() => {
  //     map.on('move', onMove)
  //     return () => {
  //       map.off('move', onMove)
  //     }
  //   }, [map, onMove])

  //   return (
  //     <p>
  //       latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
  //       <button onClick={onClick}>reset</button>
  //     </p>
  //   )
  // }

  function DraggableMarker() {
    //?????????????????????????????????????????????
    // const [Aaa, setAaa] = useState(0);
    // useEffect(() => {
    //   console.log(Aaa);
    //     }, [Aaa]);
    const actualPosition = useSelector((state) => state.townWeather.coordinates);
    // const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(actualPosition ?? center);
    // useEffect(() => {
    //   dispatch(setMapLatLng(position));
    // }, [position]);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
            // changePosition(marker.getLatLng());
            console.log(marker);
            console.log(Math.floor(marker.getLatLng().lat));
            dispatch(
              setCoordinates({
                lat: marker.getLatLng().lat.toFixed(4),
                lon: marker.getLatLng().lng.toFixed(4),
              })
            );
            // setAaa(marker.getLatLng().lat);
            // changePosition(Aaa);
          }
        },
      }),
      []
    );
    // const toggleDraggable = useCallback(() => {
    //   setDraggable((d) => !d);
    // }, []);

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
      >
        {/* <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup> */}
      </Marker>
    );
  }

  // function ExternalStateExample() {
  //   const [map, setMap] = useState(null)

  //   const displayMap = useMemo(
  //     () => (
  return (
    <MapWrap>
      {!!actualPosition && (
        <Flex padding="5px">
          <p className="map__display">
            {/* {`latitude: ${actualPosition.lat},   longitude: ${actualPosition.lon}`} */}
            latitude: {actualPosition.lat}, longitude: {actualPosition.lon}
          </p>
          <button className="map__btn" onClick={changeMainCity}>Change position</button>
        </Flex>
      )}
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker draggable={draggable}
      eventHandlers={eventHandlers} position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 40], iconAnchor: [12, 41]})}>
    <Popup>
    Drag me
    </Popup>
  </Marker> */}
        <DraggableMarker />
      </MapContainer>
    </MapWrap>
  );
  // ),
  //   [],
  // )

  //   return (
  //     <div>
  //       {map ? <DisplayPosition map={map} /> : null}
  //       {displayMap}
  //     </div>
  //   )
  // }

  // return(<ExternalStateExample />)
}

export default memo(Map);
