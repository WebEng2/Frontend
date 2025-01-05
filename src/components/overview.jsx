import React, { useState, useEffect } from 'react';
import { List, ListItem, Block, AccordionContent, BlockTitle } from 'framework7-react';
import { reverseGeocoding } from '../services/locationInfo.js';

const LocationInfoComponent = ({ lat, lon, isPopupOpen }) => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPopupOpen) return;

    const fetchLocationData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await reverseGeocoding(lat, lon);

        if (result && result.address) {
          setLocationData(result);
        } else {
          setError('Failed to fetch location data.');
        }
      } catch (err) {
        setError('An error occurred while fetching location data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [lat, lon, isPopupOpen]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="location-info-container">
      {locationData ? (
        <div>
          {/* Location Name */}
          <BlockTitle style={{  fontSize: '22px', fontWeight: 'bold', whiteSpace: 'normal', lineHeight: '1.5',}}>
            {locationData.name || 'N/A'}
          </BlockTitle>

          {/* Basic Location Info */}
          <Block style={{ marginBottom: '16px', padding: '0px'}}>
            <List noHairlinesMd style={{ marginBottom: '15px', paddingLeft: '0px', padding: '0px' }}>
              <ListItem title="Latitude" after={lat} style={{ fontSize: '18px' }} />
              <ListItem title="Longitude" after={lon} style={{ fontSize: '18px' }} />
              <ListItem title="Amenity" after={locationData.address?.amenity || 'N/A'} style={{ fontSize: '16px', whiteSpace: 'normal' }} />
              <ListItem title="Road" after={locationData.address?.road || 'N/A'} style={{ fontSize: '16px' }} />
              <ListItem title="Suburb" after={locationData.address?.suburb || 'N/A'} style={{ fontSize: '16px' }} />
              <ListItem title="Town" after={locationData.address?.town || 'N/A'} style={{ fontSize: '16px' }} />
              <ListItem title="Municipality" after={locationData.address?.municipality || 'N/A'} style={{ fontSize: '16px' }} />
              <ListItem title="Country" after={locationData.address?.country || 'N/A'} style={{ fontSize: '16px' }} />
              <ListItem title="Postal Code" after={locationData.address?.postcode || 'N/A'} style={{ fontSize: '16px' }} />
            </List>
          </Block>

          {/* Accordion for Additional Information */}
          {locationData.extratags && (
            <List 
              strong 
              outlineIos 
              dividersIos 
              insetMd 
              accordionList 
              style={{ padding: '0px', margin: '0px', marginLeft: '16px', marginRight: '16px', marginBottom: '32px' }}
            >
              <ListItem 
                accordionItem 
                title="Additional Information" s
                style={{ fontSize: '18px', padding: '0px' }}
              >
                <AccordionContent>
                  <Block>
                    <List noHairlinesMd>
                      {Object.entries(locationData.extratags).map(([key, value]) => (
                        <ListItem key={key} title={key} after={value} />
                      ))}
                    </List>
                  </Block>
                </AccordionContent>
              </ListItem>
            </List>
          )}
        </div>
      ) : (
        <div style={{ fontSize: '18px' }}>No data available.</div>
      )}
    </div>
  );
};

export default LocationInfoComponent;
