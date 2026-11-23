import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary.jsx'

let shouldThrow = true
function Flaky() {
  if (shouldThrow) throw new Error('boom')
  return <p>recovered</p>
}

describe('ErrorBoundary', () => {
  it('shows a fallback instead of crashing, and recovers on retry', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('alert')).toBeTruthy()
    expect(screen.getByText('boom')).toBeTruthy()

    shouldThrow = false
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(screen.getByText('recovered')).toBeTruthy()
    console.error.mockRestore()
  })
})
