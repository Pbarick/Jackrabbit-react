import { LOGO_URL } from '../data.js'

function scrollToReports() {
  document.getElementById('card-reports')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function PromoCard() {
  return (
    <article className="card promo" id="card-promo" aria-labelledby="t-promo">
      <img src={LOGO_URL} alt="" className="promo-watermark" aria-hidden="true" />
      <p className="eyebrow">More for you</p>
      <h2 id="t-promo">JACK RABBIT Investments</h2>
      <div className="promo-actions">
        <a href="#" className="link-blue">Learn More</a>
        <button type="button" className="btn-outline btn-sm" onClick={scrollToReports}>View All Reports</button>
      </div>
    </article>
  )
}
