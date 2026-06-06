import React from 'react'
import { TEMPLATE_DEFS } from '../layouts/defs'

// ── Template Thumbnail ─────────────────────────────────────────────────────────
export function TemplateThumbnail({ id }) {
  if (id === 'classic') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-contact-bar" />
      <div className="tt-body-single">
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line tt-short" />
        <div className="tt-gap" />
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
      </div>
    </div>
  )
  if (id === 'two-col') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-contact-bar" />
      <div className="tt-body-two">
        <div className="tt-col-main">
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
          <div className="tt-gap" />
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line tt-short" />
        </div>
        <div className="tt-col-side">
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" /><div className="tt-line tt-sb tt-short" />
          <div className="tt-gap" />
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" />
        </div>
      </div>
    </div>
  )
  if (id === 'sidebar-dark') return (
    <div className="tt-wrap tt-wrap-sdark">
      <div className="tt-sidebar-dark">
        <div className="tt-sd-name" /><div className="tt-sd-title" />
        <div className="tt-gap" />
        <div className="tt-sd-section" /><div className="tt-line tt-sd-line" /><div className="tt-line tt-sd-line tt-short" />
        <div className="tt-gap" />
        <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
      </div>
      <div className="tt-main-white">
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
        <div className="tt-gap" />
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line tt-short" />
      </div>
    </div>
  )
  if (id === 'three-col') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-contact-bar" />
      <div className="tt-body-three">
        <div className="tt-col-3left">
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
          <div className="tt-gap" />
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
        </div>
        <div className="tt-col-3main">
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
          <div className="tt-gap" />
          <div className="tt-section-block" /><div className="tt-line" />
        </div>
        <div className="tt-col-3right">
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" />
          <div className="tt-gap" />
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" />
        </div>
      </div>
    </div>
  )
  if (id === 'minimal') return (
    <div className="tt-wrap">
      <div className="tt-light-bar">
        <div className="tt-lh-name" /><div className="tt-lh-title" />
      </div>
      <div className="tt-contact-bar" />
      <div className="tt-body-single">
        <div className="tt-section-block tt-min" /><div className="tt-line" /><div className="tt-line tt-short" />
        <div className="tt-gap" />
        <div className="tt-section-block tt-min" /><div className="tt-line" /><div className="tt-line" />
      </div>
    </div>
  )
  if (id === 'sidebar-band') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-body-sbband">
        <div className="tt-sbband-sidebar">
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
          <div className="tt-gap" />
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
        </div>
        <div className="tt-sbband-main">
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
          <div className="tt-gap" />
          <div className="tt-section-block" /><div className="tt-line" />
        </div>
      </div>
      <div className="tt-sbband-footer" />
    </div>
  )
  return null
}

// ── Template Picker ────────────────────────────────────────────────────────────
export function TemplatePicker({ current, onSelect, onClose }) {
  return (
    <div className="tpl-overlay no-print">
      <div className="tpl-panel">
        <div className="tpl-panel-header">
          <span>Choose Layout</span>
          <button className="tpl-close" onClick={onClose}>×</button>
        </div>
        <div className="tpl-grid">
          {TEMPLATE_DEFS.map(t => (
            <button key={t.id} className={`tpl-card${current === t.id ? ' tpl-card-active' : ''}`} onClick={() => { onSelect(t.id); onClose() }}>
              <TemplateThumbnail id={t.id} />
              <div className="tpl-card-name">{t.name}</div>
              <div className="tpl-card-desc">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
