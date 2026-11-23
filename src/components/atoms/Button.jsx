// Class names for the button styles in styles.css. Use these on <button> or on a router <NavLink>.
export function buttonClass({ variant = 'primary', size, active = false, extra = '' } = {}) {
  return [`btn-${variant}`, size === 'sm' ? 'btn-sm' : '', active ? 'is-active' : '', extra]
    .filter(Boolean)
    .join(' ')
}

// variant: 'primary' (gradient CTA) or 'outline'.
export default function Button({ variant = 'primary', size, className = '', ...rest }) {
  return (
    <button type="button" className={buttonClass({ variant, size, extra: className })} {...rest} />
  )
}
