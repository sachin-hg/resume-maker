import React from 'react'
import { THEME_DEFS } from '../themes'

// ── Theme Thumbnail ─────────────────────────────────────────────────────────
export function ThemeThumbnail({ theme }) {
  const [headerBg, accent, pageBg] = theme.swatches
  const isLight = headerBg === '#ffffff' || headerBg.startsWith('#e') || headerBg.startsWith('#f')
  const nameColor = isLight ? '#1a1a1a' : '#ffffff'
  const titleColor = isLight ? accent : 'rgba(255,255,255,0.8)'
  const secColor = accent
  const hasOutlinedChip = (theme.vars['--th-chip-bg'] === 'transparent')
  return (
    <div className="thm-thumb" style={{ background: pageBg }}>
      <div className="thm-thumb-header" style={{ background: headerBg }}>
        <div className="thm-thumb-name" style={{ background: nameColor }} />
        <div className="thm-thumb-title" style={{ background: titleColor }} />
      </div>
      <div className="thm-thumb-body">
        <div className="thm-thumb-sec" style={{ background: secColor }} />
        <div className="thm-thumb-line" /><div className="thm-thumb-line short" />
        <div className="thm-thumb-chips">
          {[22, 16, 20].map((w, i) => (
            <div key={i} className="thm-thumb-chip" style={{
              width: w,
              background: hasOutlinedChip ? 'transparent' : accent,
              border: hasOutlinedChip ? `1px solid ${accent}` : 'none',
            }} />
          ))}
        </div>
        <div className="thm-thumb-line" /><div className="thm-thumb-line short" />
      </div>
    </div>
  )
}

// ── Theme Picker ─────────────────────────────────────────────────────────────
export function ThemePicker({ current, onSelect, onClose }) {
  return (
    <div className="thm-overlay no-print">
      <div className="thm-panel">
        <div className="thm-panel-header">
          <span>Choose Theme</span>
          <button className="thm-close" onClick={onClose}>×</button>
        </div>
        <div className="thm-grid">
          {THEME_DEFS.map(t => (
            <button key={t.id} className={`thm-card${current === t.id ? ' thm-card-active' : ''}`}
              onClick={() => { onSelect(t.id); onClose() }}>
              <ThemeThumbnail theme={t} />
              <div className="thm-card-name">{t.name}</div>
              <div className="thm-card-desc">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
