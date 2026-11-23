import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import LiveSwitch from './LiveSwitch.jsx'

describe('LiveSwitch', () => {
  it('shows On and a checked box when live', () => {
    render(<LiveSwitch live onChange={() => {}} />)
    expect(screen.getByText('On')).toBeTruthy()
    expect(screen.getByRole('checkbox').checked).toBe(true)
  })

  it('shows Off when not live and reports changes', () => {
    const onChange = vi.fn()
    render(<LiveSwitch live={false} onChange={onChange} />)
    expect(screen.getByText('Off')).toBeTruthy()
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
