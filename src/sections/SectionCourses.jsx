import React from 'react'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { E } from '../components/EditableText'

export const SECTION_DEF = { id: 'courses', label: 'Courses' }

export function SectionCourses({ sections, idx, layout }) {
  const { data, set, moveSect, removeSection } = useResumeData()
  const { typo, ts, stp, accentColor } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout
  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const setCourse = (id, f, v) => set(d => ({ ...d, courses: d.courses.map(c => c.id === id ? { ...c, [f]: v } : c) }))
  const addCourse = () => set(d => ({ ...d, courses: [...(d.courses || []), { id: Math.max(0, ...(d.courses || []).map(x => x.id)) + 1, title: 'Course Title', provider: 'Provider', year: '', description: '' }] }))
  const removeCourse = id => set(d => ({ ...d, courses: d.courses.filter(c => c.id !== id) }))

  const sectionCtrl = () => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('courses', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('courses', 1)} title="Move down">↓</button>
      <button className="sa-remove" onClick={() => removeSection('courses')} title="Remove section">×</button>
    </div>
  )

  return (
    <section className="section section-wrap"
      onMouseEnter={() => activate('courses')} onMouseLeave={deactivate}
      onFocus={() => activate('courses')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('courses', [['sectionTitle', 'Section Title']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl()}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>COURSES</h2>
      </div>
      <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
        {(data.courses || []).map(c => (
          <div key={c.id} className="course-entry">
            <div className="course-header-row">
              <E as="div" className="course-title" value={c.title} onChange={v => setCourse(c.id, 'title', v)} style={{ color: accentColor, fontWeight: 600, fontSize: '12.5px' }} />
              <button className="btn-remove-job no-print" onClick={() => removeCourse(c.id)}>✕</button>
            </div>
            <div className="edu-meta-row">
              <E as="span" className="course-provider" value={c.provider} onChange={v => setCourse(c.id, 'provider', v)} />
              {c.provider && <span className="meta-sep">·</span>}
              <E as="span" className="edu-period" value={c.year || ''} onChange={v => setCourse(c.id, 'year', v)} />
            </div>
            {c.description && <E as="div" className="course-desc" value={c.description} onChange={v => setCourse(c.id, 'description', v)} inlineFmt />}
          </div>
        ))}
      </div>
      <button className="btn-add-section no-print" onClick={addCourse}>+ Add Course</button>
    </section>
  )
}
