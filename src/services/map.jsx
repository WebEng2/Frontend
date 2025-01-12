import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const Map = ({ lat, lng, onMarkerMove, generateRouteTrigger,resetGenerateRouteTrigger, currentLat, currentLng }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentPosMarker, setCurrentPosMarker] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([lat, lng], 6); 

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add a marker at the current position
    const initialCurrentPosMarker = L.marker([currentLat, currentLng], {
      draggable: false,
      //naming the marker
      title: "Current Position"
    }).addTo(map);
    setCurrentPosMarker(initialCurrentPosMarker);

    // Add a marker at the initial position
    const initialMarker = L.marker([lat, lng], {
      draggable: false,
    }).addTo(map);
    setMarker(initialMarker);

    setMap(map);
    map.setView([lat, lng], map.getZoom()); // Recenter map

    // Return cleanup function to remove map on component unmount
    return () => {
      map.remove();
    };
  }, []);  // Empty dependency array to initialize map only once

  // Update the marker position whenever lat or lon changes
  useEffect(() => {
    if (map && marker) {
      marker.setLatLng([lat, lng]); // Update marker position
      map.setView([lat, lng], map.getZoom()); // Recenter map
    }
  }, [lat, lng, map, marker]);  // Trigger update when lat or lon changes

  // Update the current position marker whenever currentLat or currentLng changes
  useEffect(() => {
    if (map && currentPosMarker) {
      currentPosMarker.setLatLng([currentLat, currentLng]); // Update marker position
      map.setView([currentLat, currentLng], map.getZoom()); // Recenter map
    }
  }, [currentLat, currentLng, map, currentPosMarker]);  // Trigger update when currentLat or currentLng changes

  // Handle map click to update marker position and pass new lat/lon to HomePage
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (marker) {
      marker.setLatLng([lat, lng]); // Update marker position
      map.setView([lat, lng], map.getZoom()); // Recenter map
      
      // delete previous route
      if(route !== null){
        map.removeControl(route);
      }

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

  //Routing from current(default: DHBW FN) Position to Marker
  useEffect(() => {
    if(map && marker && currentPosMarker && generateRouteTrigger === true ){
      // delete previous route
      if(route !== null){
          map.removeControl(route);
      }

      // generate new route
      const markerLat = marker.getLatLng().lat;
      const markerLng = marker.getLatLng().lng;

      const currentLat = currentPosMarker.getLatLng().lat;
      const currentLng = currentPosMarker.getLatLng().lng;

      const newRoute =
      L.Routing.control({
        waypoints: [
          L.latLng(currentLat, currentLng),
          L.latLng(markerLat, markerLng)
        ],
        
        lineOptions: {
          
        },
        addWaypoints: true,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: true
      });

      //add new route to map
      setRoute(newRoute);
      newRoute.addTo(map);

      resetGenerateRouteTrigger();
    }
}, [generateRouteTrigger, map, marker, currentPosMarker, route, resetGenerateRouteTrigger]);

  // Return the map container
  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default Map;
