// Map.js - Integration von OpenStreetMap mit Leaflet.js

// Warten, bis die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => {
    // Karte in den Container mit der ID "map" einfügen
    const map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland-Koordinaten
  
    // Tile Layer von OpenStreetMap hinzufügen
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
  
    // Marker hinzufügen (optional)
    const marker = L.marker([51.1657, 10.4515]).addTo(map);
    marker.bindPopup('<b>Hallo!</b><br>Das ist eine Karte von Deutschland.').openPopup();
  });
  