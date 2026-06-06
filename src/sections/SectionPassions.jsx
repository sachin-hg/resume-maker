import React from 'react'
import { E } from '../components/EditableText'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { IconPicker } from '../components/IconPicker'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { SECTION_ICON_MAP } from '../utils/constants'

export const SECTION_DEF = { id: 'passions', label: 'Passions & Interests', defaultColumn: 'sidebar' }

export function SectionPassions({ sections, idx, layout }) {
  const { data, setPassion, addPassion, removePassion, moveSect, removeSection } = useResumeData()
  const { typo, ts, stp, accentColor } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout
  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const sectionCtrl = () => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('passions', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('passions', 1)} title="Move down">↓</button>
      <button className="sa-remove" onClick={() => removeSection('passions')} title="Remove section">×</button>
    </div>
  )

  return (
    <section key="passions" className="section section-wrap"
      onMouseEnter={() => activate('passions')} onMouseLeave={deactivate}
      onFocus={() => activate('passions')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('passions', [['sectionTitle', 'Section Title']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl()}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>PASSIONS & INTERESTS</h2>
      </div>
      <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
        {(data.passions || []).map(p => (
          <div key={p.id} className="passion-item">
            <div className="passion-icon-wrap" style={{ background: p.iconBg || accentColor }}>
              {p.icon ? SECTION_ICON_MAP[p.icon] : null}
              <input type="color" className="passion-icon-color no-print" value={p.iconBg || accentColor} onChange={e => setPassion(p.id, 'iconBg', e.target.value)} title="Change icon color" />
            </div>
            <div className="passion-text">
              <div className="passion-header-row">
                <E as="span" className="passion-title" value={p.title} onChange={v => setPassion(p.id, 'title', v)} style={{ fontSize: '12.5px', fontWeight: 600 }} />
                <IconPicker value={p.icon} onChange={v => setPassion(p.id, 'icon', v)} />
                <button className="btn-remove-job no-print" onClick={() => removePassion(p.id)}>✕</button>
              </div>
              <E as="div" className="passion-desc" value={p.description} onChange={v => setPassion(p.id, 'description', v)} style={{ fontSize: '11px', color: '#555' }} inlineFmt />
            </div>
          </div>
        ))}
      </div>
      <button className="btn-add-section no-print" onClick={addPassion}>+ Add Passion</button>
    </section>
  )
}
