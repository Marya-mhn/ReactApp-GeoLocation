import "./App.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState, mapRef } from "react";
import React from "react";
import { render } from "@testing-library/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import cities from "./cities.json";

const icon = L.icon({
  iconUrl:
    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      console.log(e);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// function LocationMarker() {
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     const map = mapRef.current;
//     map.locate();
//   }, []);

//   const map = useMapEvents({
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//       console.log(e);
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position} icon={icon}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }
render(
  <MapContainer
    center={{ lat: 36.752887, lng: 3.042048 }}
    zoom={13}
    scrollWheelZoom={false}
    whenCreated={(mapInstance) => {
      mapRef.current = mapInstance;
    }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {cities.map((city, idx) => (
      <Marker position={[city.lat, city.lng]} icon={icon} key={idx}></Marker>
    ))}
    <LocationMarker />
  </MapContainer>
);
export default LocationMarker;
