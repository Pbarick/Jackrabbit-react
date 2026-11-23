import { useState } from 'react'
import Button from '../atoms/Button.jsx'
import { TickBigIcon, TriangleIcon } from '../atoms/Icons.jsx'
import RingChart from '../charts/RingChart.jsx'
import { CountMetric, Metric } from '../molecules/Metric.jsx'
import { useAssets } from '../../hooks/useDashboardData.js'

// Assets: tabbed summary of activity, transactions, trades and pending items, plus a completion ring.
export default function AssetsCard({ onViewReports }) {
  const { tabs, sets } = useAssets()
  const [tab, setTab] = useState(0)
  const data = sets[tab]
  const activityText = data.caught ? 'You’re all caught up!' : data.activity

  return (
    <article className="card card-assets" id="card-assets" aria-labelledby="t-assets">
      <div className="assets-main">
        <header className="card-head card-head-assets">
          <h2 id="t-assets">Assets</h2>
          <span className="muted">Last Updated {data.updated}</span>
          <div className="tab-row" role="tablist">
            {tabs.map((label, i) => (
              <button
                key={label}
                type="button"
                className={'tab' + (tab === i ? ' is-active' : '')}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        <div className="card-body" id="assets">
          <div className="metric-grid">
            <Metric label="Rabbit Activity">
              <div className="check-big">{data.caught ? <TickBigIcon /> : <TriangleIcon />}</div>
              <span className="metric-foot">{activityText}</span>
            </Metric>
            <CountMetric
              label="Transactions"
              value={data.tx}
              note={data.txNote}
              action={<Button>Fix Trades</Button>}
            />
            <CountMetric
              label="Trades in Progress"
              value={data.trades}
              note={data.tradesNote}
              action={<Button>View Approvals</Button>}
            />
            <CountMetric
              label="Pending"
              value={data.pending}
              note={data.pendingNote}
              action={<Button>Approve New</Button>}
            />
          </div>
        </div>
      </div>

      <aside className="complete-panel" id="card-complete" aria-labelledby="t-complete">
        <h2 id="t-complete">Complete STATS</h2>
        <p className="muted" id="completeOf">{data.of}</p>
        <div id="complete">
          <RingChart done={data.done} total={data.total} />
        </div>
        <Button variant="outline" size="sm" onClick={onViewReports}>View Complete</Button>
      </aside>
    </article>
  )
}
