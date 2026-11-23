// App-wide constants. Vite sets BASE_URL from vite.config.js, so asset paths work under the GitHub Pages sub-path.
export const LOGO_URL = `${import.meta.env.BASE_URL}rabbit-logo.svg`

// How often live mode changes row statuses on the summary grid.
export const LIVE_INTERVAL_MS = 4000
