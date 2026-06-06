import React from 'react'
import { GRAPHIC_DEFS } from '../graphics/defs'
import { FONT_DEFS } from '../graphics/fonts'

export function GraphicPicker({ currentGraphic, currentFont, onGraphicSelect, onFontSelect, onClose }) {
  return (
    <div className="gfx-overlay no-print">
      <div className="gfx-panel">
        <div className="gfx-panel-header">
          <span>Style</span>
          <button className="gfx-close" onClick={onClose}>×</button>
        </div>

        {/* ── Background ── */}
        <div className="gfx-section-label">Background</div>
        <div className="gfx-grid">
          {GRAPHIC_DEFS.map(g => (
            <button
              key={g.id}
              className={`gfx-card${currentGraphic === g.id ? ' gfx-card-active' : ''}`}
              onClick={() => onGraphicSelect(g.id)}
            >
              <div className="gfx-thumb">{g.thumbnail}</div>
              <div className="gfx-card-name">{g.name}</div>
            </button>
          ))}
        </div>

        {/* ── Font Family ── */}
        <div className="gfx-section-label gfx-section-label-font">Font Family</div>
        <div className="gfx-font-list">
          {FONT_DEFS.map(f => (
            <button
              key={f.id}
              className={`gfx-font-row${currentFont === f.id ? ' gfx-font-active' : ''}`}
              style={{ fontFamily: f.stack }}
              onClick={() => onFontSelect(f.id)}
            >
              {f.name}
              <span className="gfx-font-preview">Aa</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
