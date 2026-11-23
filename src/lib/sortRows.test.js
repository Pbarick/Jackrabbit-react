import { describe, expect, it } from 'vitest'
import { sortRows } from './sortRows.js'

const rows = [
  { id: 1, fund: 'Beta', sev: 'low', status: 'Pending', created: new Date(2024, 0, 2) },
  { id: 2, fund: 'Alpha', sev: 'high', status: 'Complete', created: new Date(2024, 0, 1) },
  { id: 3, fund: 'Alpha', sev: 'low', status: 'Past Due', created: new Date(2024, 0, 3) },
]

describe('sortRows', () => {
  it('returns the input unchanged when there is no sort model', () => {
    expect(sortRows(rows, undefined)).toBe(rows)
    expect(sortRows(rows, [])).toBe(rows)
  })

  it('sorts text columns ascending and descending', () => {
    expect(sortRows(rows, [{ colId: 'fund', sort: 'asc' }]).map((r) => r.id)).toEqual([2, 3, 1])
    expect(sortRows(rows, [{ colId: 'fund', sort: 'desc' }]).map((r) => r.id)).toEqual([1, 2, 3])
  })

  it('ranks severity high before low', () => {
    expect(sortRows(rows, [{ colId: 'sev', sort: 'asc' }]).map((r) => r.id)).toEqual([2, 1, 3])
  })

  it('sorts dates by time', () => {
    expect(sortRows(rows, [{ colId: 'created', sort: 'desc' }]).map((r) => r.id)).toEqual([3, 1, 2])
  })

  it('keeps id order for ties, so results are stable', () => {
    expect(sortRows(rows, [{ colId: 'fund', sort: 'asc' }]).map((r) => r.id)).toEqual([2, 3, 1])
  })

  it('does not mutate the input array', () => {
    const copy = rows.slice()
    sortRows(rows, [{ colId: 'fund', sort: 'desc' }])
    expect(rows).toEqual(copy)
  })
})
