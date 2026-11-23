// On/off switch for live updates. Cross when Off, tick when On (styled in styles.css).
export default function LiveSwitch({ live, onChange }) {
  return (
    <label className="sm-switch">
      <input
        type="checkbox"
        id="liveToggle"
        checked={live}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="sm-switch-track" aria-hidden="true">
        <span className="sm-switch-knob">
          <svg className="sw-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
          <svg className="sw-tick" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
      </span>
      <span id="liveLabel">{live ? 'On' : 'Off'}</span>
    </label>
  )
}
