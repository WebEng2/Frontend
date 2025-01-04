import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const defaultPosition = [51.1657, 10.4515]; // Center of Germany

const Map = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Initialize the map only once
    const map = L.map('map').setView(defaultPosition, 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add a marker at the default position
    const initialMarker = L.marker(defaultPosition).addTo(map);
    setMap(map);
    setMarker(initialMarker);

    // Return cleanup function to remove map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  // Handle map click to update marker position
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (marker) {
      marker.setLatLng([lat, lng]); // Update marker position
      alert(`Marker placed at: ${lat}, ${lng}`);
    }
  };

  // If map is initialized, add the event listener for map clicks
  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick); // Listen for clicks to move the marker
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (map) {
        map.off('click', handleMapClick);
      }
    };
  }, [map, marker]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default Map;
