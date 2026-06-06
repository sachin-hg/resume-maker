import React from 'react'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { RatingDots } from '../components/RatingDots'
import { E } from '../components/EditableText'

export const SECTION_DEF = { id: 'languages', label: 'Languages' }

export function SectionLanguages({ sections, idx, layout }) {
  const { data, set, moveSect, removeSection } = useResumeData()
  const { typo, ts, stp, accentColor } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout
  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const setLang = (id, f, v) => set(d => ({ ...d, languages: d.languages.map(l => l.id === id ? { ...l, [f]: v } : l) }))
  const addLang = () => set(d => ({ ...d, languages: [...(d.languages || []), { id: Math.max(0, ...(d.languages || []).map(x => x.id)) + 1, name: 'Language', level: 'Native', rating: 5 }] }))
  const removeLang = id => set(d => ({ ...d, languages: d.languages.filter(l => l.id !== id) }))

  const sectionCtrl = (extra = null) => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('languages', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('languages', 1)} title="Move down">↓</button>
      {extra}
      <button className="sa-remove" onClick={() => removeSection('languages')} title="Remove section">×</button>
    </div>
  )

  return (
    <section className="section section-wrap"
      onMouseEnter={() => activate('languages')} onMouseLeave={deactivate}
      onFocus={() => activate('languages')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('languages', [['sectionTitle', 'Section Title']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl(<>
          <button className="sa-mode" onClick={() => set(d => ({ ...d, languagesMode: d.languagesMode === 'chips' ? 'rated' : 'chips' }))} title={data.languagesMode === 'rated' ? 'Switch to chips' : 'Switch to rated'}>{data.languagesMode === 'rated' ? '◻' : '★'}</button>
          {data.languagesMode === 'rated' && <>
            <button className="sa-mode" onClick={() => set(d => { const c = d.languagesRatingStyle || 'dots'; return { ...d, languagesRatingStyle: c === 'dots' ? 'stars' : c === 'stars' ? 'bar' : 'dots' } })} title={{ dots: 'Switch to stars', stars: 'Switch to bar', bar: 'Switch to dots' }[data.languagesRatingStyle || 'dots']}>{{ dots: '★', stars: '▬', bar: '●' }[data.languagesRatingStyle || 'dots']}</button>
            <label className="sa-color-btn no-print" style={{ background: data.languagesRatingColor || accentColor }} title="Rating color">
              <input type="color" value={data.languagesRatingColor || accentColor} onChange={e => set(d => ({ ...d, languagesRatingColor: e.target.value }))} />
            </label>
          </>}
        </>)}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>LANGUAGES</h2>
      </div>
      {data.languagesMode === 'chips' ? (
        <div className="skills-row">
          {(data.languages || []).map(lang => (
            <span key={lang.id} className="skill-tag">
              <E value={lang.name} onChange={v => setLang(lang.id, 'name', v)} style={{ fontSize: ts('skills').fontSize, fontWeight: ts('skills').fontWeight }} />
              {lang.level && <span className="lang-chip-level"> · {lang.level}</span>}
              <button className="skill-remove no-print" onClick={() => removeLang(lang.id)}>×</button>
            </span>
          ))}
        </div>
      ) : (
        <div className={effectiveLayout !== 'compact' ? 'sec-2col' : ''}>
          {(data.languages || []).map(lang => (
            <div key={lang.id} className="lang-row">
              <E as="span" className="lang-name" value={lang.name} onChange={v => setLang(lang.id, 'name', v)} style={{ fontSize: '12px', fontWeight: 500 }} />
              <E as="span" className="lang-level" value={lang.level} onChange={v => setLang(lang.id, 'level', v)} style={{ fontSize: '10.5px', color: '#888' }} />
              <RatingDots value={lang.rating || 0} max={5} color={data.languagesRatingColor || accentColor} onChange={v => setLang(lang.id, 'rating', v)} ratingStyle={data.languagesRatingStyle || 'dots'} />
              <button className="btn-remove-job no-print" onClick={() => removeLang(lang.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
      <button className="btn-add-section no-print" onClick={addLang}>+ Add Language</button>
    </section>
  )
}
