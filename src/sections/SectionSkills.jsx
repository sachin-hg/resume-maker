import React from 'react'
import { E } from '../components/EditableText'
import { RatingDots } from '../components/RatingDots'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'

export const SECTION_DEF = { id: 'skills', label: 'Skills', defaultColumn: 'sidebar' }

export function SectionSkills({ sections, idx, layout, isInSidebar = false }) {
  const { data, set, setSkill, removeSkill, addSkill, toggleSkillsMode, setSkillRating, reorderSkill, moveSect, removeSection } = useResumeData()
  const { ts, stp, accentColor, typo } = useTypography()
  const { activate, deactivate, dragSk, setDragSk, dragSkOver, setDragSkOver } = useUI()

  const effectiveLayout = layout

  // Per-section layout override
  const LAYOUT_SECTIONS = new Set(['education', 'achievements', 'languages', 'courses', 'passions', 'certifications', 'mytime', 'extra', 'skills'])
  const layoutOverride = data.sectionLayouts?.['skills']
  const setLayoutOverride = v => set(d => {
    const sl = { ...(d.sectionLayouts || {}) }
    if (v == null) { delete sl['skills'] } else { sl['skills'] = v }
    return { ...d, sectionLayouts: sl }
  })

  const showLayoutBtns = LAYOUT_SECTIONS.has('skills') && effectiveLayout !== 'compact' &&
    data.skillsMode === 'rated'
  const layoutBtns = showLayoutBtns ? (
    <div className="sa-layout-group">
      <button className={`sa-layout-btn${layoutOverride === 'compact' ? ' active' : ''}`}
        onClick={() => setLayoutOverride(layoutOverride === 'compact' ? null : 'compact')} title="Single column">▤</button>
      <button className={`sa-layout-btn${layoutOverride === 'wide' ? ' active' : ''}`}
        onClick={() => setLayoutOverride(layoutOverride === 'wide' ? null : 'wide')} title="Two columns">⊞</button>
    </div>
  ) : null

  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const sectionCtrl = (extra = null, noRemove = false) => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('skills', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('skills', 1)} title="Move down">↓</button>
      {extra}
      {layoutBtns}
      {!noRemove && <button className="sa-remove" onClick={() => removeSection('skills')} title="Remove section">×</button>}
    </div>
  )

  return (
    <section key="skills" className="section section-wrap"
      onMouseEnter={() => activate('skills')} onMouseLeave={deactivate}
      onFocus={() => activate('skills')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('skills', [['sectionTitle', 'Section Title'], ['skills', 'Skills']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl(<>
          <button className="sa-mode" onClick={toggleSkillsMode} title={data.skillsMode === 'rated' ? 'Switch to chips' : 'Switch to rated'}>{data.skillsMode === 'rated' ? '◻' : '★'}</button>
          {data.skillsMode === 'rated' && <>
            <button className="sa-mode" onClick={() => set(d => { const c = d.skillsRatingStyle || 'dots'; return {...d, skillsRatingStyle: c === 'dots' ? 'stars' : c === 'stars' ? 'bar' : 'dots'} })} title={{ dots: 'Switch to stars', stars: 'Switch to bar', bar: 'Switch to dots' }[data.skillsRatingStyle || 'dots']}>{{ dots: '★', stars: '▬', bar: '●' }[data.skillsRatingStyle || 'dots']}</button>
            <label className="sa-color-btn no-print" style={{ background: data.skillsRatingColor || accentColor }} title="Rating color">
              <input type="color" value={data.skillsRatingColor || accentColor} onChange={e => set(d => ({...d, skillsRatingColor: e.target.value}))} />
            </label>
          </>}
        </>)}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>SKILLS</h2>
      </div>
      {data.skillsMode === 'rated' ? (
        <div className={`skills-rated${effectiveLayout === 'wide' ? ' sec-2col' : ''}`}>
          {data.skills.map((skill, i) => (
            <div key={i} className="skills-rated-row">
              <span className="bu-handle no-print" draggable
                onDragStart={e => { e.stopPropagation(); setDragSk(i) }}
                onDragEnd={() => { setDragSk(null); setDragSkOver(null) }}>⠿</span>
              <E as="span" className="skill-rated-name" value={skill} onChange={v => setSkill(i, v)} style={{ fontSize: '12px', flex: 1 }} />
              <RatingDots value={data.skillRatings?.[skill] || 0} max={5} color={data.skillsRatingColor || accentColor} onChange={v => setSkillRating(skill, v)} ratingStyle={data.skillsRatingStyle || 'dots'} />
              <button className="skill-remove no-print" style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }} onClick={() => removeSkill(i)}>×</button>
            </div>
          ))}
          <button className="btn-add-skill no-print" onClick={addSkill}>+ Add</button>
        </div>
      ) : (
        <div className="skills-row">
          {data.skills.map((skill, i) => (
            <span key={i}
              className={`skill-tag${dragSk === i ? ' sk-drag' : ''}${dragSkOver === i && dragSk !== i ? ' sk-over' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragSkOver(i) }}
              onDragLeave={() => setDragSkOver(null)}
              onDrop={e => { e.preventDefault(); if (dragSk !== null && dragSk !== i) reorderSkill(dragSk, i); setDragSk(null); setDragSkOver(null) }}
            >
              <span className="sk-handle no-print" draggable onDragStart={e => { e.stopPropagation(); setDragSk(i) }} onDragEnd={() => { setDragSk(null); setDragSkOver(null) }}>⠿</span>
              <E value={skill} onChange={v => setSkill(i, v)} style={{ minWidth: 18, fontSize: ts('skills').fontSize, fontWeight: ts('skills').fontWeight, fontStyle: ts('skills').fontStyle }} />
              <button className="skill-remove no-print" onClick={() => removeSkill(i)}>×</button>
            </span>
          ))}
          <button className="btn-add-skill no-print" onClick={addSkill}>+ Add</button>
        </div>
      )}
    </section>
  )
}
