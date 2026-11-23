import { useCallback, useRef, useState } from 'react'
import { HOLIDAYS } from '../data.js'
import { useOutsideClose } from '../hooks.js'
import { CalendarIcon } from '../icons.jsx'
import {
  DOW, MONTHS_LONG, formatDate, formatSpecTitle, isoKey, pad, parseISODay, sameDay,
} from '../format.js'

// 6 weeks of cells: days from the previous month, this month, then the next month.
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
  let extra = 1
  while (cells.length < 42) {
    cells.push({ date: new Date(year, m + 1, extra), outside: true })
    extra++
  }
  return cells
}

export default function DatePicker() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => new Date(2024, 11, 16))
  const [calMonth, setCalMonth] = useState(() => new Date(2024, 11, 1))
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useOutsideClose(ref, open, close)

  const year = calMonth.getFullYear()
  const m = calMonth.getMonth()
  const today = new Date()
  const cells = buildCells(calMonth)
  const holidayKey = Object.keys(HOLIDAYS).sort().find((k) => k.indexOf(year + '-' + pad(m + 1)) === 0)

  function toggle() {
    if (!open) setCalMonth(new Date(selected.getFullYear(), selected.getMonth(), 1))
    setOpen(!open)
  }

  function pick(isoStr) {
    setSelected(parseISODay(isoStr))
    setOpen(false)
  }

  return (
    <div className="date-wrap" ref={ref}>
      <button
        type="button"
        className="date-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
      >
        <CalendarIcon />
        <span>{formatDate(selected)}</span>
      </button>

      {open && (
        <div className="datepicker" role="dialog" aria-label="Choose date">
          <p className="cal-select-label">SELECT DATE</p>
          <p className="cal-title">{formatSpecTitle(selected)}</p>
          <div className="cal-month-row">
            <span className="cal-month">{MONTHS_LONG[m].toUpperCase()} {year}</span>
            <span className="cal-nav">
              <button type="button" aria-label="Previous month" onClick={() => setCalMonth(new Date(year, m - 1, 1))}>‹</button>
              <button type="button" aria-label="Next month" onClick={() => setCalMonth(new Date(year, m + 1, 1))}>›</button>
            </span>
          </div>
          <div className="cal-grid">
            {DOW.map((w, i) => <div className="cal-dow" key={'dow' + i}>{w}</div>)}
            {cells.map((c) => {
              const key = isoKey(c.date)
              const cls = ['cal-day']
              if (c.outside) cls.push('is-outside')
              if (HOLIDAYS[key]) cls.push('has-holiday')
              if (sameDay(c.date, selected)) cls.push('is-selected')
              if (sameDay(c.date, today)) cls.push('is-today')
              return (
                <button
                  type="button"
                  key={key}
                  className={cls.join(' ')}
                  aria-label={formatSpecTitle(c.date)}
                  onClick={() => pick(key)}
                >
                  {c.date.getDate()}
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
