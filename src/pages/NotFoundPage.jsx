import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="view" aria-label="Page not found">
      <div className="error-panel">
        <h2>Page not found</h2>
        <p className="muted">That page doesn’t exist in this dashboard.</p>
        <Link to="/" className="link-blue">Back to the dashboard</Link>
      </div>
    </section>
  )
}
