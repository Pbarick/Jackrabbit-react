import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { initialFundChecked } from '../data.js'

// Shared frame for every page: header on top, the matched page in the outlet.
export default function AppLayout() {
  const [fundChecked, setFundChecked] = useState(initialFundChecked)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header fundChecked={fundChecked} setFundChecked={setFundChecked} />
      <main className="app-main">
        <Outlet />
      </main>
    </>
  )
}
