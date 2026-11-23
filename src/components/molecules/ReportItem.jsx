import { ChevronRightIcon } from '../atoms/Icons.jsx'

function ReportTile({ label, value, tone }) {
  return (
    <div className={'rd-tile' + (tone ? ` is-${tone}` : '')}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  )
}

// One report row. Expands to show the detail panel when open.
export default function ReportItem({ report, open, onToggle }) {
  const matchRate = Math.round((report.matched / report.records) * 100)
  return (
    <li className={'report-item' + (open ? ' is-open' : '')}>
      <div className="report-row">
        <span className="report-name">
          {report.name}
          <span className="report-date">{report.date}</span>
        </span>
        <span className="report-last">Last run on {report.lastRun}</span>
        <button type="button" className="report-toggle" aria-expanded={open} onClick={onToggle}>
          View Report
        </button>
        <ChevronRightIcon />
      </div>

      <div className="report-detail">
        <div className="rd-head">
          <span className={`rd-status is-${report.tone}`}>{report.status}</span>
          <span>Owner: {report.owner}</span>
        </div>
        <div className="rd-grid">
          <ReportTile label="Records" value={report.records.toLocaleString('en-US')} />
          <ReportTile label="Matched" value={report.matched.toLocaleString('en-US')} />
          <ReportTile label="Exceptions" value={report.exceptions} tone={report.exceptions > 100 ? 'bad' : 'warn'} />
          <ReportTile label="Funds covered" value={report.funds} />
        </div>
        <div className="rd-match">
          <div className="rd-match-top"><span>Match rate</span><b>{matchRate}%</b></div>
          <div className="rd-bar"><span style={{ width: `${matchRate}%` }}></span></div>
        </div>
        <div className="rd-foot">
          <span>Report date {report.date} {'·'} Last run {report.lastRun}</span>
          <div className="rd-actions">
            <button type="button" className="btn-outline btn-sm">Download CSV</button>
            <button type="button" className="btn-primary btn-sm">Open Report</button>
          </div>
        </div>
      </div>
    </li>
  )
}
