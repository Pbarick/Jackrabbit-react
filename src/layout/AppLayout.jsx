import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/organisms/Header.jsx'
import ErrorBoundary from '../components/ErrorBoundary.jsx'
import { FundFilterProvider } from '../context/FundFilterContext.jsx'

// Shared frame for every page: header on top, then the matched page.
// Each page renders inside its own error boundary and loading fallback.
export default function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <FundFilterProvider>
      <Header />
      <main className="app-main">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<p className="muted loading" role="status">Loading…</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </FundFilterProvider>
  )
}
