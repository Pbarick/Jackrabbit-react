import { STEPS, STEP_ACTIVE } from '../../data.js'
import { CheckIcon } from '../../icons.jsx'

// Pipeline stepper: steps before STEP_ACTIVE are done, that step is active, the rest are not started.
export default function Stepper() {
  const last = STEPS.length - 1
  return (
    <ol className="sm-steps" id="stepper">
      {STEPS.map((s, i) => {
        const nodeState = i < STEP_ACTIVE ? 'is-done' : i === STEP_ACTIVE ? 'is-active' : ''
        const segState =
          i < STEP_ACTIVE ? 'is-done' : i <= STEP_ACTIVE + 1 && i < last ? 'is-active' : 'is-future'
        return (
          <li className="sm-step" key={s.title}>
            <span className="sm-step-label">{s.title}</span>
            <div className="sm-node-row">
              <span className={'sm-node ' + nodeState}>
                {i < STEP_ACTIVE && <CheckIcon />}
              </span>
              {i < last && <span className={'sm-seg ' + segState}></span>}
            </div>
            {s.num && (
              <div className={'sm-count' + (s.upper ? ' is-upper' : '')}>
                <b>{s.num}</b>
                <span>{s.label}</span>
              </div>
            )}
            {(i === 1 || i === 3 || i === 6) && <span className="sm-divider"></span>}
          </li>
        )
      })}
    </ol>
  )
}
