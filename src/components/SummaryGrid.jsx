import { useEffect, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz } from 'ag-grid-community'
import {
  LIVE_INTERVAL_MS, ROWS, SEV_LABEL, SEV_RANK, STATUS_RANK, tickLive,
} from '../data.js'
import { formatDateTime } from '../format.js'
import { CheckCircleIcon, CheckIcon, TriangleIcon } from '../icons.jsx'

ModuleRegistry.registerModules([AllCommunityModule])

const theme = themeQuartz.withPart(colorSchemeDark).withParams({
  backgroundColor: '#0A1424',
  foregroundColor: '#E6EDF7',
  headerBackgroundColor: '#0C1729',
  headerTextColor: '#FFFFFF',
  borderColor: '#1B2D48',
  oddRowBackgroundColor: '#0C1A2E',
  rowHoverColor: '#12233D',
  accentColor: '#2D6BF0',
  selectedRowBackgroundColor: 'rgba(45, 107, 240, 0.12)',
  fontFamily: 'Inter, Roboto, Arial, sans-serif',
  fontSize: 14,
  headerFontSize: 13,
  headerFontWeight: 700,
  rowHeight: 51,
  headerHeight: 48,
  cellHorizontalPadding: 20,
  wrapperBorderRadius: 0,
})

function SevCell({ data }) {
  if (!data) return null
  return (
    <span>
      <span className={'sm-sev is-' + data.sev}>
        {data.sev === 'low' ? <CheckIcon /> : <TriangleIcon />}
        {SEV_LABEL[data.sev]}
      </span>
    </span>
  )
}

function StatusCell({ value }) {
  if (!value) return null
  const cls = value === 'Complete' ? 'is-complete' : value === 'Pending' ? 'is-pending' : 'is-pastdue'
  return (
    <span>
      <span className={'sm-pill ' + cls}>
        {value === 'Complete' ? <CheckCircleIcon /> : <TriangleIcon />}
        {value}
      </span>
    </span>
  )
}

function ActionCell() {
  return <button type="button" className="sm-link">View Report</button>
}

const COLUMNS = [
  { colId: 'sev', headerName: 'Severity', field: 'sev', width: 150, cellRenderer: SevCell },
  { colId: 'fund', headerName: 'Fund', field: 'fund', flex: 1.2, minWidth: 180, cellClass: 'sm-cell-fund' },
  { colId: 'reason', headerName: 'Reason', field: 'reason', flex: 1, minWidth: 120 },
  { colId: 'expected', headerName: 'Expected Value from/to', field: 'expected', flex: 1.4, minWidth: 170 },
  { colId: 'status', headerName: 'Status', field: 'status', width: 170, cellRenderer: StatusCell },
  {
    colId: 'created', headerName: 'Date Created', field: 'created', flex: 1.2, minWidth: 180,
    valueFormatter: (p) => (p.value ? formatDateTime(p.value) : ''),
  },
  {
    colId: 'actions', headerName: 'Actions', field: 'id', width: 150,
    cellRenderer: ActionCell, sortable: false,
  },
]

function sortValue(row, colId) {
  if (colId === 'sev') return SEV_RANK[row.sev]
  if (colId === 'status') return STATUS_RANK[row.status]
  if (colId === 'created') return row.created.getTime()
  return row[colId] === undefined ? '' : row[colId]
}

// Ascending or descending on the first sort column; ties keep row order.
function sortRows(rows, sortModel) {
  if (!sortModel || !sortModel.length) return rows
  const s = sortModel[0]
  const dir = s.sort === 'desc' ? -1 : 1
  return rows.slice().sort((a, b) => {
    const va = sortValue(a, s.colId)
    const vb = sortValue(b, s.colId)
    if (va < vb) return -1 * dir
    if (va > vb) return 1 * dir
    return a.id - b.id
  })
}

export default function SummaryGrid({ stage, live, visible, onAction }) {
  const apiRef = useRef(null)
  const stageRef = useRef(stage)

  // Infinite row model: the grid asks for one block at a time. Sort and stage are applied here.
  const datasource = useMemo(() => ({
    getRows(params) {
      const current = stageRef.current
      const rows = sortRows(
        ROWS.filter((r) => current === 'All' || r.stage === current),
        params.sortModel,
      )
      // Copies, so the grid sees changed status values when the cache is refreshed.
      const block = rows.slice(params.startRow, params.endRow).map((row) => ({ ...row }))
      params.successCallback(block, rows.length)
    },
  }), [])

  useEffect(() => {
    stageRef.current = stage
    apiRef.current?.refreshInfiniteCache()
  }, [stage])

  useEffect(() => {
    if (visible) apiRef.current?.sizeColumnsToFit()
  }, [visible])

  // Live mode: three rows near the top change status every few seconds.
  useEffect(() => {
    if (!live) return undefined
    const id = setInterval(() => {
      tickLive()
      apiRef.current?.refreshInfiniteCache()
    }, LIVE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [live])

  function onGridReady(e) {
    apiRef.current = e.api
    if (visible) e.api.sizeColumnsToFit()
  }

  function onCellClicked(e) {
    if (e.colDef && e.colDef.colId === 'actions' && e.data) onAction(e.data.id)
  }

  return (
    <div id="summaryGrid" className="sm-grid-host">
      <AgGridReact
        columnDefs={COLUMNS}
        defaultColDef={{ sortable: true, filter: false, resizable: false }}
        rowModelType="infinite"
        cacheBlockSize={40}
        maxBlocksInCache={8}
        infiniteInitialRowCount={1}
        datasource={datasource}
        theme={theme}
        onGridReady={onGridReady}
        onCellClicked={onCellClicked}
      />
    </div>
  )
}
