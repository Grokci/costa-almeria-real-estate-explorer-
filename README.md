# Costa de Almeria OSM React App

A local React app that renders the Costa de Almeria property map UI using an OpenStreetMap embed as the basemap, with custom overlay pins and a details panel.

## Stack

- React 18
- Webpack 5
- Babel
- Jest + React Testing Library

## What it does

- Loads a real OpenStreetMap basemap in an iframe
- Overlays coastal pins for the main Costa de Almeria towns and beach districts
- Shows indicative 2 bed / 2 bath property price bands on hover and selection
- Lists all plotted places west to east
- Includes a direct link to open the full map in a separate tab

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The production bundle will be written to `dist/`.

## Run tests

```bash
npm test
```

## Notes

- The basemap intentionally uses an OpenStreetMap embed URL. This means your local machine needs internet access for the map tiles and iframe content.
- The iframe is set to non-interactive inside the UI so the overlay pins remain aligned. Use the **Open full map** link for a fully interactive slippy map view.
- If you want this converted to a different bundler later, the app logic is isolated in `src/App.jsx` and can be moved pretty easily.

## Project structure

```text
costa-almeria-osm-react/
  public/
    index.html
  src/
    App.jsx
    App.test.jsx
    index.jsx
    setupTests.js
    styles.css
  babel.config.js
  jest.config.js
  package.json
  webpack.config.js
```
