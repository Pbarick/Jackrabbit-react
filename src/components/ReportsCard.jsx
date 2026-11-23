import { useState } from 'react'
import { REPORTS } from '../data.js'
import { ChevronRightIcon } from '../icons.jsx'

function ReportTile({ label, value, tone }) {
  return (
    <div className={'rd-tile' + (tone ? ' is-' + tone : '')}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  )
}

export default function ReportsCard() {
  const [openRows, setOpenRows] = useState({})

  function toggle(i) {
    setOpenRows((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <article className="card card-reports" id="card-reports" aria-labelledby="t-reports">
      <header className="card-head">
        <h2 id="t-reports">Your Reports</h2>
      </header>
      <div className="card-body" id="reports">
        <ul className="report-list">
          {REPORTS.map((r, i) => {
            const pct = Math.round((r.matched / r.records) * 100)
            const isOpen = !!openRows[i]
            return (
              <li className={'report-item' + (isOpen ? ' is-open' : '')} id={'report-' + i} key={r.name}>
                <div className="report-row">
                  <span className="report-name">
                    {r.name}
                    <span className="report-date">{r.date}</span>
                  </span>
                  <span className="report-last">Last run on {r.lastRun}</span>
                  <button
                    type="button"
                    className="report-toggle"
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                  >
                    View Report
                  </button>
                  <ChevronRightIcon />
                </div>

                <div className="report-detail">
                  <div className="rd-head">
                    <span className={'rd-status is-' + r.tone}>{r.status}</span>
                    <span>Owner: {r.owner}</span>
                  </div>
                  <div className="rd-grid">
                    <ReportTile label="Records" value={r.records.toLocaleString('en-US')} />
                    <ReportTile label="Matched" value={r.matched.toLocaleString('en-US')} />
                    <ReportTile
                      label="Exceptions"
                      value={r.exceptions}
                      tone={r.exceptions > 100 ? 'bad' : 'warn'}
                    />
                    <ReportTile label="Funds covered" value={r.funds} />
                  </div>
                  <div className="rd-match">
                    <div className="rd-match-top"><span>Match rate</span><b>{pct}%</b></div>
                    <div className="rd-bar"><span style={{ width: pct + '%' }}></span></div>
                  </div>
                  <div className="rd-foot">
                    <span>Report date {r.date} {'·'} Last run {r.lastRun}</span>
                    <div className="rd-actions">
                      <button type="button" className="btn-outline btn-sm">Download CSV</button>
                      <button type="button" className="btn-primary btn-sm">Open Report</button>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}
