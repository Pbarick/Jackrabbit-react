import GaugeChart from '../charts/GaugeChart.jsx'

export default function RabbitGauge({ pct }) {
  return (
    <div className="sm-gauge">
      <h2>Rabbit Gauge</h2>
      <div id="gauge">
        <GaugeChart pct={pct} />
        <p className="sm-gauge-text">{pct}%</p>
        <p className="sm-gauge-sub">Complete</p>
      </div>
    </div>
  )
}
