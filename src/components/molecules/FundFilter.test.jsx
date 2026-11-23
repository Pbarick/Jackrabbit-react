import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FundFilter from './FundFilter.jsx'
import { FundFilterProvider } from '../../context/FundFilterContext.jsx'
import { getFundGroups } from '../../services/dashboardService.js'

function renderFilter() {
  return render(
    <FundFilterProvider>
      <FundFilter />
    </FundFilterProvider>,
  )
}

describe('FundFilter', () => {
  it('starts with all funds selected', () => {
    renderFilter()
    expect(screen.getByRole('button', { name: 'All Funds' })).toBeTruthy()
  })

  it('shows a count after one fund is unchecked', () => {
    renderFilter()
    const total = getFundGroups().flat().length
    fireEvent.click(screen.getByRole('button', { name: 'All Funds' }))
    fireEvent.click(screen.getByLabelText('Rabbit USA'))
    expect(screen.getByText(`${total - 1} selected`)).toBeTruthy()
  })
})
