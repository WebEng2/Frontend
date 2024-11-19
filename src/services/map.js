// Map.js - Integration von OpenStreetMap mit Leaflet.js

// Funktion, um die Karte zu initialisieren
function initializeMap() {
    const map = L.map('map').setView([51.1657, 10.4515], 6); // Deutschland-Koordinaten
  
    // Tile Layer von OpenStreetMap hinzufügen
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
  
    // Optional: Marker hinzufügen
    const marker = L.marker([51.1657, 10.4515]).addTo(map);
    marker.bindPopup('<b>Hallo!</b><br>Das ist eine Karte von Deutschland.').openPopup();
  }
  
  // Event-Listener für den Button
  document.getElementById('show-map-btn').addEventListener('click', () => {
    const mapDiv = document.getElementById('map');
    mapDiv.style.display = 'block'; // Karte anzeigen
    initializeMap(); // Karte initialisieren
  });
  