import { useRef } from 'react'
import PerformanceCard from '../components/PerformanceCard.jsx'
import AssetsCard from '../components/AssetsCard.jsx'
import TradesCard from '../components/TradesCard.jsx'
import ReportsCard from '../components/ReportsCard.jsx'
import PromoCard from '../components/PromoCard.jsx'

export default function DashboardPage() {
  const reportsRef = useRef(null)

  function viewReports() {
    reportsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="view" aria-label="Dashboard">
      <div className="dashboard-grid">
        <PerformanceCard />
        <AssetsCard onViewReports={viewReports} />
        <TradesCard />
      </div>
      <div className="bottom-grid">
        <ReportsCard ref={reportsRef} />
        <PromoCard onViewReports={viewReports} />
      </div>
    </section>
  )
}
