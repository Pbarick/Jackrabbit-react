# Jack Rabbit Dashboard (React)

React + Vite version of the Jack Rabbit dashboard. The layout, styles and data match the plain HTML build in `Pbarick/jack-rabbit-dashboard`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # output in dist/
npm run preview    # serve dist/ at http://localhost:4173/jackrabbit-react/
```

## Deploy

Served from GitHub Pages at https://pbarick.github.io/jackrabbit-react/. The Vite `base` in `vite.config.js` is set to `/jackrabbit-react/`.

## Structure

- `src/App.jsx`: hash routing (`#dashboard`, `#summary`) and shared fund filter state
- `src/components/`: one component per card and view (Header, FundFilter, DatePicker, PerformanceCard, AssetsCard, TradesCard, ReportsCard, PromoCard, SummaryView, SummaryGrid)
- `src/data.js`: sample data (placeholders) and the live-update tick
- `src/charts.js`: SVG chart builders, same markup as the plain build
- `src/styles.css`: the plain build's stylesheet, unchanged

Sample data is placeholder content. Replace `src/data.js` with live data.
