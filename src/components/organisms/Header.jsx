import { NavLink } from 'react-router-dom'
import FundFilter from '../molecules/FundFilter.jsx'
import DatePicker from '../molecules/DatePicker.jsx'
import IconButton from '../atoms/IconButton.jsx'
import { buttonClass } from '../atoms/Button.jsx'
import { AccountIcon, AppsIcon, InsightsIcon, TasksIcon } from '../atoms/Icons.jsx'
import { LOGO_URL } from '../../lib/config.js'

// Top bar: brand (links home), fund and date controls, the Datagrid link, and icon buttons.
export default function Header() {
  return (
    <header className="app-header">
      <div className="header-row">
        <NavLink to="/" end className="brand" aria-label="Jack Rabbit home">
          <img src={LOGO_URL} alt="Rabbit Run logo" className="brand-logo" />
          <span className="brand-name">Jack Rabbit</span>
        </NavLink>

        <div className="header-controls">
          <div className="fund-group">
            <FundFilter />
            <span className="fund-divider" aria-hidden="true"></span>
            <DatePicker />
          </div>

          <NavLink
            to="/datagrid"
            className={({ isActive }) =>
              buttonClass({ size: 'sm', active: isActive, extra: 'btn-link' })
            }
          >
            Rabbit Datagrid
          </NavLink>

          <IconButton label="Insights">
            <InsightsIcon />
          </IconButton>
          <IconButton label="Account">
            <AccountIcon />
          </IconButton>
          <IconButton label="Tasks" badge={12}>
            <TasksIcon />
          </IconButton>
          <IconButton label="Apps">
            <AppsIcon />
          </IconButton>
        </div>
      </div>
    </header>
  )
}
