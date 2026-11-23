import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import Stepper from './Stepper.jsx'

const steps = [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]

describe('Stepper', () => {
  it('marks steps before the active one as done', () => {
    const { container } = render(<Stepper steps={steps} active={1} />)
    expect(container.querySelectorAll('.sm-node.is-done')).toHaveLength(1)
    expect(container.querySelectorAll('.sm-node.is-active')).toHaveLength(1)
  })

  it('renders every step title', () => {
    const { getByText } = render(<Stepper steps={steps} active={0} />)
    steps.forEach((step) => expect(getByText(step.title)).toBeTruthy())
  })
})
