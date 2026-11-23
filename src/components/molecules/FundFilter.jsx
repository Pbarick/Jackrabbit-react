import { useCallback, useRef, useState } from 'react'
import Checkbox from '../atoms/Checkbox.jsx'
import { ChevronDownIcon } from '../atoms/Icons.jsx'
import { useFundFilter } from '../../context/FundFilterContext.jsx'
import { useOutsideClose } from '../../hooks/useOutsideClose.js'

// Dropdown of fund checkboxes, grouped. Reads and writes the shared fund selection.
export default function FundFilter() {
  const { checked, setChecked, groups } = useFundFilter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useOutsideClose(ref, open, close)

  const allFunds = groups.flat()
  const selected = allFunds.filter((name) => checked[name])
  let label = 'All Funds'
  if (selected.length === 0) label = 'No Funds'
  else if (selected.length < allFunds.length) label = `${selected.length} selected`
  const allOn = selected.length === allFunds.length

  function setAll(on) {
    const next = {}
    allFunds.forEach((name) => {
      next[name] = on
    })
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
            <Checkbox checked={allOn} onChange={(e) => setAll(e.target.checked)} />
            <span>All Funds</span>
          </label>
          {groups.map((group, gi) => (
            <div className="filter-group" key={group[0] ?? gi}>
              {group.map((name) => (
                <label className="filter-item" key={name}>
                  <Checkbox
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
