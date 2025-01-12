import React, { useState } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  Button,
  ListInput,
  Popup,
} from 'framework7-react';
import Map from '../components/map.jsx';
import LocationInfoComponent from '../components/overview.jsx';

const HomePage = () => {
  // State for latitude and longitude
  const [lat, setLat] = useState(47.665597);  // default latitude
  const [lon, setLon] = useState(9.447040);  // default longitude
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // Popup open state

  // Handle input change for latitude
  const handleLatChange = (e) => setLat(e.target.value);
  // Handle input change for longitude
  const handleLonChange = (e) => setLon(e.target.value);

  // Callback to update lat and lon when the marker is moved
  const handleMarkerMove = (newLat, newLon) => {
    setLat(newLat);
    setLon(newLon);
  };

  // Function to fetch and cache data
  const fetchAndCacheData = async () => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&extratags=1`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Reverse Geocoding - Response status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      // Cache the response
      if ('caches' in window) {
        const cache = await caches.open('pwa-cache-v1');
        await cache.put(apiUrl, new Response(JSON.stringify(data)));
        console.log("Data cached successfully");
      }
    } catch (error) {
      console.error("Error fetching and caching data:", error.message);
    }
  };

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
        </NavLeft>
        <NavTitle sliding>Navigation_PWA</NavTitle>
      </Navbar>
      {/* Toolbar */}
      <Toolbar bottom>
        <Link>Left Link</Link>
        <Link>Right Link</Link>
      </Toolbar>
      {/* Page content */}

      <BlockTitle>Enter Coordinates</BlockTitle>
      <Block>
        <List strong inset>
          <ListInput
            label="Latitude"
            type="number"
            value={lat}
            onChange={handleLatChange}
            placeholder="Enter Latitude"
          />
          <ListInput
            label="Longitude"
            type="number"
            value={lon}
            onChange={handleLonChange}
            placeholder="Enter Longitude"
          />
        </List>

        <Block className="grid grid-cols-2 grid-gap">
          <Button fill onClick={() => { setIsPopupOpen(true); fetchAndCacheData(); }}>
            Get Location Info
          </Button>
          <Button fill>
            start Route
          </Button>
        </Block>
      </Block>

      {/* Map */}
      <BlockTitle>Karte</BlockTitle>
      <Block>
        <Map lat={lat} lon={lon} onMarkerMove={handleMarkerMove} />
      </Block>

      {/* Popup */}
      <Popup opened={isPopupOpen} onPopupClosed={() => setIsPopupOpen(false)} style={{padding: '0px'}}>
        <Page style={{padding: '0px'}}>
          <Navbar title="Location Information">
            <NavRight>
              <Link popupClose>Close</Link>
            </NavRight>
          </Navbar>
          <LocationInfoComponent lat={lat} lon={lon} isPopupOpen={isPopupOpen} style={{padding: '0px'}}/>
        </Page>
      </Popup>
    </Page>
  );
};

export default HomePage;