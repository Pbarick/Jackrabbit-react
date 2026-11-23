const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Circular progress ring with the done count in the middle.
export default function RingChart({ done, total }) {
  const pct = total ? Math.max(0, Math.min(100, (done / total) * 100)) : 0
  const dash = (pct / 100) * CIRCUMFERENCE

  return (
    <svg className="ring" viewBox="0 0 120 120" role="img" aria-label={`${done} of ${total} complete`}>
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1FC7BE" />
          <stop offset="100%" stopColor="#7BE8E2" />
        </linearGradient>
      </defs>
      <circle className="ring-track" cx="60" cy="60" r={RADIUS} />
      <circle
        className="ring-value"
        cx="60"
        cy="60"
        r={RADIUS}
        strokeDasharray={`${dash.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
      />
      <text className="ring-text" x="60" y="58">{done}</text>
      <text className="ring-sub" x="60" y="74">of {total}</text>
    </svg>
  )
}
