import { useRef } from 'react'
import PerformanceChart from '../charts/PerformanceChart.jsx'
import PerformerList from '../molecules/PerformerList.jsx'
import { usePerformance } from '../../hooks/useDashboardData.js'
import { useElementSize } from '../../hooks/useElementSize.js'

const MIN_CHART_SIZE = 120

export default function PerformanceCard() {
  const data = usePerformance()
  const chartBox = useRef(null)
  const { width, height } = useElementSize(chartBox)
  const chartReady = width >= MIN_CHART_SIZE && height >= MIN_CHART_SIZE

  return (
    <article className="card card-performance" id="card-performance" aria-labelledby="t-performance">
      <header className="card-head">
        <h2 id="t-performance">Rabbit Performance</h2>
      </header>
      <div className="card-body" id="performance">
        <div className="perf-value">
          <span className="big-number">{data.value}</span>
          <span className="delta">{'↗'} {data.delta}</span>
        </div>
        <div className="perf-chart" id="perfChart" ref={chartBox}>
          {chartReady && <PerformanceChart width={width} height={height} series={data.series} />}
        </div>
        <div className="performers">
          <PerformerList title="Top Performers" rows={data.topPerformers} dir="up" />
          <PerformerList title="Bottom Performers" rows={data.bottomPerformers} dir="down" />
        </div>
      </div>
    </article>
  )
}
