import React from 'react'
import { E } from '../components/EditableText'
import { BulletRow } from '../components/BulletRow'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'

export const SECTION_DEF = { id: 'work', label: 'Work Experience', defaultColumn: 'main' }

export function SectionWork({ sections, idx, layout }) {
  const {
    data, set,
    setJob, setBullet, addBullet, removeBullet, addJob, removeJob,
    setJobHidden, reorderBullet, removeSection,
  } = useResumeData()
  const { ts, stp, accentColor, typo } = useTypography()
  const { activate, deactivate, dragBu, setDragBu, dragBuOver, setDragBuOver } = useUI()

  const isInSidebar = layout === 'sidebar'

  // Section controls: move up/down within column, remove
  const colIdx = idx
  const colCount = sections ? sections.length : 1

  const moveUp = () => {
    if (colIdx <= 0 || !sections) return
    const targetId = sections[colIdx - 1]
    set(d => {
      const order = [...d.sectionOrder]
      const a = order.indexOf('work'), b = order.indexOf(targetId)
      ;[order[a], order[b]] = [order[b], order[a]]
      return { ...d, sectionOrder: order }
    })
  }
  const moveDown = () => {
    if (colIdx >= colCount - 1 || !sections) return
    const targetId = sections[colIdx + 1]
    set(d => {
      const order = [...d.sectionOrder]
      const a = order.indexOf('work'), b = order.indexOf(targetId)
      ;[order[a], order[b]] = [order[b], order[a]]
      return { ...d, sectionOrder: order }
    })
  }

  const metaLayoutExtra = (
    <div className="sa-layout-group">
      <button
        className={`sa-layout-btn${(data.jobMetaLayout || 'inline') === 'inline' ? ' active' : ''}`}
        onClick={() => set(d => ({ ...d, jobMetaLayout: 'inline' }))}
        title="Company & date on same line as title"
      >—</button>
      <button
        className={`sa-layout-btn${data.jobMetaLayout === 'below' ? ' active' : ''}`}
        onClick={() => set(d => ({ ...d, jobMetaLayout: 'below' }))}
        title="Company & date below title"
      >↓</button>
    </div>
  )

  const sectionCtrl = (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={moveUp} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={moveDown} title="Move down">↓</button>
      {metaLayoutExtra}
    </div>
  )

  return (
    <section
      key="work"
      className="section section-wrap"
      onMouseEnter={() => activate('work')}
      onMouseLeave={deactivate}
      onFocus={() => activate('work')}
      onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('work', [
        ['sectionTitle', 'Section Title'], ['jobTitle', 'Job Title'],
        ['jobCompany', 'Company'], ['jobPeriod', 'Period'],
        ['jobDesc', 'Desc'], ['bulletText', 'Bullet'],
      ], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>WORK EXPERIENCE</h2>
      </div>
      <div className="jobs-tl-wrap">
        {data.workExperience.map(job => {
          const metaBelow = data.jobMetaLayout === 'below'
          const jobMeta = (
            <div className={metaBelow ? 'job-meta job-meta-below' : 'job-meta'}>
              {!job.hidden?.company ? (
                <span className="job-meta-item">
                  <E
                    as="span"
                    className="job-company-inline"
                    value={job.company}
                    onChange={v => setJob(job.id, 'company', v)}
                    style={ts('jobCompany')}
                  />
                  <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'company', true)}>×</button>
                </span>
              ) : (
                <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'company', false)}>+co</button>
              )}
              {!job.hidden?.company && !job.hidden?.period && <span className="meta-sep">·</span>}
              {!job.hidden?.period ? (
                <span className="job-meta-item">
                  <E
                    as="span"
                    className="job-period-inline"
                    value={job.period}
                    onChange={v => setJob(job.id, 'period', v)}
                    style={ts('jobPeriod')}
                  />
                  <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'period', true)}>×</button>
                </span>
              ) : (
                <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'period', false)}>+date</button>
              )}
            </div>
          )

          return (
            <div key={job.id} className="job-entry">
              <div className="tl-dot" />
              <div className="job-header-row">
                <E
                  as="div"
                  className="job-title"
                  value={job.title}
                  onChange={v => setJob(job.id, 'title', v)}
                  style={{ ...ts('jobTitle'), color: accentColor }}
                />
                {!metaBelow && jobMeta}
                <button className="btn-remove-job no-print" onClick={() => removeJob(job.id)}>✕</button>
              </div>
              {metaBelow && jobMeta}
              {!job.hidden?.description ? (
                <div className="opt-row">
                  <E
                    as="div"
                    className="job-desc"
                    value={job.description}
                    onChange={v => setJob(job.id, 'description', v)}
                    style={ts('jobDesc')}
                    inlineFmt
                  />
                  <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'description', true)}>×</button>
                </div>
              ) : (
                <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'description', false)}>+ description</button>
              )}
              <ul className="bullets">
                {job.bullets.map((b, bi) => (
                  <BulletRow
                    key={bi}
                    value={b}
                    onChange={v => setBullet(job.id, bi, v)}
                    onEnter={() => addBullet(job.id, bi)}
                    onRemove={() => removeBullet(job.id, bi)}
                    onBackspaceEmpty={() => bi > 0 && removeBullet(job.id, bi)}
                    bulletStyle={ts('bulletText')}
                    dp={{
                      drag: dragBu?.jobId === job.id && dragBu?.idx === bi,
                      over: dragBuOver?.jobId === job.id && dragBuOver?.idx === bi,
                      onStart: () => setDragBu({ jobId: job.id, idx: bi }),
                      onEnd: () => { setDragBu(null); setDragBuOver(null) },
                      onOver: e => { e.preventDefault(); setDragBuOver({ jobId: job.id, idx: bi }) },
                      onLeave: () => setDragBuOver(null),
                      onDrop: e => {
                        e.preventDefault()
                        if (dragBu?.jobId === job.id && dragBu.idx !== bi) {
                          reorderBullet(job.id, dragBu.idx, bi)
                        }
                        setDragBu(null)
                        setDragBuOver(null)
                      },
                    }}
                  />
                ))}
              </ul>
              <button className="btn-add-bullet no-print" onClick={() => addBullet(job.id, job.bullets.length - 1)}>+ Add bullet</button>
            </div>
          )
        })}
      </div>
      <button className="btn-add-section no-print" onClick={addJob}>+ Add Work Experience</button>
    </section>
  )
}
