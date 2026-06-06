import React from 'react'

// ── Align icons ────────────────────────────────────────────────────────────────
const AlignLeftIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="0" y="4" width="8" height="2" rx="1"/><rect x="0" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignCenterIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="2" y="4" width="8" height="2" rx="1"/><rect x="1" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignRightIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="4" y="4" width="8" height="2" rx="1"/><rect x="2" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignJustifyIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="0" y="4" width="12" height="2" rx="1"/><rect x="0" y="8" width="12" height="2" rx="1"/>
  </svg>
)

// ── Typography row control ─────────────────────────────────────────────────────
export function TypoRow({ label, value, onChange }) {
  return (
    <div className="tp-row">
      <div className="tp-label">{label}</div>
      <div className="tp-line1">
        <input type="number" className="tp-size" value={value.size} min={7} max={72} step={0.5}
          onChange={e => { const n = parseFloat(e.target.value); if (!isNaN(n)) onChange({ ...value, size: n }) }} />
        <span className="tp-unit">px</span>
        <button className={`tp-btn tp-bold${value.bold ? ' tp-on' : ''}`} onClick={() => onChange({ ...value, bold: !value.bold })} title="Bold">B</button>
        <button className={`tp-btn tp-ital${value.italic ? ' tp-on' : ''}`} onClick={() => onChange({ ...value, italic: !value.italic })} title="Italic">I</button>
        <input type="color" className="tp-color" value={value.color} onChange={e => onChange({ ...value, color: e.target.value })} title="Color" />
      </div>
      <div className="tp-line2">
        {[['left', <AlignLeftIcon />], ['center', <AlignCenterIcon />], ['right', <AlignRightIcon />], ['justify', <AlignJustifyIcon />]].map(([a, icon]) => (
          <button key={a} className={`tp-align${value.align === a ? ' tp-on' : ''}`} onClick={() => onChange({ ...value, align: a })} title={`Align ${a}`}>{icon}</button>
        ))}
      </div>
    </div>
  )
}

// ── Section typography panel ───────────────────────────────────────────────────
export function SectionTypoPanel({ visible, onEnter, onLeave, typo, setTypoKey, rows, flipped, extraClass = '' }) {
  return (
    <div className={`stp no-print${visible ? ' stp-visible' : ''}${flipped ? ' stp-flipped' : ''}${extraClass ? ' ' + extraClass : ''}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {rows.map(([key, label]) =>
        key === 'bg' ? (
          <div key="bg" className="tp-row">
            <div className="tp-label">{label}</div>
            <div className="tp-line1">
              <input type="color" className="tp-color" style={{ marginLeft: 0 }}
                value={typo.headerBg.color} onChange={e => setTypoKey('headerBg', { color: e.target.value })} title="Background color" />
            </div>
          </div>
        ) : key === 'sidebar-bg' ? (
          <div key="sidebar-bg" className="tp-row">
            <div className="tp-label">{label}</div>
            <div className="tp-line1">
              <input type="color" className="tp-color" style={{ marginLeft: 0 }}
                value={typo.sidebarBg?.color || '#1e2d3e'} onChange={e => setTypoKey('sidebarBg', { color: e.target.value })} title="Sidebar background color" />
            </div>
          </div>
        ) : key === 'accent' ? (
          <div key="accent" className="tp-row">
            <div className="tp-label">{label}</div>
            <div className="tp-line1">
              <input type="color" className="tp-color" style={{ marginLeft: 0 }}
                value={typo.accentColor?.color || '#1a7a70'} onChange={e => setTypoKey('accentColor', { color: e.target.value })} title="Accent color" />
            </div>
          </div>
        ) : (
          <TypoRow key={key} label={label} value={typo[key]} onChange={val => setTypoKey(key, val)} />
        )
      )}
    </div>
  )
}
