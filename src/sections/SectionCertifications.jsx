import React from 'react'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { E } from '../components/EditableText'

export const SECTION_DEF = { id: 'certifications', label: 'Certifications' }

export function SectionCertifications({ sections, idx, layout }) {
  const { data, set, moveSect, removeSection } = useResumeData()
  const { typo, ts, stp, accentColor } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout
  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const setCert = (id, f, v) => set(d => ({ ...d, certifications: d.certifications.map(c => c.id === id ? { ...c, [f]: v } : c) }))
  const addCert = () => set(d => ({ ...d, certifications: [...(d.certifications || []), { id: Math.max(0, ...(d.certifications || []).map(x => x.id)) + 1, title: 'Certification', issuer: 'Issuer', date: '' }] }))
  const removeCert = id => set(d => ({ ...d, certifications: d.certifications.filter(c => c.id !== id) }))

  const sectionCtrl = () => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('certifications', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('certifications', 1)} title="Move down">↓</button>
      <button className="sa-remove" onClick={() => removeSection('certifications')} title="Remove section">×</button>
    </div>
  )

  return (
    <section className="section section-wrap"
      onMouseEnter={() => activate('certifications')} onMouseLeave={deactivate}
      onFocus={() => activate('certifications')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('certifications', [['sectionTitle', 'Section Title']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl()}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>CERTIFICATIONS</h2>
      </div>
      <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
        {(data.certifications || []).map(c => (
          <div key={c.id} className="cert-entry">
            <div className="cert-header-row">
              <E as="div" className="cert-title" value={c.title} onChange={v => setCert(c.id, 'title', v)} style={{ color: accentColor, fontWeight: 600, fontSize: '12.5px' }} />
              <button className="btn-remove-job no-print" onClick={() => removeCert(c.id)}>✕</button>
            </div>
            <div className="edu-meta-row">
              <E as="span" className="cert-issuer" value={c.issuer} onChange={v => setCert(c.id, 'issuer', v)} style={{ fontSize: '11px', color: '#666' }} />
              {c.issuer && <span className="meta-sep">·</span>}
              <E as="span" className="edu-period" value={c.date || ''} onChange={v => setCert(c.id, 'date', v)} />
            </div>
          </div>
        ))}
      </div>
      <button className="btn-add-section no-print" onClick={addCert}>+ Add Certification</button>
    </section>
  )
}
