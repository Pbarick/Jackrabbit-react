# Jack Rabbit Dashboard (React)

React + Vite version of the Jack Rabbit dashboard. Layout and styles match the plain HTML build in `Pbarick/jack-rabbit-dashboard`.

Live site: https://pbarick.github.io/Jackrabbit-react/

## Scripts

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve dist/ at http://localhost:4173/Jackrabbit-react/
npm run lint       # ESLint (flat config in eslint.config.js)
npm test           # Vitest + React Testing Library, single run
npm run test:watch # Vitest in watch mode
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) runs `npm ci` and `npm run build`, then publishes `dist/` to GitHub Pages on every push to `main`. In repo settings, Pages must use **Source: GitHub Actions**.

The Vite `base` in `vite.config.js` must match the repo name's casing (`/Jackrabbit-react/`), because Pages serves the app from that path.

## Architecture

### Routing

`HashRouter` is used because GitHub Pages has no fallback for deep links, so a refresh on `/datagrid` would 404 with `BrowserRouter`. The hash keeps every route on the static host.

| Route       | Page            | Notes                                           |
| ----------- | --------------- | ----------------------------------------------- |
| `/`         | `DashboardPage` | Loaded eagerly                                  |
| `/datagrid` | `SummaryPage`   | `React.lazy`, so AG Grid ships in its own chunk |
| `*`         | `NotFoundPage`  |                                                 |

`AppLayout` owns the header and an `Outlet`. Each route's content sits inside an `ErrorBoundary` keyed by pathname, so a crash on one page resets when the user navigates away. A `Suspense` fallback covers the lazy page.

### Layers

Components follow atomic-design folders. Each layer only imports from the layers below it.

- `components/atoms/`: no app logic. `Button`, `Checkbox`, `IconButton`, `Icons`.
- `components/molecules/`: small stateful pieces. `FundFilter`, `DatePicker`, `LiveSwitch`, `Stepper`, `Metric`, `ReportItem`, and others.
- `components/organisms/`: cards and page sections. `Header`, `PerformanceCard`, `TradesCard`, `SummaryGrid` (AG Grid), and others.
- `components/charts/`: SVG charts written as JSX. No HTML strings and no `dangerouslySetInnerHTML`.
- `pages/`: route-level composition.
- `layout/`: the app shell.

### State

- **Fund selection** is shared across the app through `context/FundFilterContext.jsx`, which exposes `useFundFilter()`. It throws if used outside the provider, so a missing provider fails loudly.
- **Live grid rows** live in `data/liveRows.js`, a small store with `getRows`, `subscribeToRows` and `tickLiveRows`. `SummaryGrid` subscribes to it and calls `refreshInfiniteCache` when rows change. It uses a plain subscription rather than React state, so a live tick updates the grid without re-rendering the page.
- Everything else is local component state.

### Data flow

Cards and charts get their data through `services/dashboardService.js` and the hooks in `hooks/useDashboardData.js`. A few constants (holidays, severity labels, sort ranks) are imported from `data/sampleData.js` directly, since they describe the UI rather than the data. Hooks in `hooks/useDashboardData.js` wrap those calls in `useMemo`. To connect a real API, only `dashboardService.js` changes: each function becomes an async call, and the components need a loading state.

`data/sampleData.js` holds placeholder content. Nothing in it is real.

### Hooks

- `useElementSize`: `ResizeObserver` size, used by the charts.
- `useInterval`: runs a callback on an interval using the latest callback ref. A `null` delay pauses it. This drives the live toggle.
- `useOutsideClose`: closes the fund dropdown and date picker on an outside click.

### Design tokens

All colours, spacing, type sizes, radii, shadows and layout values are CSS custom properties in `src/styles.css`, in this order:

1. **Primitive palette.** Named families with ordinal steps (`--navy-1` lightest to higher numbers darker), using the exact hex values from the original build.
2. **Semantic roles.** Names such as `--card`, `--text`, `--muted`, `--bar-active`. Each points at a primitive, so a theme change happens in one place.
3. **Spacing** (`--space-1` to `--space-8`), **type** (`--fs-xs` to `--fs-6xl`), **radius**, **shadows**, and **layout** (`--card-pad`, `--content-width`, `--row-h`).

Component rules reference tokens with `var()`. A few one-off values remain as raw numbers; see Known gaps.

### Lint and tests

- **ESLint 9 flat config**: `@eslint/js` recommended, plus `eslint-plugin-react` and `eslint-plugin-react-hooks`. The `react-in-jsx-scope` and `prop-types` rules are off because the project uses the modern JSX transform and no PropTypes.
- **Vitest** with the `jsdom` environment, and `@testing-library/react`. Setup is in `src/test/setup.js`, which unmounts after each test.

Covered by tests:

- `lib/sortRows.js`: sort order, severity ranking, stable ties, no mutation of input.
- `data/liveRows.js`: subscribe, unsubscribe, tick notification, valid status values.
- `services/dashboardService.js`: fund selection covers all funds, series lengths match.
- Components: `FundFilter` (count label), `DatePicker` (open, change month, pick a day), `LiveSwitch` (On/Off and change callback), `Stepper` (done/active states), `ErrorBoundary` (fallback, then recovery on retry).
- `App`: `/` renders the dashboard, unknown paths render the 404 page.

AG Grid and the SVG charts are not unit-tested. jsdom has no layout engine, so they are checked by browser interaction tests against the built site.

## Known gaps

- Phone and tablet widths are not verified in the React build.
- Some CSS values remain off-scale (a 9.5px font, a few radii and spacing values) and near-duplicate colours are not merged, so the screenshots still match the original build.
- Live toggle and stage filter reset when the user navigates between routes, because the route remounts the page.
- Fund selection uses React context. A larger app would move it to a store library.
- The summary page's tab row is static.
- "Learn More" is a placeholder.
- The summary page chunk is about 1.26 MB minified, which triggers Vite's size warning. Splitting AG Grid further is not done.
- Prettier is not configured yet.

## Structure

```
src/
  App.jsx                  router and route table
  main.jsx                 entry point
  styles.css               design tokens and component styles
  layout/AppLayout.jsx     shell: header, outlet, error boundary
  context/                 shared fund filter state
  pages/                   DashboardPage, SummaryPage, NotFoundPage
  components/
    atoms/ molecules/ organisms/ charts/
    ErrorBoundary.jsx
  services/dashboardService.js   the only data source
  data/                    sample data and the live-row store
  hooks/                   useElementSize, useInterval, useOutsideClose, useDashboardData
  lib/                     config, format helpers, sortRows
  test/setup.js            Vitest setup
```
