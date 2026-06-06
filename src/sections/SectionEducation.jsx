import React from 'react'
import { E } from '../components/EditableText'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'

export const SECTION_DEF = {
  id: 'education',
  label: 'Education',
  defaultColumn: 'main',
}

export function SectionEducation({ sections, idx, layout }) {
  const { data, set, removeSection } = useResumeData()
  const { ts, stp, typo, accentColor } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout

  const setEdu = (id, f, v) => set(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [f]: v } : e) }))
  const addEdu = () => set(d => ({
    ...d, education: [...(d.education || []), { id: Date.now(), degree: 'Degree / Certification', institution: 'Institution', period: 'Year', location: '' }],
  }))
  const removeEdu = id => set(d => ({ ...d, education: d.education.filter(e => e.id !== id) }))

  const sectionCtrl = (extra = null, noRemove = false) => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={idx === 0} title="Move up">↑</button>
      <button className="btn-move" disabled={idx >= sections.length - 1} title="Move down">↓</button>
      {extra}
      {!noRemove && (
        <button className="sa-remove" onClick={() => removeSection('education')} title="Remove section">×</button>
      )}
    </div>
  )

  return (
    <section key="education" className="section section-wrap"
      onMouseEnter={() => activate('education')} onMouseLeave={deactivate}
      onFocus={() => activate('education')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('education', [
        ['sectionTitle', 'Section Title'], ['eduDegree', 'Degree'],
        ['eduInst', 'Institution'], ['eduPeriod', 'Period'],
      ], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>EDUCATION</h2>
        {sectionCtrl()}
      </div>
      <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
        {(data.education || []).map(edu => (
          <div key={edu.id} className="edu-entry">
            <div className="edu-header-row">
              <E as="div" className="edu-degree" value={edu.degree} onChange={v => setEdu(edu.id, 'degree', v)} style={{ ...ts('eduDegree'), color: accentColor }} />
              <button className="btn-remove-job no-print" onClick={() => removeEdu(edu.id)}>✕</button>
            </div>
            <div className="edu-meta-row">
              <E as="span" className="edu-inst" value={edu.institution} onChange={v => setEdu(edu.id, 'institution', v)} style={ts('eduInst')} />
              {edu.period && <span className="meta-sep">·</span>}
              <E as="span" className="edu-period" value={edu.period} onChange={v => setEdu(edu.id, 'period', v)} style={ts('eduPeriod')} />
              {edu.location && <span className="meta-sep">·</span>}
              <E as="span" className="edu-location" value={edu.location} onChange={v => setEdu(edu.id, 'location', v)} style={ts('eduPeriod')} />
            </div>
          </div>
        ))}
      </div>
      <button className="btn-add-section no-print" onClick={addEdu}>+ Add Education</button>
    </section>
  )
}
