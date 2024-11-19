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
  Button
} from 'framework7-react';
import L from 'leaflet'; // Leaflet für die Karte importieren
import 'leaflet/dist/leaflet.css'; // Leaflet CSS importieren

const HomePage = () => {
  const [showMap, setShowMap] = useState(false); // Zustand für die Karte

  const initializeMap = () => {
    const map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.marker([51.1657, 10.4515])
      .addTo(map)
      .bindPopup('Hier ist Deutschland!')
      .openPopup();
  };

  const handleShowMap = () => {
    setShowMap(true); // Zeige die Karte an
    setTimeout(() => {
      initializeMap(); // Initialisiere die Karte nach dem Rendern
    }, 0);
  };

  return (
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
        <p>Here is your blank Framework7 app. Let's see what we have here.</p>
      </Block>
      <BlockTitle>Navigation</BlockTitle>
      <List strong inset dividersIos>
        <ListItem link="/about/" title="About" />
        <ListItem link="/form/" title="Form" />
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

      {/* Karte */}
      <BlockTitle>Karte</BlockTitle>
      <Block>
        {!showMap && (
          <Button fill onClick={handleShowMap}>
            Karte anzeigen
          </Button>
        )}
      </Block>
      {showMap && (
        <div
          id="map"
          style={{
            width: '100%',
            height: '50vh', // Höhe der Karte, anpassbar
            marginTop: '20px',
          }}
        ></div>
      )}
    </Page>
  );
};

export default HomePage;
