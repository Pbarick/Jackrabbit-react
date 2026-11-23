import { forwardRef, useState } from 'react'
import ReportItem from '../molecules/ReportItem.jsx'
import { useReports } from '../../hooks/useDashboardData.js'

// Forwarded ref lets the dashboard scroll to this card.
const ReportsCard = forwardRef(function ReportsCard(props, ref) {
  const reports = useReports()
  const [openIds, setOpenIds] = useState(() => new Set())

  function toggle(index) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <article className="card card-reports" id="card-reports" ref={ref} aria-labelledby="t-reports">
      <header className="card-head">
        <h2 id="t-reports">Your Reports</h2>
      </header>
      <div className="card-body" id="reports">
        <ul className="report-list">
          {reports.map((report, i) => (
            <ReportItem
              key={report.name}
              report={report}
              open={openIds.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </ul>
      </div>
    </article>
  )
})

export default ReportsCard
