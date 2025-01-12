import React, { useEffect, useState } from 'react';
import { Block, List, ListInput } from 'framework7-react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const CurrentLocationMap = ({ lat, lng, onMarkerMove, openPopup }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [inputLat, setInputLat] = useState(lat);
  const [inputLng, setInputLng] = useState(lng);

  useEffect(() => {
    // Initialize the map only once
    const mapInstance = L.map('popup-map', {
      center: [lat, lng],
      zoom: 6,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance);

    // Add a marker
    const initialMarker = L.marker([lat, lng], {
      draggable: true,
    }).addTo(mapInstance);

    // Event listener for marker drag
    initialMarker.on('dragend', (e) => {
      const { lat, lng } = e.target.getLatLng();
      setInputLat(lat);
      setInputLng(lng);
      onMarkerMove(lat, lng);
    });

    // Event listener for map click
    mapInstance.on('click', (e) => {
      const { lat, lng } = e.latlng;
      initialMarker.setLatLng([lat, lng]);
      setInputLat(lat);
      setInputLng(lng);
      onMarkerMove(lat, lng);
    });

    setMap(mapInstance);
    setMarker(initialMarker);

    return () => {
      // Cleanup map on component unmount
      mapInstance.remove();
    };
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (map && marker) {
      // Update marker position and recenter map when lat/lng props change
      marker.setLatLng([lat, lng]);
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map, marker]);

  useEffect(() => {
    if (openPopup && map) {
      // Delay invalidateSize to ensure popup is fully visible
      setTimeout(() => {
        map.invalidateSize();
        map.setView([inputLat, inputLng], map.getZoom());
        console.log('Popup map updated');
      }, 300);
    }
  }, [openPopup, map, inputLat, inputLng]);

  const handleLatChange = (e) => {
    const newLat = parseFloat(e.target.value) || 0;
    setInputLat(newLat);
    if (marker) {
      marker.setLatLng([newLat, inputLng]);
      map.setView([newLat, inputLng], map.getZoom());
      onMarkerMove(newLat, inputLng);
    }
  };

  const handleLngChange = (e) => {
    const newLng = parseFloat(e.target.value) || 0;
    setInputLng(newLng);
    if (marker) {
      marker.setLatLng([inputLat, newLng]);
      map.setView([inputLat, newLng], map.getZoom());
      onMarkerMove(inputLat, newLng);
    }
  };

  return (
    <>
      <Block>
        <div id="popup-map" style={{ width: '100%', height: '400px' }}></div>
      </Block>

      <List strong inset>
        <ListInput
          label="Latitude"
          type="number"
          value={inputLat}
          onChange={handleLatChange}
          placeholder="Enter Latitude"
        />
        <ListInput
          label="Longitude"
          type="number"
          value={inputLng}
          onChange={handleLngChange}
          placeholder="Enter Longitude"
        />
      </List>
    </>
  );
};

export default CurrentLocationMap;