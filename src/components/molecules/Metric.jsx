import { PeopleIcon } from '../atoms/Icons.jsx'

// One tile in the Assets card: a label, then whatever the card puts inside.
export function Metric({ label, children }) {
  return (
    <div className="metric">
      <span className="metric-label">{label}</span>
      {children}
    </div>
  )
}

// A tile that shows a count with an icon, a note, and an action button.
export function CountMetric({ label, value, note, action }) {
  return (
    <Metric label={label}>
      <span className="metric-num">
        <span className="num-icon">
          <PeopleIcon />
        </span>
        {value}
      </span>
      <span className="metric-sub">{note}</span>
      {action}
    </Metric>
  )
}
