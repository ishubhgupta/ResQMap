import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Define a custom marker icon using Boxicons
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/boxicons@2.1.4/svg/solid/bxs-map.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// HeatLayer Component
const HeatLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(data, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

// Main MapComponent
const MapComponent = ({ latitude, longitude, heatmapData }) => {
  const [position, setPosition] = useState([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <MapContainer
        center={position}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatLayer data={heatmapData} />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Location: ({latitude}, {longitude})
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
