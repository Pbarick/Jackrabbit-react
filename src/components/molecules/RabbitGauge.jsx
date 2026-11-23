import GaugeChart from '../charts/GaugeChart.jsx'

// Gauge with the percentage under it.
export default function RabbitGauge({ percent }) {
  return (
    <div className="sm-gauge">
      <h2>Rabbit Gauge</h2>
      <div id="gauge">
        <GaugeChart pct={percent} />
        <p className="sm-gauge-text">{percent}%</p>
        <p className="sm-gauge-sub">Complete</p>
      </div>
    </div>
  )
}
