import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import DatePicker from './DatePicker.jsx'

describe('DatePicker', () => {
  it('opens, moves to the next month and picks a day', () => {
    render(<DatePicker />)
    expect(screen.getByRole('button', { name: /16-Dec-2024/ })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /16-Dec-2024/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }))
    expect(screen.getByText('JANUARY 2025')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Sun, Jan 5' }))
    expect(screen.getByRole('button', { name: /05-Jan-2025/ })).toBeTruthy()
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
