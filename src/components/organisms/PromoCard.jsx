import Button from '../atoms/Button.jsx'
import { LOGO_URL } from '../../lib/config.js'

export default function PromoCard({ onViewReports }) {
  return (
    <article className="card promo" id="card-promo" aria-labelledby="t-promo">
      <img src={LOGO_URL} alt="" className="promo-watermark" aria-hidden="true" />
      <p className="eyebrow">More for you</p>
      <h2 id="t-promo">JACK RABBIT Investments</h2>
      <div className="promo-actions">
        <button type="button" className="link-blue link-button">
          Learn More
        </button>
        <Button variant="outline" size="sm" onClick={onViewReports}>
          View All Reports
        </Button>
      </div>
    </article>
  )
}
