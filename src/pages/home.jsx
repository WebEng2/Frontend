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
  // State for latitude and longitude
  const [lat, setLat] = useState(47.665597);  // default latitude
  const [lon, setLon] = useState(9.447040);  // default longitude

  // Handle input change for latitude
  const handleLatChange = (e) => setLat(e.target.value);
  // Handle input change for longitude
  const handleLonChange = (e) => setLon(e.target.value);

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
            onInput={handleLatChange}
            placeholder="Enter Latitude"
          />
          <ListInput
            label="Longitude"
            type="number"
            value={lon}
            onInput={handleLonChange}
            placeholder="Enter Longitude"
          />

          <Button fill onClick={() => getLocationInfo(lat, lon)}>
            Get Location Info
          </Button>
        </List>

      {/* Karte */}
      <BlockTitle>Karte</BlockTitle>
      <Block>
        <Map />
      </Block>
    </Page>
  );
};
export default HomePage;
