import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import DashboardView from './components/DashboardView.jsx'
import SummaryView from './components/SummaryView.jsx'
import { initialFundChecked } from './data.js'

function currentView() {
  return window.location.hash.replace('#', '') === 'summary' ? 'summary' : 'dashboard'
}

export default function App() {
  const [view, setView] = useState(currentView)
  const [fundChecked, setFundChecked] = useState(initialFundChecked)

  // Hash routing (#dashboard, #summary). Both views stay mounted so their state survives navigation.
  useEffect(() => {
    function onHashChange() {
      setView(currentView())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <>
      <Header
        summaryActive={view === 'summary'}
        fundChecked={fundChecked}
        setFundChecked={setFundChecked}
      />
      <main className="app-main">
        <DashboardView hidden={view !== 'dashboard'} />
        <SummaryView visible={view === 'summary'} />
      </main>
    </>
  )
}
