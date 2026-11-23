import { useCallback, useRef, useState } from 'react'
import { HOLIDAYS } from '../../data/sampleData.js'
import { CalendarIcon } from '../atoms/Icons.jsx'
import { useOutsideClose } from '../../hooks/useOutsideClose.js'
import {
  DOW, MONTHS_LONG, formatDate, formatSpecTitle, isoKey, pad, parseISODay, sameDay,
} from '../../lib/format.js'

// Six weeks of cells: trailing days from the previous month, this month, then leading days of the next.
function buildCells(month) {
  const year = month.getFullYear()
  const m = month.getMonth()
  const offset = new Date(year, m, 1).getDay()
  const daysInMonth = new Date(year, m + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < offset; i++) {
    cells.push({ date: new Date(year, m, 1 - (offset - i)), outside: true })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, m, d), outside: false })
  }
  for (let extra = 1; cells.length < 42; extra++) {
    cells.push({ date: new Date(year, m + 1, extra), outside: true })
  }
  return cells
}

const INITIAL_DATE = new Date(2024, 11, 16)

export default function DatePicker() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(INITIAL_DATE)
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(INITIAL_DATE.getFullYear(), INITIAL_DATE.getMonth(), 1))
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useOutsideClose(ref, open, close)

  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const today = new Date()
  const cells = buildCells(visibleMonth)
  const holidayKey = Object.keys(HOLIDAYS).sort().find((k) => k.startsWith(`${year}-${pad(month + 1)}`))

  function toggle() {
    if (!open) setVisibleMonth(new Date(selected.getFullYear(), selected.getMonth(), 1))
    setOpen(!open)
  }

  function pick(isoDay) {
    setSelected(parseISODay(isoDay))
    setOpen(false)
  }

  return (
    <div className="date-wrap" ref={ref}>
      <button type="button" className="date-btn" aria-haspopup="dialog" aria-expanded={open} onClick={toggle}>
        <CalendarIcon />
        <span>{formatDate(selected)}</span>
      </button>

      {open && (
        <div className="datepicker" role="dialog" aria-label="Choose date">
          <p className="cal-select-label">SELECT DATE</p>
          <p className="cal-title">{formatSpecTitle(selected)}</p>
          <div className="cal-month-row">
            <span className="cal-month">{MONTHS_LONG[month].toUpperCase()} {year}</span>
            <span className="cal-nav">
              <button type="button" aria-label="Previous month" onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}>‹</button>
              <button type="button" aria-label="Next month" onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}>›</button>
            </span>
          </div>
          <div className="cal-grid">
            {DOW.map((letter, i) => <div className="cal-dow" key={`dow-${i}`}>{letter}</div>)}
            {cells.map((cell) => {
              const key = isoKey(cell.date)
              const classes = ['cal-day']
              if (cell.outside) classes.push('is-outside')
              if (HOLIDAYS[key]) classes.push('has-holiday')
              if (sameDay(cell.date, selected)) classes.push('is-selected')
              if (sameDay(cell.date, today)) classes.push('is-today')
              return (
                <button
                  type="button"
                  key={key}
                  className={classes.join(' ')}
                  aria-label={formatSpecTitle(cell.date)}
                  onClick={() => pick(key)}
                >
                  {cell.date.getDate()}
                </button>
              )
            })}
          </div>
          {holidayKey && <div className="cal-holiday-bar">{HOLIDAYS[holidayKey]}</div>}
        </div>
      )}
    </div>
  )
}
