import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

// HashRouter reads the hash when it mounts, so set it before each render.
beforeEach(() => {
  window.location.hash = ''
})

describe('App routes', () => {
  it('renders the dashboard at the root', () => {
    window.location.hash = '#/'
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Rabbit Performance' })).toBeTruthy()
  })

  it('renders the 404 page for unknown paths', () => {
    window.location.hash = '#/does-not-exist'
    render(<App />)
    expect(screen.getByText('Page not found')).toBeTruthy()
  })
})
