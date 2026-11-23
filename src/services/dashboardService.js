// The one place the UI gets its data from. Each function returns plain data.
// Today it reads sample data; replacing it with fetch() calls changes only this file.
import {
  ASSET_SETS,
  ASSET_TABS,
  FILTER_GROUPS,
  PERF_BLUE,
  PERF_DASH,
  PERF_GREEN,
  PERFORMERS_BOTTOM,
  PERFORMERS_TOP,
  REPORTS,
  STAGES,
  STEPS,
  STEP_ACTIVE,
  TRADE_COUNTS,
  TRADE_DATES,
  TRADE_STP,
} from '../data/sampleData.js'

const ALL_FUNDS = FILTER_GROUPS.flat()

export function getFundGroups() {
  return FILTER_GROUPS
}

// Every fund starts selected.
export function createFundSelection() {
  const selection = {}
  ALL_FUNDS.forEach((name) => {
    selection[name] = true
  })
  return selection
}

export function getPerformance() {
  return {
    value: '$7.65',
    delta: '25%',
    series: { blue: PERF_BLUE, green: PERF_GREEN, dash: PERF_DASH },
    topPerformers: PERFORMERS_TOP,
    bottomPerformers: PERFORMERS_BOTTOM,
  }
}

export function getAssets() {
  return { tabs: ASSET_TABS, sets: ASSET_SETS }
}

export function getTrades() {
  return { dates: TRADE_DATES, counts: TRADE_COUNTS, stp: TRADE_STP }
}

export function getReports() {
  return REPORTS
}

export function getStepper() {
  return { steps: STEPS, active: STEP_ACTIVE }
}

export function getStages() {
  return STAGES
}

export function getAccountTotal() {
  return { value: '$7.65', unit: 'B', delta: '2.5%' }
}

export function getGaugePercent() {
  return 17
}
