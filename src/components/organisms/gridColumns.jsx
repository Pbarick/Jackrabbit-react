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

// Column definitions. The grid calls these renderers with each row's data.
export const GRID_COLUMNS = [
  { colId: 'sev', headerName: 'Severity', field: 'sev', width: 150, cellRenderer: SeverityCell },
  {
    colId: 'fund',
    headerName: 'Fund',
    field: 'fund',
    flex: 1.2,
    minWidth: 180,
    cellClass: 'sm-cell-fund',
  },
  { colId: 'reason', headerName: 'Reason', field: 'reason', flex: 1, minWidth: 120 },
  {
    colId: 'expected',
    headerName: 'Expected Value from/to',
    field: 'expected',
    flex: 1.4,
    minWidth: 170,
  },
  { colId: 'status', headerName: 'Status', field: 'status', width: 170, cellRenderer: StatusCell },
  {
    colId: 'created',
    headerName: 'Date Created',
    field: 'created',
    flex: 1.2,
    minWidth: 180,
    valueFormatter: (params) => (params.value ? formatDateTime(params.value) : ''),
  },
  {
    colId: 'actions',
    headerName: 'Actions',
    field: 'id',
    width: 150,
    cellRenderer: ActionCell,
    sortable: false,
  },
]
