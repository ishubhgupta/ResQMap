import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Define a custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Use a valid icon URL
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// HeatLayer Component
const HeatLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    // Add heat map layer
    const heatLayer = L.heatLayer(data, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });

    heatLayer.addTo(map);

    // Cleanup on unmount
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
      <MapContainer center={position} zoom={5} style={{ height: "100%", width: "100%" }}>
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

// PropTypes for validation
MapComponent.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  heatmapData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

HeatLayer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default MapComponent;
