// SVG chart builders. Each returns an SVG string sized to the box it is drawn in.
// The markup and class names match the plain build, so styles.css applies unchanged.
import { MONTHS, } from './format.js'
import { PERF_BLUE, PERF_GREEN, PERF_DASH, TRADE_COUNTS, TRADE_STP, TRADE_DATES } from './data.js'

function areaDefs() {
  return '<defs><linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#3B82F6" stop-opacity="0.35"/>' +
    '<stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>' +
    "</linearGradient>" +
    '<linearGradient id="lineBlue" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2D6BF0"/><stop offset="100%" stop-color="#4FB3FF"/></linearGradient></defs>'
}

function pathFor(values, xFor, yFor) {
  return values.map((v, i) => (i === 0 ? "M" : "L") + xFor(i).toFixed(1) + " " + yFor(v).toFixed(1)).join(" ")
}

export function performanceChartSVG(w, h) {
  const left = 34, right = 8, top = 10, bottom = 24
  const plotW = w - left - right, plotH = h - top - bottom
  const yFor = (v) => top + plotH - (v / 1500) * plotH
  const xFor = (i) => left + (i * plotW) / (PERF_BLUE.length - 1)

  let grid = "", labels = ""
  ;[0, 500, 1000, 1500].forEach((t) => {
    const y = yFor(t)
    grid += '<line class="chart-grid" x1="' + left + '" x2="' + (w - right) + '" y1="' + y + '" y2="' + y + '"/>'
    labels += '<text class="chart-axis" x="' + (left - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + t + "</text>"
  })

  const bluePath = pathFor(PERF_BLUE, xFor, yFor)
  const areaPath = bluePath + " L" + xFor(PERF_BLUE.length - 1).toFixed(1) + " " + yFor(0).toFixed(1) +
    " L" + xFor(0).toFixed(1) + " " + yFor(0).toFixed(1) + " Z"

  let monthLabels = ""
  MONTHS.forEach((mo, i) => {
    monthLabels += '<text class="chart-axis chart-axis-sm" x="' + xFor(i).toFixed(1) + '" y="' + (h - 6) + '" text-anchor="middle">' + mo + "</text>"
  })

  return '<svg class="chart" style="width:' + w + "px;height:" + h + 'px" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="Rabbit performance chart">' +
    areaDefs() + grid + labels +
    '<path class="chart-area-blue" d="' + areaPath + '"/>' +
    '<path class="chart-line-blue" d="' + bluePath + '"/>' +
    '<path class="chart-line-green" d="' + pathFor(PERF_GREEN, xFor, yFor) + '"/>' +
    '<path class="chart-line-dash" d="' + pathFor(PERF_DASH, xFor, yFor) + '"/>' +
    monthLabels +
    "</svg>"
}

// Trades combo chart geometry: stacked bars, translucent band, STP line.
export function tradeGeometry(w, h) {
  const left = 40, right = 16, top = 24, bottom = 28
  const plotW = w - left - right, plotH = h - top - bottom
  const slot = plotW / TRADE_COUNTS.length
  return {
    w, h, left, right, top, plotH,
    slot, barW: slot * 0.42,
    yFor: (v) => top + plotH - (v / 120) * plotH,
    cxFor: (i) => left + slot * i + slot / 2,
  }
}

export function tradeChartSVG(w, h, activeIndex) {
  const g = tradeGeometry(w, h)
  const base = g.yFor(0)

  let axis = ""
  ;[0, 40, 80, 120].forEach((t) => {
    const y = g.yFor(t)
    axis += '<line class="chart-grid" x1="' + g.left + '" x2="' + (g.w - g.right) + '" y1="' + y + '" y2="' + y + '"/>'
    axis += '<text class="chart-axis" x="' + (g.left - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + t + "</text>"
  })

  const bandTop = TRADE_COUNTS.map((c, i) => g.cxFor(i).toFixed(1) + " " + g.yFor(c).toFixed(1))
  const bandPath = "M" + bandTop.join(" L") + " L" + g.cxFor(TRADE_COUNTS.length - 1).toFixed(1) + " " + base.toFixed(1) +
    " L" + g.cxFor(0).toFixed(1) + " " + base.toFixed(1) + " Z"

  let bars = ""
  TRADE_COUNTS.forEach((count, i) => {
    const x = g.cxFor(i) - g.barW / 2
    const active = i === activeIndex
    const lower = Math.round(count * 0.55)
    const yLow = g.yFor(lower)
    const yTop = g.yFor(count)
    bars += '<rect class="trade-bar-base' + (active ? " is-active" : "") + '" data-trade="' + i +
      '" x="' + x.toFixed(1) + '" y="' + yLow.toFixed(1) + '" width="' + g.barW.toFixed(1) +
      '" height="' + (base - yLow).toFixed(1) + '" rx="2"/>'
    bars += '<rect class="trade-bar-top' + (active ? " is-active" : "") + '" data-trade="' + i +
      '" x="' + x.toFixed(1) + '" y="' + yTop.toFixed(1) + '" width="' + g.barW.toFixed(1) +
      '" height="' + (yLow - yTop).toFixed(1) + '" rx="2"/>'
  })

  const linePts = []
  let dots = ""
  TRADE_STP.forEach((rate, i) => {
    const cx = g.cxFor(i)
    const cy = g.yFor(rate * 1.2)
    linePts.push(cx.toFixed(1) + " " + cy.toFixed(1))
    dots += '<circle class="trade-dot' + (i === activeIndex ? " is-active" : "") + '" cx="' +
      cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + (i === activeIndex ? 5 : 3) + '"/>'
  })

  const cross = g.cxFor(activeIndex)
  const crossY = g.yFor(TRADE_STP[activeIndex] * 1.2)
  const crosshair = '<line class="trade-cross" x1="' + cross.toFixed(1) + '" x2="' + cross.toFixed(1) +
    '" y1="' + crossY.toFixed(1) + '" y2="' + base.toFixed(1) + '"/>'

  let dayLabels = ""
  TRADE_DATES.forEach((d, i) => {
    dayLabels += '<text class="chart-axis chart-axis-sm" x="' + g.cxFor(i).toFixed(1) + '" y="' + (g.h - 8) +
      '" text-anchor="middle">' + (i + 1) + " Jun</text>"
  })

  return '<svg class="chart chart-trades" style="width:' + g.w + "px;height:" + g.h + 'px" viewBox="0 0 ' + g.w + " " + g.h + '" role="img" aria-label="Trades combo chart">' +
    '<defs><linearGradient id="tradeArea" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#20C8C0" stop-opacity="0.22"/>' +
      '<stop offset="100%" stop-color="#20C8C0" stop-opacity="0.02"/>' +
    "</linearGradient>" +
      '<linearGradient id="tradeBlue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3F7BFF"/><stop offset="100%" stop-color="#2249C4"/></linearGradient>' +
      '<linearGradient id="tradeTeal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5BE6DD"/><stop offset="100%" stop-color="#17AFA8"/></linearGradient>' +
      '<linearGradient id="tradeLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#FF6B6B"/><stop offset="100%" stop-color="#FF9A8B"/></linearGradient></defs>' +
    axis +
    '<path class="trade-area" d="' + bandPath + '"/>' +
    bars + crosshair +
    '<polyline class="trade-line" points="' + linePts.join(" ") + '"/>' +
    dots + dayLabels +
    "</svg>"
}

export function ringSVG(done, total) {
  const pct = total ? Math.max(0, Math.min(100, (done / total) * 100)) : 0
  const r = 52, c = 2 * Math.PI * r
  const dash = (pct / 100) * c
  return '<svg class="ring" viewBox="0 0 120 120" role="img" aria-label="' + done + " of " + total + ' complete">' +
    '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="#1FC7BE"/><stop offset="100%" stop-color="#7BE8E2"/>' +
    "</linearGradient></defs>" +
    '<circle class="ring-track" cx="60" cy="60" r="' + r + '"/>' +
    '<circle class="ring-value" cx="60" cy="60" r="' + r + '" stroke-dasharray="' + dash.toFixed(2) + " " + c.toFixed(2) + '"/>' +
    '<text class="ring-text" x="60" y="58">' + done + "</text>" +
    '<text class="ring-sub" x="60" y="74">of ' + total + "</text>" +
    "</svg>"
}

// Semicircle gauge for the summary page (arc starts at the left).
export function semicircleSVG(pct) {
  const cx = 75, cy = 78, r = 62
  const theta = Math.PI * (1 - Math.max(0, Math.min(100, pct)) / 100)
  const ex = cx + r * Math.cos(theta), ey = cy - r * Math.sin(theta)
  const track = "M" + (cx - r) + " " + cy + " A" + r + " " + r + " 0 0 1 " + (cx + r) + " " + cy
  const value = "M" + (cx - r) + " " + cy + " A" + r + " " + r + " 0 0 1 " + ex.toFixed(2) + " " + ey.toFixed(2)
  return '<svg viewBox="0 0 150 84" role="img" aria-label="' + pct + ' percent complete">' +
    '<path class="gauge-track" d="' + track + '"/>' +
    '<path class="gauge-value" d="' + value + '"/>' +
    "</svg>"
}
