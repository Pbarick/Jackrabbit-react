import { useRef, useState } from 'react'
import TradesChart, { tradeGeometry } from '../charts/TradesChart.jsx'
import { useTrades } from '../../hooks/useDashboardData.js'
import { useElementSize } from '../../hooks/useElementSize.js'

// Below these sizes the chart would be unreadable, so it scrolls sideways instead.
const MIN_WIDTH = 560
const MIN_HEIGHT = 120
const DEFAULT_DAY = 2

export default function TradesCard() {
  const { dates, counts, stp } = useTrades()
  const body = useRef(null)
  const measured = useElementSize(body)
  const [active, setActive] = useState(DEFAULT_DAY)

  const width = Math.max(MIN_WIDTH, measured.width)
  const height = Math.max(MIN_HEIGHT, measured.height)
  const geometry = tradeGeometry(width, height, counts.length)

  return (
    <article className="card card-trades" id="card-trades" aria-labelledby="t-trades">
      <header className="card-head">
        <h2 id="t-trades">Trades</h2>
      </header>
      <div className="card-body" id="trades" ref={body}>
        <div className="trade-chart" id="tradeChart">
          <TradesChart
            width={width}
            height={height}
            counts={counts}
            stp={stp}
            dates={dates}
            activeIndex={active}
            onHover={setActive}
          />
          <div className="trade-tooltip" id="tradeTooltip" style={{ left: geometry.cxFor(active) }}>
            <div className="tt-date">{dates[active]}</div>
            <div className="tt-main">
              {counts[active]} Trades
              <span className="tt-chip">{stp[active]}% STP Rate</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
