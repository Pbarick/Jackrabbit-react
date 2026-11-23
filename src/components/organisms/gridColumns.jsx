import { SEV_LABEL } from '../../data/sampleData.js'
import { formatDateTime } from '../../lib/format.js'
import { CheckCircleIcon, CheckIcon, TriangleIcon } from '../atoms/Icons.jsx'

// Cell renderers. Infinite-row placeholders have no data yet, so they render nothing.
function SeverityCell({ data }) {
  if (!data) return null
  return (
    <span>
      <span className={`sm-sev is-${data.sev}`}>
        {data.sev === 'low' ? <CheckIcon /> : <TriangleIcon />}
        {SEV_LABEL[data.sev]}
      </span>
    </span>
  )
}

// Fund names truncate with an ellipsis when the column is narrow.
function FundCell({ value }) {
  if (!value) return null
  return <span className="sm-fund-name">{value}</span>
}

function StatusCell({ value }) {
  if (!value) return null
  const tone =
    value === 'Complete' ? 'is-complete' : value === 'Pending' ? 'is-pending' : 'is-pastdue'
  return (
    <span>
      <span className={`sm-pill ${tone}`}>
        {value === 'Complete' ? <CheckCircleIcon /> : <TriangleIcon />}
        {value}
      </span>
    </span>
  )
}

function ActionCell() {
  return (
    <button type="button" className="sm-link">
      View Report
    </button>
  )
}

// Column definitions. Minimum widths fit each column's content, including cell padding.
// SummaryGrid hides columns when the grid is too narrow for their minimums, so no horizontal scrollbar appears.
export const GRID_COLUMNS = [
  {
    colId: 'sev',
    headerName: 'Severity',
    field: 'sev',
    width: 120,
    minWidth: 110,
    cellRenderer: SeverityCell,
  },
  {
    colId: 'fund',
    headerName: 'Fund',
    field: 'fund',
    flex: 1.2,
    minWidth: 80,
    cellClass: 'sm-cell-fund',
    cellRenderer: FundCell,
  },
  { colId: 'reason', headerName: 'Reason', field: 'reason', flex: 1, minWidth: 80 },
  {
    colId: 'expected',
    headerName: 'Expected Value from/to',
    field: 'expected',
    flex: 1.4,
    minWidth: 160,
  },
  {
    colId: 'status',
    headerName: 'Status',
    field: 'status',
    width: 150,
    minWidth: 140,
    cellRenderer: StatusCell,
  },
  {
    colId: 'created',
    headerName: 'Date Created',
    field: 'created',
    flex: 1.2,
    minWidth: 120,
    valueFormatter: (params) => (params.value ? formatDateTime(params.value) : ''),
  },
  {
    colId: 'actions',
    headerName: 'Actions',
    field: 'id',
    width: 124,
    minWidth: 124,
    cellRenderer: ActionCell,
    sortable: false,
  },
]

// Narrow-screen minimums: phones use smaller cell padding and pills (see styles.css), so columns can be narrower.
export const COMPACT_MIN_WIDTHS = { sev: 76, fund: 40, status: 104, actions: 92 }

// Column definitions for the current layout. Compact layouts use the smaller minimums.
export function columnDefsFor(compact) {
  return GRID_COLUMNS.map((col) =>
    compact && COMPACT_MIN_WIDTHS[col.colId]
      ? { ...col, minWidth: COMPACT_MIN_WIDTHS[col.colId] }
      : col,
  )
}
