import React, { useState } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  Button,
  ListInput
} from 'framework7-react';
import getLocationInfo from '../services/locationInfo.js';
import Map from '../services/map.jsx';

const HomePage = () => {
  // State for latitude and longitude of the marker
  const [lat, setLat] = useState(47.665597);  // default latitude
  const [lng, setLng] = useState(9.447040);  // default longitude

  // State for the current location
  const [currentLat, setCurrentLat] = useState(47.665597);
  const [currentLng, setCurrentLng] = useState(9.447040);

  // State for the routeTrigger
  const [generateRouteTrigger, setGenerateRouteTrigger] = useState(false);

  // Handle input change for latitude
  const handleLatChange = (e) => setLat(e.target.value);
  // Handle input change for longitude
  const handleLonChange = (e) => setLng(e.target.value);

  // Callback to update lat and lon when the marker is moved
    const handleMarkerMove = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
  };

  return(
    <Page name="home">
      {/* Top Navbar */}
      <Navbar large sliding={false}>
        <NavLeft>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
        </NavLeft>
        <NavTitle sliding>Navigation_PWA</NavTitle>
        <NavRight>
          <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right" />
        </NavRight>
        <NavTitleLarge>Navigation_PWA</NavTitleLarge>
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
            value={lng}
            onChange={handleLonChange}
            placeholder="Enter Longitude"
          />

          <Button fill onClick={() => getLocationInfo(lat, lng)} className='margin-top'>
            Get Location Info
          </Button>
          <Button fill onClick={() => setGenerateRouteTrigger(true)} className='margin-top'>
            Route to Marker
          </Button>
        </List>

      {/* Karte */}
      <BlockTitle>Karte</BlockTitle>
      <Block>
        <Map 
          lat={lat} 
          lng={lng} 
          currentLat={currentLat} 
          currentLng={currentLng} 
          generateRouteTrigger={generateRouteTrigger} 
          resetGenerateRouteTrigger={()=>{setGenerateRouteTrigger(false)}} 
          onMarkerMove={handleMarkerMove} 
        />
      </Block>
    </Page>
  );
};
export default HomePage;
