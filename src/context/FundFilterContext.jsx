import { createContext, useContext, useMemo, useState } from 'react'
import { createFundSelection, getFundGroups } from '../services/dashboardService.js'

// Fund selection is shared app-wide: the header filter writes it, and any page can read it.
const FundFilterContext = createContext(null)

export function FundFilterProvider({ children }) {
  const [checked, setChecked] = useState(createFundSelection)
  const value = useMemo(
    () => ({ checked, setChecked, groups: getFundGroups() }),
    [checked],
  )
  return <FundFilterContext.Provider value={value}>{children}</FundFilterContext.Provider>
}

export function useFundFilter() {
  const context = useContext(FundFilterContext)
  if (!context) throw new Error('useFundFilter must be used inside FundFilterProvider')
  return context
}
