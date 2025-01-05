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
  View,
  ListButton,
} from 'framework7-react';
import Map from '../services/map.jsx';
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

        <Button fill onClick={() => setIsPopupOpen(true)}>
          Get Location Info
        </Button>
      </List>

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
