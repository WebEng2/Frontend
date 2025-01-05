import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

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
      routeToMarker(0,0 , lat, lng);
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

  //Routing from current Position to Marker
  const routeToMarker = (currentLat, currentLong, markerLat, markerLong) => {
    currentLat = 52.852977995061174;
    currentLong = 11.153569221496584;

    // delete previous route
    if(map){
      map.eachLayer((layer) => {
        //delete Markers
        if(layer.getLatLng){
          map.removeLayer(layer);
        }

        //delete Routing
        if(layer.options && layer.options.className === "leaflet-routing-container"){
          map.removeLayer(layer);
        }
      });


    // Add route to map

    L.Routing.control({
      waypoints: [
        L.latLng(currentLat, currentLong),
        L.latLng(markerLat, markerLong)
      ]
    }).addTo(map);

    console.log(map);

  }
  }

  // Return the map container
  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default Map;
