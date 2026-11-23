import { describe, expect, it } from 'vitest'
import { createFundSelection, getAssets, getFundGroups, getTrades } from './dashboardService.js'

describe('dashboardService', () => {
  it('selects every fund by default', () => {
    const selection = createFundSelection()
    const names = getFundGroups().flat()
    expect(Object.keys(selection)).toHaveLength(names.length)
    names.forEach((name) => expect(selection[name]).toBe(true))
  })

  it('returns one data set per asset tab', () => {
    const { tabs, sets } = getAssets()
    expect(sets).toHaveLength(tabs.length)
  })

  it('returns trade series of equal length', () => {
    const { dates, counts, stp } = getTrades()
    expect(counts).toHaveLength(dates.length)
    expect(stp).toHaveLength(dates.length)
  })
})
