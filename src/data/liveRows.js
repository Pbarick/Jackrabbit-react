// Store for the summary grid rows. Live mode changes statuses here and notifies subscribers,
// so the grid can refresh without React re-rendering every row.
import { GRID_PATTERNS, STAGES, STATUS_ORDER, TOTAL_ROWS } from './sampleData.js'

const LIVE_WINDOW = 20 // live changes only touch the first rows, as on the static design
const CHANGES_PER_TICK = 3

function buildRows() {
  const rows = []
  for (let r = 0; r < TOTAL_ROWS; r++) {
    const p = GRID_PATTERNS[r % GRID_PATTERNS.length]
    rows.push({
      id: r + 1,
      sev: p.sev,
      fund: p.fund,
      reason: 'Quantity',
      expected: p.from + ' - ' + p.to,
      status: p.status,
      created: new Date(2024, 7, 12, 8, 7),
      stage: STAGES[r % STAGES.length],
    })
  }
  return rows
}

let rows = buildRows()
const listeners = new Set()

export function getRows() {
  return rows
}

// Returns an unsubscribe function.
export function subscribeToRows(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Advances the status of a few rows, then tells subscribers.
export function tickLiveRows() {
  const window = Math.min(rows.length, LIVE_WINDOW)
  for (let n = 0; n < CHANGES_PER_TICK; n++) {
    const row = rows[Math.floor(Math.random() * window)]
    row.status = STATUS_ORDER[(STATUS_ORDER.indexOf(row.status) + 1) % STATUS_ORDER.length]
  }
  listeners.forEach((listener) => listener())
}
