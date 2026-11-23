import { useLayoutEffect, useRef, useState } from 'react'
import { PERFORMERS_TOP, PERFORMERS_BOTTOM } from '../data.js'
import PerformanceChart from './charts/PerformanceChart.jsx'

const MIN_SIZE = 120

function PerformerList({ title, rows, dir }) {
  const arrow = dir === 'up' ? '↑' : '↓'
  return (
    <div>
      <h3 className="perf-title">{title}</h3>
      <ul className="performer-list">
        {rows.map((r) => (
          <li className="performer-row" key={r.name}>
            <span>{r.name}</span>
            <span className={'perf-' + dir}>{arrow} {r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PerformanceCard() {
  const boxRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // Measure the chart box so the SVG fills the card at any width.
  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el || !window.ResizeObserver) return undefined
    const ro = new ResizeObserver(() => {
      setSize({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const ready = size.w >= MIN_SIZE && size.h >= MIN_SIZE

  return (
    <article className="card card-performance" id="card-performance" aria-labelledby="t-performance">
      <header className="card-head">
        <h2 id="t-performance">Rabbit Performance</h2>
      </header>
      <div className="card-body" id="performance">
        <div className="perf-value">
          <span className="big-number">$7.65</span>
          <span className="delta">{'↗'} 25%</span>
        </div>
        <div className="perf-chart" id="perfChart" ref={boxRef}>
          {ready && <PerformanceChart width={size.w} height={size.h} />}
        </div>
        <div className="performers">
          <PerformerList title="Top Performers" rows={PERFORMERS_TOP} dir="up" />
          <PerformerList title="Bottom Performers" rows={PERFORMERS_BOTTOM} dir="down" />
        </div>
      </div>
    </article>
  )
}
