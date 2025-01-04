import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const Map = ({ lat, lon, onMarkerMove }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([lat, lon], 6); 

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add a marker at the initial position
    const initialMarker = L.marker([lat, lon], {
      draggable: false,
    }).addTo(map);
    setMap(map);
    setMarker(initialMarker);

    // Return cleanup function to remove map on component unmount
    return () => {
      map.remove();
    };
  }, []);  // Empty dependency array to initialize map only once

  // Update the marker position whenever lat or lon changes
  useEffect(() => {
    if (map && marker) {
      marker.setLatLng([lat, lon]); // Update marker position
      map.setView([lat, lon], map.getZoom()); // Recenter map
    }
  }, [lat, lon, map, marker]);  // Trigger update when lat or lon changes

  // Handle map click to update marker position and pass new lat/lon to HomePage
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (marker) {
      marker.setLatLng([lat, lng]); // Update marker position
      map.setView([lat, lng], map.getZoom()); // Recenter map
      // Call onMarkerMove prop to update lat/lon in HomePage
      onMarkerMove(lat, lng);
    }
  };

  // Event listener for map clicks
  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick);
    }

    // Cleanup the event listeners on component unmount
    return () => {
      if (map) {
        map.off('click', handleMapClick);
      }
    };
  }, [map, marker, onMarkerMove]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default Map;
