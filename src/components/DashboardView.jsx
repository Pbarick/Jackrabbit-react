import PerformanceCard from './PerformanceCard.jsx'
import AssetsCard from './AssetsCard.jsx'
import TradesCard from './TradesCard.jsx'
import ReportsCard from './ReportsCard.jsx'
import PromoCard from './PromoCard.jsx'

export default function DashboardView({ hidden }) {
  return (
    <section className="view" aria-label="Dashboard" hidden={hidden}>
      <div className="dashboard-grid">
        <PerformanceCard />
        <AssetsCard />
        <TradesCard />
      </div>
      <div className="bottom-grid">
        <ReportsCard />
        <PromoCard />
      </div>
    </section>
  )
}
