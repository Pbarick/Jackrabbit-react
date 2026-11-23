// A ranked list of performers. dir is 'up' (green, rising arrow) or 'down' (red, falling arrow).
export default function PerformerList({ title, rows, dir }) {
  const arrow = dir === 'up' ? '↑' : '↓'
  return (
    <div>
      <h3 className="perf-title">{title}</h3>
      <ul className="performer-list">
        {rows.map((row) => (
          <li className="performer-row" key={row.name}>
            <span>{row.name}</span>
            <span className={`perf-${dir}`}>{arrow} {row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
