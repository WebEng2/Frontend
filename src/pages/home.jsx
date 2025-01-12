import React, { useState, useEffect } from 'react';
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
  f7,
  Popup,
  View
} from 'framework7-react';
import Map from '../components/map.jsx';
import CurrentLocationMap from '../components/currentLocationMap.jsx';
import LocationInfoComponent from '../components/overview.jsx';

const HomePage = () => {
  // State for latitude and longitude of the marker
  const [lat, setLat] = useState(47.665597);  // default latitude
  const [lng, setLng] = useState(9.447040);  // default longitude

  // State for the current location
  const [currentLat, setCurrentLat] = useState(47.665597);
  const [currentLng, setCurrentLng] = useState(9.447040);

  // State for the routeTrigger
  const [generateRouteTrigger, setGenerateRouteTrigger] = useState(false);

  // State for showing the popup
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // Popup open state

  // Handle input change for latitude
  const handleLatChange = (e) => setLat(parseFloat(e.target.value));
  // Handle input change for longitude
  const handleLonChange = (e) => setLng(parseFloat(e.target.value));

  // Callback to update lat and lon when the marker is moved
  const handleMarkerMove = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
  };

  // Function to update current location
  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLat(position.coords.latitude);
          setCurrentLng(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to check geolocation permission
  const checkGeolocationPermission = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(200);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            resolve(403);
          } else {
            resolve(405);
          }
        }
      );
    });
  };

  // Function to start currentLocationFinder
  const startCurrentLocationFinder = () => {
    return checkGeolocationPermission().then((permissionTest) => {
      let intervalId = null;

      if (permissionTest === 200) {
        updateCurrentLocation(); // Update current location immediately
        intervalId = setInterval(updateCurrentLocation, 10000); // Update every 10 seconds
      } else if (permissionTest === 403) {
        clearInterval(intervalId);

        // Dialog with vertical buttons
        f7.dialog.create({
          title: 'Geolocation Disabled',
          text: 'Geolocation is disabled. To enable it, you need to allow location permissions in your browser.',
          cssClass: 'wide-dialog', // Benutzerdefinierte Klasse
          buttons: [
            {
              text: 'Retry',
              onClick: () => {
                console.log('User accepted to retry geolocation');
                startCurrentLocationFinder();
              },
            },
            {
              text: 'How?',
              onClick: () => {
                const helpURL = getGeolocationHelpURL();
                console.log('Opening help URL:', helpURL);
                window.open(helpURL, '_blank'); // Open the URL in a new tab
              },
            },
            {
              text: 'Cancel',
              onClick: () => {
                console.log('User chose to cancel geolocation setup');
                setShowPopup(true); // Show the popup
              },
            },
          ],
        }).open();
      }
      return intervalId;
    });
  };

  // Use effect to check geolocation permission on page load and update current location every 10 seconds
  useEffect(() => {
    let intervalId = startCurrentLocationFinder(); // Initial check and start location finder

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to get help URL for geolocation activation
  const getGeolocationHelpURL = () => {
    const userAgent = navigator.userAgent;
  
    // Betriebssystem erkennen
    const isWindows = /Windows/i.test(userAgent);
    const isMacOS = /Macintosh/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  
    // Browser erkennen
    const isChrome = /Chrome/i.test(userAgent);
    const isFirefox = /Firefox/i.test(userAgent);
    const isSafari = /Safari/i.test(userAgent) && !isChrome;
    const isEdge = /Edg/i.test(userAgent);
  
    // URLs zu Hilfeseiten
    if (isAndroid && isChrome) {
      return 'https://support.google.com/chrome/answer/142065?hl=de'; // Chrome auf Android
    } else if (isIOS && isSafari) {
      return 'https://support.apple.com/de-de/HT203033'; // Safari auf iOS
    } else if (isMacOS && isSafari) {
      return 'https://support.apple.com/de-de/guide/mac-help/mh35873/mac'; // Safari auf macOS
    } else if (isWindows || isMacOS) {
      if (isChrome) {
        return 'https://support.google.com/chrome/answer/142065?hl=de'; // Chrome auf Desktop
      } else if (isFirefox) {
        return 'https://support.mozilla.org/de/kb/standortbezogene-funktionen-firefox'; // Firefox
      } else if (isEdge) {
        return 'https://support.microsoft.com/de-de/microsoft-edge/standortdienste-in-microsoft-edge-aktivieren-oder-deaktivieren-4b09a5cd-3a3a-4af2-b959-8a3fcb6bcb4c'; // Edge
      }
    }
  
    // Standard-URL für nicht erkannte Kombinationen
    return 'https://support.apple.com/de-de/guide/mac-help/mh35873/mac';
  };

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar sliding={false}>
        <NavTitle sliding>Navigation_PWA</NavTitle>
      </Navbar>
      
      {/* Page content */}

      {/* Map */}
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

      <BlockTitle>Enter Coordinates for Marker</BlockTitle>
      <List  >
      <Block className="grid grid-cols-2 grid-gap">
      <List  dividersIos style={{padding: '0px', margin: '0px'}}>
          <ListInput
            label="Latitude"
            type="number"
            value={lat}
            onChange={handleLatChange}
            placeholder="Enter Latitude"
          />
        </List>
        <List  dividersIos style={{padding: '0px', margin: '0px'}}>
          <ListInput
            label="Longitude"
            type="number"
            value={lng}
            onChange={handleLonChange}
            placeholder="Enter Longitude"
          />
        </List>
        </Block>
        
        <BlockTitle>Functions</BlockTitle>
        <Block>
          <Button fill onClick={() => setShowPopup(true)} className='margin-top'>
              Change Current Location
          </Button>

          <Button fill onClick={() => setIsPopupOpen(true)} className='margin-top'>
              Get Location Info
          </Button>

          <Button fill onClick={() => setGenerateRouteTrigger(true)} className='margin-top'>
            Route to Marker
          </Button>
        </Block>
      </List>


      {/* Popup for setting current location */}
      <Popup opened={showPopup} onPopupClosed={() => setShowPopup(false)}>
        <View>
          <Page>
            <Navbar title="Set Current Location">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <CurrentLocationMap 
                lat={currentLat} 
                lng={currentLng} 
                onMarkerMove={(newLat, newLng) => {
                  setCurrentLat(newLat);
                  setCurrentLng(newLng);
                }} 
                openPopup={showPopup}
              />
              <Button fill onClick={() => setShowPopup(false)} className='margin-top'>
                Set Location
              </Button>
            </Block>
          </Page>
        </View>
      </Popup>

      {/* Popup for Location Information */}
      <Popup opened={isPopupOpen} onPopupClosed={() => setIsPopupOpen(false)} style={{padding: '0px'}}>
        <Page style={{padding: '0px'}}>
          <Navbar title="Location Information">
            <NavRight>
              <Link popupClose>Close</Link>
            </NavRight>
          </Navbar>
          <LocationInfoComponent lat={lat} lng={lng} isPopupOpen={isPopupOpen} style={{padding: '0px'}}/>
        </Page>
      </Popup>
    </Page>
  );
};

export default HomePage;