import { SEV_RANK, STATUS_RANK } from '../data/sampleData.js'

// Sort key for each grid column. Severity and status sort by rank, dates by time.
function sortValue(row, colId) {
  if (colId === 'sev') return SEV_RANK[row.sev]
  if (colId === 'status') return STATUS_RANK[row.status]
  if (colId === 'created') return row.created.getTime()
  return row[colId] === undefined ? '' : row[colId]
}

// Sorts by the first sort column. Ties keep row id order, so the result is stable.
export function sortRows(rows, sortModel) {
  if (!sortModel || !sortModel.length) return rows
  const { colId, sort } = sortModel[0]
  const dir = sort === 'desc' ? -1 : 1
  return rows.slice().sort((a, b) => {
    const va = sortValue(a, colId)
    const vb = sortValue(b, colId)
    if (va < vb) return -dir
    if (va > vb) return dir
    return a.id - b.id
  })
}
