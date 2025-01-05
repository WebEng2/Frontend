/**
 * Function to get location information based on latitude and longitude.
 * Combines reverse geocoding with Wikipedia APIs to retrieve detailed location data
 * and related articles.
 * 
 * @param {number} lat Latitude of the location.
 * @param {number} lon Longitude of the location.
 */
export async function getLocationInfo(lat, lon) {
    console.log("Getting location information for coordinates:", lat, lon);
    const nominatimResponse = await reverseGeocoding(lat, lon);
    await callWikiGeoApi(lat, lon, 1000); // Retrieves geotagged Wikipedia articles near the coordinates
    await callWikiSearchApi(nominatimResponse.name); // Retrieves Wikipedia articles related to the location name
}


/**
 * Function to perform reverse geocoding using OpenStreetMap's Nominatim API.
 * Converts latitude and longitude into a human-readable address and additional metadata.
 * 
 * @param {number} lat Latitude of the location.
 * @param {number} lon Longitude of the location.
 * @returns {Promise<Object>} A promise that resolves with the reverse geocoding result (address and metadata).
 */
export async function reverseGeocoding(lat, lon) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&extratags=1`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Reverse Geocoding - Response status: ${response.status}`);
        }
        
        const json = await response.json();
        console.log("Reverse Geocoding Result:", json);
        return json;
    } catch (error) {
        console.error("Reverse Geocoding Error:", error.message);
    }
}


/**
 * Function to perform a text search on the Wikipedia API.
 * Searches for Wikipedia articles based on a given query string and returns related articles.
 * 
 * @param {string} searchQuery The search term used to find related Wikipedia articles.
 * @returns {Promise<Object>} A promise that resolves with the search results (articles).
 */
async function callWikiSearchApi(searchQuery) {
    const apiUrl = `https://de.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Wiki Search API - Response status: ${response.status}`);
        }
        const json = await response.json();

        if (!json.query || !json.query.search || json.query.search.length === 0) {
            console.log("No articles found for the given search query.");
            return { message: "No articles found", articles: [] };
        }

        console.log("Wiki Search API Result:", json);
        return json;
    } catch (error) {
        console.error("Wiki Search API Error:", error.message);
    }
}


/**
 * Function to perform a geographic search on the Wikipedia API.
 * Returns Wikipedia articles tagged near specific geographic coordinates (lat/lon).
 * The radius specifies the search radius in meters around the given coordinates.
 * 
 * @param {number} lat Latitude of the location.
 * @param {number} lon Longitude of the location.
 * @param {number} radius The radius (in meters) around the geographic coordinates to search for articles.
 * @returns {Promise<Object>} A promise that resolves with the search results (nearby Wikipedia articles).
 */
async function callWikiGeoApi(lat, lon, radius) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=geosearch&prop=coordinates%7Cpageimages&ggscoord=${lat}%7C${lon}&ggsradius=${radius}&format=json&origin=*`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Wiki Geo API - Response status: ${response.status}`);
        }
        const json = await response.json();

        if (!json.query || !json.query.pages) {
            console.log("No geotagged articles found near the given geographic coordinates.");
            return { message: "No articles found", articles: [] };
        }

        console.log("Wiki Geo API Result:", json);
        return json;
    } catch (error) {
        console.error("Wiki Geo API Error:", error.message);
    }
}
