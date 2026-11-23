import { useState } from 'react'
import SummaryGrid from './SummaryGrid.jsx'
import { ROWS, STAGES, STEPS, STEP_ACTIVE } from '../data.js'
import { semicircleSVG } from '../charts.js'
import { CheckIcon, SlidersIcon } from '../icons.jsx'

function Stepper() {
  const last = STEPS.length - 1
  return (
    <ol className="sm-steps" id="stepper">
      {STEPS.map((s, i) => {
        const nodeState = i < STEP_ACTIVE ? 'is-done' : i === STEP_ACTIVE ? 'is-active' : ''
        const segState = i < STEP_ACTIVE ? 'is-done' : (i <= STEP_ACTIVE + 1 && i < last) ? 'is-active' : 'is-future'
        return (
          <li className="sm-step" key={s.title}>
            <span className="sm-step-label">{s.title}</span>
            <div className="sm-node-row">
              <span className={'sm-node ' + nodeState}>{i < STEP_ACTIVE && <CheckIcon />}</span>
              {i < last && <span className={'sm-seg ' + segState}></span>}
            </div>
            {s.num && (
              <div className={'sm-count' + (s.upper ? ' is-upper' : '')}>
                <b>{s.num}</b><span>{s.label}</span>
              </div>
            )}
            {(i === 1 || i === 3 || i === 6) && <span className="sm-divider"></span>}
          </li>
        )
      })}
    </ol>
  )
}

function Gauge() {
  return (
    <div className="sm-gauge">
      <h2>Rabbit Gauge</h2>
      <div
        id="gauge"
        dangerouslySetInnerHTML={{
          __html: semicircleSVG(17) + '<p class="sm-gauge-text">17%</p><p class="sm-gauge-sub">Complete</p>',
        }}
      />
    </div>
  )
}

export default function SummaryView({ visible }) {
  const [stage, setStage] = useState('All')
  const [live, setLive] = useState(true)
  const [footNote, setFootNote] = useState('')

  const stageLabels = ['All', ...STAGES]
  const counts = { All: ROWS.length }
  STAGES.forEach((s) => { counts[s] = ROWS.filter((r) => r.stage === s).length })
  const shownCount = stage === 'All' ? ROWS.length : counts[stage]

  function chooseStage(label) {
    setStage(label)
    setFootNote('')
  }

  return (
    <section className="view" aria-label="Summary" hidden={!visible}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="#dashboard">Home</a>
        <span aria-hidden="true">&gt;</span>
        <span>Summary</span>
      </nav>

      <div className="sm-top">
        <div className="sm-account">
          <div className="sm-acc-head">
            <h2>Account Total</h2>
            <SlidersIcon />
          </div>
          <p className="sm-value">$7.65 <span>B</span></p>
          <p className="sm-delta">{'↗'} 2.5%</p>
        </div>

        <div className="sm-stepper">
          <Stepper />
        </div>

        <Gauge />
      </div>

      <div className="sm-tabs-row">
        <div className="sm-tabs" role="tablist">
          <button type="button" className="sm-tab" role="tab" aria-selected="false">Rabbit Tab 1</button>
          <button type="button" className="sm-tab is-active" role="tab" aria-selected="true">Rabbit Tab 1</button>
        </div>
        <label className="sm-switch">
          <input type="checkbox" id="liveToggle" checked={live} onChange={(e) => setLive(e.target.checked)} />
          <span className="sm-switch-track" aria-hidden="true">
            <span className="sm-switch-knob">
              <svg className="sw-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
              <svg className="sw-tick" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
          </span>
          <span id="liveLabel">{live ? 'On' : 'Off'}</span>
        </label>
      </div>

      <div className="sm-filters" id="statusFilters" role="group" aria-label="Filter by stage">
        {stageLabels.map((label) => (
          <button
            type="button"
            key={label}
            className={'sm-filter' + (stage === label ? ' is-active' : '')}
            onClick={() => chooseStage(label)}
          >
            {label} ({counts[label]})
          </button>
        ))}
      </div>

      <div className="sm-grid">
        <SummaryGrid
          stage={stage}
          live={live}
          visible={visible}
          onAction={(id) => setFootNote('Opened report for row ' + id)}
        />
        <div className="sm-foot muted" id="gridFoot">
          Showing {shownCount} rows{footNote ? '. ' + footNote : ''}.
        </div>
      </div>
    </section>
  )
}
