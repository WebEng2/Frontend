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
  ListItem,
  Button,
  ListInput
} from 'framework7-react';
import getLocationInfo from '../services/locationInfo';

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
      <Block>

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

      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List strong inset dividersIos>
        <ListItem link="/about/" title="About"/>
        <ListItem link="/form/" title="Form"/>
      </List>

      <BlockTitle>Modals</BlockTitle>
      <Block className="grid grid-cols-2 grid-gap">
        <Button fill popupOpen="#my-popup">Popup</Button>
        <Button fill loginScreenOpen="#my-login-screen">Login Screen</Button>
      </Block>

      <BlockTitle>Panels</BlockTitle>
      <Block className="grid grid-cols-2 grid-gap">
        <Button fill panelOpen="left">Left Panel</Button>
        <Button fill panelOpen="right">Right Panel</Button>
      </Block>

      <List strong inset dividersIos>
        <ListItem
          title="Dynamic (Component) Route"
          link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        />
        <ListItem
          title="Default Route (404)"
          link="/load-something-that-doesnt-exist/"
        />
        <ListItem
          title="Request Data & Load"
          link="/request-and-load/user/123456/"
        />
      </List>
    </Page>
  )
};
export default HomePage;