import { useLayoutEffect, useRef, useState } from 'react'
import { TRADE_COUNTS, TRADE_DATES, TRADE_STP } from '../data.js'
import TradesChart, { tradeGeometry } from './charts/TradesChart.jsx'

// Minimum size: 560px wide (scrolls sideways on narrow screens), 120px tall.
const MIN_W = 560
const MIN_H = 120
const DEFAULT_ACTIVE = 2

export default function TradesCard() {
  const bodyRef = useRef(null)
  const [active, setActive] = useState(DEFAULT_ACTIVE)
  const [size, setSize] = useState({ w: MIN_W, h: MIN_H })

  useLayoutEffect(() => {
    const el = bodyRef.current
    if (!el || !window.ResizeObserver) return undefined
    const ro = new ResizeObserver(() => {
      setSize({
        w: Math.max(MIN_W, Math.round(el.clientWidth)),
        h: Math.max(MIN_H, Math.round(el.clientHeight)),
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const geometry = tradeGeometry(size.w, size.h)

  return (
    <article className="card card-trades" id="card-trades" aria-labelledby="t-trades">
      <header className="card-head">
        <h2 id="t-trades">Trades</h2>
      </header>
      <div className="card-body" id="trades" ref={bodyRef}>
        <div className="trade-chart" id="tradeChart">
          <TradesChart
            width={size.w}
            height={size.h}
            activeIndex={active}
            onHover={setActive}
          />
          <div className="trade-tooltip" id="tradeTooltip" style={{ left: geometry.cxFor(active) }}>
            <div className="tt-date">{TRADE_DATES[active]}</div>
            <div className="tt-main">
              {TRADE_COUNTS[active]} Trades
              <span className="tt-chip">{TRADE_STP[active]}% STP Rate</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
