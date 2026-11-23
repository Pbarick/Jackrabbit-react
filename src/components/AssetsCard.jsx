import { useState } from 'react'
import { ASSET_SETS, ASSET_TABS } from '../data.js'
import RingChart from './charts/RingChart.jsx'
import { PeopleIcon, TickBigIcon, TriangleIcon } from '../icons.jsx'

export default function AssetsCard({ onViewReports }) {
  const [tab, setTab] = useState(0)
  const d = ASSET_SETS[tab]
  const activityText = d.caught ? 'You’re all caught up!' : d.activity

  return (
    <article className="card card-assets" id="card-assets" aria-labelledby="t-assets">
      <div className="assets-main">
        <header className="card-head card-head-assets">
          <h2 id="t-assets">Assets</h2>
          <span className="muted">Last Updated {d.updated}</span>
          <div className="tab-row" role="tablist">
            {ASSET_TABS.map((label, i) => (
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
            <div className="metric">
              <span className="metric-label">Rabbit Activity</span>
              <div className="check-big">{d.caught ? <TickBigIcon /> : <TriangleIcon />}</div>
              <span className="metric-foot">{activityText}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Transactions</span>
              <span className="metric-num"><span className="num-icon"><PeopleIcon /></span>{d.tx}</span>
              <span className="metric-sub">{d.txNote}</span>
              <button type="button" className="btn-primary">Fix Trades</button>
            </div>
            <div className="metric">
              <span className="metric-label">Trades in Progress</span>
              <span className="metric-num"><span className="num-icon"><PeopleIcon /></span>{d.trades}</span>
              <span className="metric-sub">{d.tradesNote}</span>
              <button type="button" className="btn-primary">View Approvals</button>
            </div>
            <div className="metric">
              <span className="metric-label">Pending</span>
              <span className="metric-num"><span className="num-icon"><PeopleIcon /></span>{d.pending}</span>
              <span className="metric-sub">{d.pendingNote}</span>
              <button type="button" className="btn-primary">Approve New</button>
            </div>
          </div>
        </div>
      </div>

      <aside className="complete-panel" id="card-complete" aria-labelledby="t-complete">
        <h2 id="t-complete">Complete STATS</h2>
        <p className="muted" id="completeOf">{d.of}</p>
        <div id="complete">
          <RingChart done={d.done} total={d.total} />
        </div>
        <button type="button" className="btn-outline btn-sm" onClick={onViewReports}>View Complete</button>
      </aside>
    </article>
  )
}
