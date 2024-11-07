# Web-Engineering 2 OpenReadMap

## Epic:
„Entwickeln Sie eine Web-Applikation die innerhalb eines Location-Based-Service eine Karte darstellt.
Innerhalb der Karte soll eine Position (oder aktueller Standort) mit ihren Geo-Koordinaten ausgewählt werden können. 
Über diese Koordinaten soll mittels Reverse-Geocoding der Ort ermittelt und über Wikipedia die entsprechenden Information zur Örtlichkeit ausgelesen und visualisiert werden"
Anschließend soll die Fahrroute von der gegenwärtigen Position zum ausgewählten Ort dargestellt werden.
- Die Web-Applikation soll möglichst gemäß den Vorgaben einer PWA entsprechend (Progressive-Web-Application, mobile first, responsive,...) umgesetzt werden.
- Die App soll über "React/JSX", sowie über ein User Experience (Mobility/UI) wie z.B. "Framework7, Ionic oder Material UI" und dessen Standardkomponenten umgesetzt werden. Die Karten sollen über OpenStreetMap ggf. Leaflet eingebunden werden.
- Bilden Sie dazu kleine Sprint-Teams (ca. 4-7 Personen pro Sprint-Team) und zerlegen sie die Epic in die entsprechenden User-Stories und Sprints (Produkt-Backlog, Sprint-Backlog), so dass die Teams eine gleichmäßige Auslastung haben.
- Definieren Sie einen Scrum-Master (wenn nötig ggf. ein Team von 2 Personen) der das Produkt-Inkrement kontrolliert und dem Team beim Sprint-Inkrement beratend und unterstützend zur Seite steht, die (online)-Kommunikation untereinander aufrecht erhält, das Ziel ständig kontrolliert und den Product-Owner informiert.
- Die fertige Lösung soll auf einem GitHub-Repository lauffähig veröffentlicht und auf CD/DVD dem Sekretariat übergeben werden. Der Scrum-Master ist für die vollständige Auslieferung der PWA zum Ende des Vorlesungsquartals oder nach individueller zeitlicher Absprache mit dem Dozenten verantwortlich.


1. Nominatim: https://nominatim.org/release-docs/develop/api/Overview
2. Wikipedia: https://www.mediawiki.org/wiki/API:Tutorial
3. OpenStreetMap: https://wiki.openstreetmap.org/wiki/DE:Hauptseite
4. Leaflet: https://leafletjs.com/
5. Routing: https://www.liedman.net/leaflet-routing-machine/


## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "/Users/timogrethel/Documents/Programmieren/WebEng2/Frontend",
  "type": [
    "pwa"
  ],
  "name": "OpenReadMap",
  "framework": "react",
  "template": "tabs",
  "bundler": "vite",
  "cssPreProcessor": "less",
  "theming": {
    "customColor": true,
    "color": "#007789",
    "darkMode": true,
    "iconFonts": true
  },
  "customBuild": false
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)

* [Framework7 React Documentation](https://framework7.io/react/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7
