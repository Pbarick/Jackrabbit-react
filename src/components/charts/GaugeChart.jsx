const CX = 75
const CY = 78
const R = 62

// Semicircle gauge: the arc starts at the left and fills clockwise to pct.
export default function GaugeChart({ pct }) {
  const clamped = Math.max(0, Math.min(100, pct))
  const theta = Math.PI * (1 - clamped / 100)
  const endX = CX + R * Math.cos(theta)
  const endY = CY - R * Math.sin(theta)
  const trackPath = `M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`
  const valuePath = `M${CX - R} ${CY} A${R} ${R} 0 0 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`

  return (
    <svg viewBox="0 0 150 84" role="img" aria-label={`${pct} percent complete`}>
      <path className="gauge-track" d={trackPath} />
      <path className="gauge-value" d={valuePath} />
    </svg>
  )
}
