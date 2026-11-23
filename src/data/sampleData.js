// Sample data for the demo. Placeholder values only; the service layer reads from here.

export const HOLIDAYS = {
  '2024-12-25': 'Christmas Day',
  '2025-01-01': "New Year's Day",
  '2026-05-25': 'Memorial Day',
}

export const FILTER_GROUPS = [
  ['Rabbit USA', 'Rabbit Run USA One', 'Rabbit Run USA Two'],
  ['Rabbit South', 'Rabbit One South One', 'Rabbit One South Two', 'Rabbit One South Three'],
  ['CM DPG', 'Nikko America', 'Manubank', 'Leasing Finance'],
]

export const TRADE_DATES = [
  '1 Jun 2024',
  '2 Jun 2024',
  '3 Jun 2024',
  '4 Jun 2024',
  '5 Jun 2024',
  '6 Jun 2024',
  '7 Jun 2024',
  '8 Jun 2024',
  '9 Jun 2024',
  '10 Jun 2024',
  '11 Jun 2024',
  '12 Jun 2024',
]
export const TRADE_COUNTS = [61, 58, 72, 66, 70, 64, 69, 75, 63, 68, 71, 65]
export const TRADE_STP = [51, 49, 53, 55, 54, 52, 56, 57, 53, 55, 58, 54]

export const PERF_BLUE = [640, 880, 780, 860, 720, 1180, 900, 1010, 1040, 880, 1120, 980]
export const PERF_GREEN = [380, 520, 470, 540, 430, 470, 560, 620, 500, 700, 440, 390]
export const PERF_DASH = [300, 520, 480, 500, 350, 380, 470, 540, 430, 380, 880, 520]

export const PERFORMERS_TOP = [
  { name: 'Gamma Partners', value: '8.4%' },
  { name: 'Alpha Capital', value: '8.4%' },
  { name: 'Delta Capital', value: '8.4%' },
]
export const PERFORMERS_BOTTOM = [
  { name: 'Beta Partners', value: '8.4%' },
  { name: 'Kapa Capital', value: '8.4%' },
  { name: 'Omicron Partners', value: '8.4%' },
]

export const REPORTS = [
  {
    name: 'Realized / Unrealized Gain / Loss Report',
    date: '7-May-2024',
    lastRun: '12-Aug-2024',
    records: 1284,
    matched: 1236,
    exceptions: 48,
    funds: 6,
    status: 'Completed',
    tone: 'ok',
    owner: 'Operations',
  },
  {
    name: 'Position / Cash Balance Report',
    date: '14-May-2024',
    lastRun: '13-Aug-2024',
    records: 642,
    matched: 630,
    exceptions: 12,
    funds: 4,
    status: 'Completed',
    tone: 'ok',
    owner: 'Fund Accounting',
  },
  {
    name: 'Transaction History',
    date: '16-May-2024',
    lastRun: '17-Aug-2024',
    records: 3410,
    matched: 3198,
    exceptions: 212,
    funds: 9,
    status: 'Needs review',
    tone: 'warn',
    owner: 'Trade Support',
  },
  {
    name: 'Unrealized Gain / Loss Report',
    date: '17-May-2024',
    lastRun: '12-Sep-2024',
    records: 958,
    matched: 904,
    exceptions: 54,
    funds: 5,
    status: 'Past due',
    tone: 'bad',
    owner: 'Valuation',
  },
]

// Summary stepper: step 1 done, step 2 in progress, the rest not started.
export const STEPS = [
  { title: 'Cap Stepper' },
  { title: 'Cap Transactions', num: '145', label: 'Alerts' },
  { title: 'Rabbit Recon' },
  { title: 'Jack Vals', num: '25', label: 'Notifications' },
  { title: 'Cap Accruals' },
  { title: 'Rabbit P&L' },
  { title: 'Cap Allocation', num: '93', label: 'EXCEPTIONS', upper: true },
]
export const STEP_ACTIVE = 1

// Grid row patterns taken from the summary screenshot.
export const GRID_PATTERNS = [
  { sev: 'high', fund: 'RABBIT ALPHA FUND', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 2', from: '235.47', to: '76.51', status: 'Pending' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Pending' },
  { sev: 'high', fund: 'RABBIT ALPHA FUND', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Past Due' },
  { sev: 'high', fund: 'RABBIT ALPHA FUND', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Past Due' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 2', from: '235.47', to: '76.51', status: 'Pending' },
  { sev: 'high', fund: 'RABBIT ALPHA FUND', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Complete' },
  { sev: 'low', fund: 'RABBIT ALPHA FUND 3', from: '125.77', to: '76.51', status: 'Past Due' },
  { sev: 'high', fund: 'RABBIT ALPHA FUND', from: '125.77', to: '76.51', status: 'Complete' },
]
export const STAGES = ['Active', 'Pending', 'Validated', 'Resolved']
export const TOTAL_ROWS = 127

export const SEV_LABEL = { high: 'High', med: 'Medium', low: 'Low' }
export const SEV_RANK = { high: 0, med: 1, low: 2 }
export const STATUS_RANK = { Complete: 0, Pending: 1, 'Past Due': 2 }
export const STATUS_ORDER = ['Complete', 'Pending', 'Past Due']

// Sample data for the three Assets tabs (RABBIT, ITEM 2, ITEM 3).
export const ASSET_TABS = ['RABBIT', 'ITEM 2', 'ITEM 3']
export const ASSET_SETS = [
  {
    updated: '12/20/24',
    caught: true,
    tx: '3,410',
    txNote: 'Need your attention',
    trades: '12',
    tradesNote: 'Ready for approval',
    pending: '37',
    pendingNote: 'Pending approval',
    done: 68,
    total: 288,
    of: '6 of 88',
  },
  {
    updated: '12/18/24',
    caught: false,
    activity: '4 items to review',
    tx: '1,286',
    txNote: 'Need your attention',
    trades: '7',
    tradesNote: 'Ready for approval',
    pending: '19',
    pendingNote: 'Pending approval',
    done: 41,
    total: 120,
    of: '3 of 40',
  },
  {
    updated: '12/15/24',
    caught: true,
    tx: '864',
    txNote: 'Need your attention',
    trades: '0',
    tradesNote: 'Ready for approval',
    pending: '5',
    pendingNote: 'Pending approval',
    done: 112,
    total: 150,
    of: '9 of 12',
  },
]
