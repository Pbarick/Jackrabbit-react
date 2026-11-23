import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SummaryGrid from '../components/organisms/SummaryGrid.jsx'
import Stepper from '../components/molecules/Stepper.jsx'
import RabbitGauge from '../components/molecules/RabbitGauge.jsx'
import LiveSwitch from '../components/molecules/LiveSwitch.jsx'
import StageFilters from '../components/molecules/StageFilters.jsx'
import { SlidersIcon } from '../components/atoms/Icons.jsx'
import { getRows } from '../data/liveRows.js'
import { useAccountTotal, useGaugePercent, useStages, useStepper } from '../hooks/useDashboardData.js'

// Summary page (the "Rabbit Datagrid"). Lazy-loaded from App.jsx, so AG Grid ships only with this page.
export default function SummaryPage() {
  const stages = useStages()
  const stepper = useStepper()
  const account = useAccountTotal()
  const gaugePercent = useGaugePercent()

  const [stage, setStage] = useState('All')
  const [live, setLive] = useState(true)
  const [footNote, setFootNote] = useState('')

  const stageLabels = useMemo(() => ['All', ...stages], [stages])
  const counts = useMemo(() => {
    const rows = getRows()
    const result = { All: rows.length }
    stages.forEach((s) => { result[s] = rows.filter((r) => r.stage === s).length })
    return result
  }, [stages])

  function chooseStage(label) {
    setStage(label)
    setFootNote('')
  }

  const shownCount = counts[stage]

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
          <p className="sm-value">{account.value} <span>{account.unit}</span></p>
          <p className="sm-delta">{'↗'} {account.delta}</p>
        </div>

        <div className="sm-stepper">
          <Stepper steps={stepper.steps} active={stepper.active} />
        </div>

        <RabbitGauge percent={gaugePercent} />
      </div>

      <div className="sm-tabs-row">
        <div className="sm-tabs" role="tablist">
          <button type="button" className="sm-tab" role="tab" aria-selected="false">Rabbit Tab 1</button>
          <button type="button" className="sm-tab is-active" role="tab" aria-selected="true">Rabbit Tab 1</button>
        </div>
        <LiveSwitch live={live} onChange={setLive} />
      </div>

      <StageFilters labels={stageLabels} counts={counts} active={stage} onChange={chooseStage} />

      <div className="sm-grid">
        <SummaryGrid
          stage={stage}
          live={live}
          onAction={(id) => setFootNote(`Opened report for row ${id}`)}
        />
        <div className="sm-foot muted" id="gridFoot">
          Showing {shownCount} rows{footNote ? `. ${footNote}` : ''}.
        </div>
      </div>
    </section>
  )
}
