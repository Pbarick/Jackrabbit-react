import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Unmount rendered trees between tests so state never leaks from one test to the next.
afterEach(() => {
  cleanup()
})
