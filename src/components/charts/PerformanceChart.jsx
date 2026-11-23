import { MONTHS } from '../../lib/format.js'

const LEFT = 34
const RIGHT = 8
const TOP = 10
const BOTTOM = 24
const Y_MAX = 1500
const GRID_LINES = [0, 500, 1000, 1500]

function linePath(values, xFor, yFor) {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`)
    .join(' ')
}

// Rabbit performance chart: blue area and line, green and dashed comparison lines.
export default function PerformanceChart({ width, height, series }) {
  const plotW = width - LEFT - RIGHT
  const plotH = height - TOP - BOTTOM
  const yFor = (v) => TOP + plotH - (v / Y_MAX) * plotH
  const xFor = (i) => LEFT + (i * plotW) / (series.blue.length - 1)

  const bluePath = linePath(series.blue, xFor, yFor)
  const lastX = xFor(series.blue.length - 1).toFixed(1)
  const firstX = xFor(0).toFixed(1)
  const baseY = yFor(0).toFixed(1)
  const areaPath = `${bluePath} L${lastX} ${baseY} L${firstX} ${baseY} Z`

  return (
    <svg
      className="chart"
      style={{ width, height }}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Rabbit performance chart"
    >
      <defs>
        <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2D6BF0" />
          <stop offset="100%" stopColor="#4FB3FF" />
        </linearGradient>
      </defs>

      {GRID_LINES.map((t) => {
        const y = yFor(t)
        return (
          <g key={t}>
            <line className="chart-grid" x1={LEFT} x2={width - RIGHT} y1={y} y2={y} />
            <text className="chart-axis" x={LEFT - 8} y={y + 4} textAnchor="end">
              {t}
            </text>
          </g>
        )
      })}

      <path className="chart-area-blue" d={areaPath} />
      <path className="chart-line-blue" d={bluePath} />
      <path className="chart-line-green" d={linePath(series.green, xFor, yFor)} />
      <path className="chart-line-dash" d={linePath(series.dash, xFor, yFor)} />

      {MONTHS.map((mo, i) => (
        <text
          key={mo}
          className="chart-axis chart-axis-sm"
          x={xFor(i).toFixed(1)}
          y={height - 6}
          textAnchor="middle"
        >
          {mo}
        </text>
      ))}
    </svg>
  )
}
