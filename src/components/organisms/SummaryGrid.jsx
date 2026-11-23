import { useEffect, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz } from 'ag-grid-community'
import { GRID_COLUMNS } from './gridColumns.jsx'
import { getRows, subscribeToRows, tickLiveRows } from '../../data/liveRows.js'
import { useInterval } from '../../hooks/useInterval.js'
import { useElementSize } from '../../hooks/useElementSize.js'
import { sortRows } from '../../lib/sortRows.js'
import { LIVE_INTERVAL_MS } from '../../lib/config.js'

ModuleRegistry.registerModules([AllCommunityModule])

const GRID_THEME = themeQuartz.withPart(colorSchemeDark).withParams({
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

const DEFAULT_COL_DEF = { sortable: true, filter: false, resizable: false }

// Lower-priority columns are hidden below these grid widths, so the grid never needs a horizontal scrollbar.
const HIDE_BELOW = [
  { colIds: ['created', 'expected'], width: 760 },
  { colIds: ['reason'], width: 680 },
]

// Shows only the columns that fit the given width, then stretches them to fill it.
function fitColumns(api, width) {
  HIDE_BELOW.forEach(({ colIds, width: minWidth }) => {
    api.setColumnsVisible(colIds, width >= minWidth)
  })
  api.sizeColumnsToFit()
}

// Infinite row model: AG Grid requests one block at a time. Sorting and the stage filter happen here.
// The grid reads the stage through a ref, so one datasource object serves every stage.
export default function SummaryGrid({ stage, live, onAction }) {
  const apiRef = useRef(null)
  const stageRef = useRef(stage)
  const hostRef = useRef(null)
  const { width } = useElementSize(hostRef)

  const datasource = useMemo(
    () => ({
      getRows(params) {
        const current = stageRef.current
        const filtered = getRows().filter((row) => current === 'All' || row.stage === current)
        const sorted = sortRows(filtered, params.sortModel)
        // Copies, so the grid notices when a row's status changes during a refresh.
        const block = sorted.slice(params.startRow, params.endRow).map((row) => ({ ...row }))
        params.successCallback(block, sorted.length)
      },
    }),
    [],
  )

  // A stage change clears the cache so every block is requested again.
  useEffect(() => {
    stageRef.current = stage
    apiRef.current?.refreshInfiniteCache()
  }, [stage])

  // Store changes (live ticks) refresh the grid's cached blocks.
  useEffect(() => subscribeToRows(() => apiRef.current?.refreshInfiniteCache()), [])

  useInterval(tickLiveRows, live ? LIVE_INTERVAL_MS : null)

  // Re-fit whenever the grid's width changes (window resize, sidebar, rotation).
  useEffect(() => {
    if (apiRef.current && width > 0) fitColumns(apiRef.current, width)
  }, [width])

  function handleGridReady(event) {
    apiRef.current = event.api
    if (width > 0) fitColumns(event.api, width)
  }

  function handleCellClicked(event) {
    if (event.colDef?.colId === 'actions' && event.data) onAction(event.data.id)
  }

  return (
    <div id="summaryGrid" className="sm-grid-host" ref={hostRef}>
      <AgGridReact
        columnDefs={GRID_COLUMNS}
        defaultColDef={DEFAULT_COL_DEF}
        rowModelType="infinite"
        cacheBlockSize={40}
        maxBlocksInCache={8}
        infiniteInitialRowCount={1}
        datasource={datasource}
        theme={GRID_THEME}
        onGridReady={handleGridReady}
        onCellClicked={handleCellClicked}
      />
    </div>
  )
}
