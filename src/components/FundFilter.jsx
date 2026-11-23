import { useCallback, useRef, useState } from 'react'
import { FILTER_GROUPS } from '../data.js'
import { useOutsideClose } from '../hooks.js'
import { ChevronDownIcon } from '../icons.jsx'

const ALL_FUNDS = FILTER_GROUPS.flat()

export default function FundFilter({ checked, setChecked }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useOutsideClose(ref, open, close)

  const checkedNames = ALL_FUNDS.filter((name) => checked[name])
  let label = 'All Funds'
  if (checkedNames.length === 0) label = 'No Funds'
  else if (checkedNames.length < ALL_FUNDS.length) label = checkedNames.length + ' selected'
  const allOn = checkedNames.length === ALL_FUNDS.length

  function setAll(on) {
    const next = {}
    ALL_FUNDS.forEach((name) => { next[name] = on })
    setChecked(next)
  }

  function setOne(name, on) {
    setChecked({ ...checked, [name]: on })
  }

  return (
    <div className="filter-wrap" ref={ref}>
      <button
        type="button"
        className="filter-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{label}</span>
        <ChevronDownIcon />
      </button>

      {open && (
        <div className="filter-panel">
          <label className="filter-item filter-all">
            <input type="checkbox" className="check" checked={allOn} onChange={(e) => setAll(e.target.checked)} />
            <span>All Funds</span>
          </label>
          {FILTER_GROUPS.map((group, gi) => (
            <div className="filter-group" key={gi}>
              {group.map((name) => (
                <label className="filter-item" key={name}>
                  <input
                    type="checkbox"
                    className="check"
                    checked={!!checked[name]}
                    onChange={(e) => setOne(name, e.target.checked)}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
