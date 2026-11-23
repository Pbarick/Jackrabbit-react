import FundFilter from './FundFilter.jsx'
import DatePicker from './DatePicker.jsx'
import { LOGO_URL } from '../data.js'
import { InsightsIcon, AccountIcon, TasksIcon, AppsIcon } from '../icons.jsx'

export default function Header({ summaryActive, fundChecked, setFundChecked }) {
  return (
    <header className="app-header">
      <div className="header-row">
        <a href="#dashboard" className="brand" aria-label="Jack Rabbit home">
          <img src={LOGO_URL} alt="Rabbit Run logo" className="brand-logo" />
          <span className="brand-name">Jack Rabbit</span>
        </a>

        <div className="header-controls">
          <div className="fund-group">
            <FundFilter checked={fundChecked} setChecked={setFundChecked} />
            <span className="fund-divider" aria-hidden="true"></span>
            <DatePicker />
          </div>

          <a
            href="#summary"
            className={'btn-primary btn-sm btn-link' + (summaryActive ? ' is-active' : '')}
          >
            Rabbit Datagrid
          </a>

          <button type="button" className="icon-btn" aria-label="Insights"><InsightsIcon /></button>
          <button type="button" className="icon-btn" aria-label="Account"><AccountIcon /></button>
          <button type="button" className="icon-btn has-badge" aria-label="Tasks, 12 open">
            <TasksIcon />
            <span className="badge">12</span>
          </button>
          <button type="button" className="icon-btn" aria-label="Apps"><AppsIcon /></button>
        </div>
      </div>
    </header>
  )
}
