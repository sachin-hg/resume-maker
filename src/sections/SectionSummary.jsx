import React from 'react'
import { E } from '../components/EditableText'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'

export const SECTION_DEF = {
  id: 'summary',
  label: 'Summary',
  defaultColumn: 'main',
}

export function SectionSummary({ sections, idx, layout }) {
  const { data, setField, moveSect, removeSection } = useResumeData()
  const { ts, stp, typo } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'

  const sectionCtrl = (extra = null, noRemove = false) => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={idx === 0} onClick={() => moveSect('summary', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={idx >= sections.length - 1} onClick={() => moveSect('summary', 1)} title="Move down">↓</button>
      {extra}
      {!noRemove && (
        <button className="sa-remove" onClick={() => removeSection('summary')} title="Remove section">×</button>
      )}
    </div>
  )

  return (
    <section key="summary" className="section section-wrap"
      onMouseEnter={() => activate('summary')} onMouseLeave={deactivate}
      onFocus={() => activate('summary')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('summary', [['sectionTitle', 'Section Title'], ['summary', 'Summary']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl()}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>SUMMARY</h2>
      </div>
      <E as="div" className="summary-section-text" value={data.summary} onChange={v => setField('summary', v)}
        style={{ fontSize: '11.5px', lineHeight: 1.5, color: '#444', textAlign: 'justify' }} inlineFmt />
    </section>
  )
}
