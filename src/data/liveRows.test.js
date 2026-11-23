import { describe, expect, it, vi } from 'vitest'
import { getRows, subscribeToRows, tickLiveRows } from './liveRows.js'
import { STATUS_ORDER, TOTAL_ROWS } from './sampleData.js'

describe('live rows store', () => {
  it('holds one row per planned row', () => {
    expect(getRows()).toHaveLength(TOTAL_ROWS)
  })

  it('notifies subscribers on each tick', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToRows(listener)
    tickLiveRows()
    expect(listener).toHaveBeenCalledTimes(1)
    unsubscribe()
    tickLiveRows()
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('only ever sets a valid status', () => {
    tickLiveRows()
    getRows().forEach((row) => expect(STATUS_ORDER).toContain(row.status))
  })
})
