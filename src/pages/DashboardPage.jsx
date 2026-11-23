import { useRef } from 'react'
import PerformanceCard from '../components/organisms/PerformanceCard.jsx'
import AssetsCard from '../components/organisms/AssetsCard.jsx'
import TradesCard from '../components/organisms/TradesCard.jsx'
import ReportsCard from '../components/organisms/ReportsCard.jsx'
import PromoCard from '../components/organisms/PromoCard.jsx'

export default function DashboardPage() {
  const reportsRef = useRef(null)

  function scrollToReports() {
    reportsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="view" aria-label="Dashboard">
      <div className="dashboard-grid">
        <PerformanceCard />
        <AssetsCard onViewReports={scrollToReports} />
        <TradesCard />
      </div>
      <div className="bottom-grid">
        <ReportsCard ref={reportsRef} />
        <PromoCard onViewReports={scrollToReports} />
      </div>
    </section>
  )
}
