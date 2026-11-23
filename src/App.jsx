import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import SummaryPage from './pages/SummaryPage.jsx'

// HashRouter keeps routes working on GitHub Pages, which has no server-side fallback
// for deep links. URLs look like .../Jackrabbit-react/#/datagrid.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="datagrid" element={<SummaryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
