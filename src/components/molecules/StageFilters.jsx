// Row of stage buttons with counts. Exactly one is active.
export default function StageFilters({ labels, counts, active, onChange }) {
  return (
    <div className="sm-filters" id="statusFilters" role="group" aria-label="Filter by stage">
      {labels.map((label) => (
        <button
          type="button"
          key={label}
          className={'sm-filter' + (active === label ? ' is-active' : '')}
          aria-pressed={active === label}
          onClick={() => onChange(label)}
        >
          {label} ({counts[label]})
        </button>
      ))}
    </div>
  )
}
