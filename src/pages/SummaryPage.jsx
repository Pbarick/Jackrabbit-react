import { useState } from 'react'
import { Link } from 'react-router-dom'
import SummaryGrid from '../components/SummaryGrid.jsx'
import Stepper from '../components/summary/Stepper.jsx'
import RabbitGauge from '../components/summary/RabbitGauge.jsx'
import LiveSwitch from '../components/summary/LiveSwitch.jsx'
import { ROWS, STAGES } from '../data.js'
import { SlidersIcon } from '../icons.jsx'

const STAGE_LABELS = ['All', ...STAGES]

export default function SummaryPage() {
  const [stage, setStage] = useState('All')
  const [live, setLive] = useState(true)
  const [footNote, setFootNote] = useState('')

  const counts = { All: ROWS.length }
  STAGES.forEach((s) => { counts[s] = ROWS.filter((r) => r.stage === s).length })

  function chooseStage(label) {
    setStage(label)
    setFootNote('')
  }

  return (
    <section className="view" aria-label="Summary">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
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

        <RabbitGauge pct={17} />
      </div>

      <div className="sm-tabs-row">
        <div className="sm-tabs" role="tablist">
          <button type="button" className="sm-tab" role="tab" aria-selected="false">Rabbit Tab 1</button>
          <button type="button" className="sm-tab is-active" role="tab" aria-selected="true">Rabbit Tab 1</button>
        </div>
        <LiveSwitch live={live} onChange={setLive} />
      </div>

      <div className="sm-filters" id="statusFilters" role="group" aria-label="Filter by stage">
        {STAGE_LABELS.map((label) => (
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
          onAction={(id) => setFootNote('Opened report for row ' + id)}
        />
        <div className="sm-foot muted" id="gridFoot">
          Showing {stage === 'All' ? ROWS.length : counts[stage]} rows{footNote ? '. ' + footNote : ''}.
        </div>
      </div>
    </section>
  )
}
