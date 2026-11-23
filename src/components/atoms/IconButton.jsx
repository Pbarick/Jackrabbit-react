// Square icon button for the header. Pass badge to show a count dot.
export default function IconButton({ label, badge, children, ...rest }) {
  return (
    <button
      type="button"
      className={'icon-btn' + (badge !== undefined ? ' has-badge' : '')}
      aria-label={badge !== undefined ? `${label}, ${badge} open` : label}
      {...rest}
    >
      {children}
      {badge !== undefined && <span className="badge">{badge}</span>}
    </button>
  )
}
