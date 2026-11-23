const LEFT = 40
const RIGHT = 16
const TOP = 24
const BOTTOM = 28
const Y_MAX = 120
const AXIS_LINES = [0, 40, 80, 120]

// Shared geometry, also used by the tooltip position in TradesCard.
export function tradeGeometry(width, height, dayCount) {
  const plotW = width - LEFT - RIGHT
  const plotH = height - TOP - BOTTOM
  const slot = plotW / dayCount
  return {
    width,
    height,
    plotH,
    slot,
    barW: slot * 0.42,
    base: TOP + plotH,
    yFor: (v) => TOP + plotH - (v / Y_MAX) * plotH,
    cxFor: (i) => LEFT + slot * i + slot / 2,
  }
}

// Trades combo chart: stacked bars, translucent band, STP line, crosshair.
// Hovering a day calls onHover with its index.
export default function TradesChart({ width, height, counts, stp, dates, activeIndex, onHover }) {
  const g = tradeGeometry(width, height, counts.length)
  const last = counts.length - 1

  const bandPoints = counts.map((c, i) => `${g.cxFor(i).toFixed(1)} ${g.yFor(c).toFixed(1)}`)
  const bandPath = `M${bandPoints.join(' L')} L${g.cxFor(last).toFixed(1)} ${g.base} L${g.cxFor(0).toFixed(1)} ${g.base} Z`

  const stpPoints = stp.map((rate, i) => ({ x: g.cxFor(i), y: g.yFor(rate * 1.2) }))
  const linePoints = stpPoints.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

  const cross = g.cxFor(activeIndex).toFixed(1)
  const crossTop = stpPoints[activeIndex].y.toFixed(1)

  return (
    <svg
      className="chart chart-trades"
      style={{ width, height }}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Trades combo chart"
    >
      <defs>
        <linearGradient id="tradeArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20C8C0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#20C8C0" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="tradeBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3F7BFF" />
          <stop offset="100%" stopColor="#2249C4" />
        </linearGradient>
        <linearGradient id="tradeTeal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BE6DD" />
          <stop offset="100%" stopColor="#17AFA8" />
        </linearGradient>
        <linearGradient id="tradeLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF9A8B" />
        </linearGradient>
      </defs>

      {AXIS_LINES.map((t) => {
        const y = g.yFor(t)
        return (
          <g key={t}>
            <line className="chart-grid" x1={LEFT} x2={width - RIGHT} y1={y} y2={y} />
            <text className="chart-axis" x={LEFT - 8} y={y + 4} textAnchor="end">
              {t}
            </text>
          </g>
        )
      })}

      <path className="trade-area" d={bandPath} />

      {counts.map((count, i) => {
        const x = g.cxFor(i) - g.barW / 2
        const isActive = i === activeIndex
        const lower = Math.round(count * 0.55)
        const yLow = g.yFor(lower)
        const yTop = g.yFor(count)
        const cls = isActive ? ' is-active' : ''
        return (
          <g key={i} onMouseEnter={() => onHover(i)}>
            {/* Full-height hit area so the whole day column responds to hover */}
            <rect
              x={g.cxFor(i) - g.slot / 2}
              y={TOP}
              width={g.slot}
              height={g.plotH}
              fill="transparent"
            />
            <rect
              className={'trade-bar-base' + cls}
              x={x.toFixed(1)}
              y={yLow.toFixed(1)}
              width={g.barW.toFixed(1)}
              height={(g.base - yLow).toFixed(1)}
              rx="2"
            />
            <rect
              className={'trade-bar-top' + cls}
              x={x.toFixed(1)}
              y={yTop.toFixed(1)}
              width={g.barW.toFixed(1)}
              height={(yLow - yTop).toFixed(1)}
              rx="2"
            />
          </g>
        )
      })}

      <line
        className="trade-cross"
        x1={cross}
        x2={cross}
        y1={crossTop}
        y2={g.base}
        pointerEvents="none"
      />

      <polyline className="trade-line" points={linePoints} pointerEvents="none" />

      {stpPoints.map((p, i) => (
        <circle
          key={i}
          className={'trade-dot' + (i === activeIndex ? ' is-active' : '')}
          cx={p.x.toFixed(1)}
          cy={p.y.toFixed(1)}
          r={i === activeIndex ? 5 : 3}
          pointerEvents="none"
        />
      ))}

      {dates.map((_, i) => (
        <text
          key={i}
          className="chart-axis chart-axis-sm"
          x={g.cxFor(i).toFixed(1)}
          y={height - 8}
          textAnchor="middle"
        >
          {`${i + 1} Jun`}
        </text>
      ))}
    </svg>
  )
}
