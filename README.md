# Jack Rabbit Dashboard (React)

React + Vite version of the Jack Rabbit dashboard. Layout and styles match the plain HTML build in `Pbarick/jack-rabbit-dashboard`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # output in dist/
npm run preview    # serves dist/ at http://localhost:4173/Jackrabbit-react/
```

## Deploy

GitHub Actions builds the app and publishes it to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`). In repo settings, Pages must use **Source: GitHub Actions**.

Live site: https://pbarick.github.io/Jackrabbit-react/

The Vite `base` in `vite.config.js` must match the repo name's casing (`/Jackrabbit-react/`).

## Structure

- `src/App.jsx`: router. `HashRouter` with `/` (dashboard) and `/datagrid` (summary). Unknown paths redirect to `/`.
- `src/layout/AppLayout.jsx`: header plus the matched page, and the shared fund filter state.
- `src/pages/`: `DashboardPage.jsx`, `SummaryPage.jsx`
- `src/components/`: one component per card, plus `Header`, `FundFilter`, `DatePicker`, `SummaryGrid` (AG Grid)
- `src/components/charts/`: `PerformanceChart`, `TradesChart`, `RingChart`, `GaugeChart`. All SVG is JSX; there is no HTML string or `dangerouslySetInnerHTML` anywhere.
- `src/components/summary/`: `Stepper`, `RabbitGauge`, `LiveSwitch`
- `src/data.js`: sample data (placeholders) and the live-update tick
- `src/format.js`, `src/hooks.js`, `src/icons.jsx`: helpers
- `src/styles.css`: stylesheet, unchanged from the plain build

Sample data is placeholder content. Replace `src/data.js` with live data.
