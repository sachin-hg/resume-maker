import React from 'react'
import { E } from '../components/EditableText'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'

export const SECTION_DEF = {
  id: 'achievements',
  label: 'Key Achievements',
  defaultColumn: 'main',
}

export function SectionAchievements({ sections, idx, layout }) {
  const { data, set, moveSect, removeSection } = useResumeData()
  const { ts, stp, typo } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout

  const setAch = (id, f, v) => set(d => ({ ...d, achievements: d.achievements.map(a => a.id === id ? { ...a, [f]: v } : a) }))
  const addAch = () => set(d => ({
    ...d, achievements: [...(d.achievements || []), { id: Date.now(), title: 'Achievement Title', description: 'Description of the achievement' }],
  }))
  const removeAch = id => set(d => ({ ...d, achievements: d.achievements.filter(a => a.id !== id) }))

  const sectionCtrl = (extra = null, noRemove = false) => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={idx === 0} onClick={() => moveSect('achievements', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={idx >= sections.length - 1} onClick={() => moveSect('achievements', 1)} title="Move down">↓</button>
      {extra}
      {!noRemove && (
        <button className="sa-remove" onClick={() => removeSection('achievements')} title="Remove section">×</button>
      )}
    </div>
  )

  return (
    <section key="achievements" className="section section-wrap"
      onMouseEnter={() => activate('achievements')} onMouseLeave={deactivate}
      onFocus={() => activate('achievements')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('achievements', [
        ['sectionTitle', 'Section Title'], ['achTitle', 'Title'], ['achDesc', 'Description'],
      ], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>KEY ACHIEVEMENTS</h2>
        {sectionCtrl()}
      </div>
      <div className={`ach-list${effectiveLayout === 'wide' ? ' sec-2col' : ''}`}>
        {(data.achievements || []).map(ach => (
          <div key={ach.id} className="ach-item">
            <div className="ach-header-row">
              <E as="div" className="ach-title" value={ach.title} onChange={v => setAch(ach.id, 'title', v)} style={ts('achTitle')} />
              <button className="btn-remove-job no-print" onClick={() => removeAch(ach.id)}>✕</button>
            </div>
            <E as="div" className="ach-desc" value={ach.description} onChange={v => setAch(ach.id, 'description', v)} style={ts('achDesc')} inlineFmt />
          </div>
        ))}
      </div>
      <button className="btn-add-section no-print" onClick={addAch}>+ Add Achievement</button>
    </section>
  )
}
