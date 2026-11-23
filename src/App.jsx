import { lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Route-level code splitting: the summary page (and the AG Grid bundle it needs) loads on first visit.
const SummaryPage = lazy(() => import('./pages/SummaryPage.jsx'))

// HashRouter keeps deep links working on GitHub Pages, which has no server fallback.
// URLs look like .../Jackrabbit-react/#/datagrid.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="datagrid" element={<SummaryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
