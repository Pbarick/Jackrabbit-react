import { useLayoutEffect, useRef, useState } from 'react'
import { TRADE_COUNTS, TRADE_DATES, TRADE_STP } from '../data.js'
import { tradeChartSVG, tradeGeometry } from '../charts.js'

// Min sizes match the plain build: 560px wide (scrolls sideways on narrow screens), 120px tall.
const MIN_W = 560
const MIN_H = 120

export default function TradesCard() {
  const bodyRef = useRef(null)
  const [active, setActive] = useState(2)
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

  const g = tradeGeometry(size.w, size.h)
  const tooltipLeft = g.cxFor(active).toFixed(1)
  const html =
    '<div class="trade-chart" id="tradeChart">' +
      tradeChartSVG(size.w, size.h, active) +
      '<div class="trade-tooltip" id="tradeTooltip" style="left:' + tooltipLeft + 'px">' +
        '<div class="tt-date">' + TRADE_DATES[active] + '</div>' +
        '<div class="tt-main">' + TRADE_COUNTS[active] + ' Trades<span class="tt-chip">' + TRADE_STP[active] + '% STP Rate</span></div>' +
      '</div>' +
    '</div>'

  // Hovering a bar makes it the active day; the chart and tooltip redraw from state.
  function onMouseOver(e) {
    const bar = e.target.closest ? e.target.closest('[data-trade]') : null
    if (!bar) return
    setActive(Number(bar.getAttribute('data-trade')))
  }

  return (
    <article className="card card-trades" id="card-trades" aria-labelledby="t-trades">
      <header className="card-head">
        <h2 id="t-trades">Trades</h2>
      </header>
      <div
        className="card-body"
        id="trades"
        ref={bodyRef}
        onMouseOver={onMouseOver}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}
