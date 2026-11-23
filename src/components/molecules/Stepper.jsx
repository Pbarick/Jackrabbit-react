import { CheckIcon } from '../atoms/Icons.jsx'

// Pipeline stepper. Steps before `active` are done, the active one is in progress, the rest are not started.
export default function Stepper({ steps, active }) {
  const last = steps.length - 1
  return (
    <ol className="sm-steps" id="stepper">
      {steps.map((step, i) => {
        const nodeState = i < active ? 'is-done' : i === active ? 'is-active' : ''
        const segState =
          i < active ? 'is-done' : i <= active + 1 && i < last ? 'is-active' : 'is-future'
        return (
          <li className="sm-step" key={step.title}>
            <span className="sm-step-label">{step.title}</span>
            <div className="sm-node-row">
              <span className={`sm-node ${nodeState}`}>{i < active && <CheckIcon />}</span>
              {i < last && <span className={`sm-seg ${segState}`}></span>}
            </div>
            {step.num && (
              <div className={'sm-count' + (step.upper ? ' is-upper' : '')}>
                <b>{step.num}</b>
                <span>{step.label}</span>
              </div>
            )}
            {(i === 1 || i === 3 || i === 6) && <span className="sm-divider"></span>}
          </li>
        )
      })}
    </ol>
  )
}
