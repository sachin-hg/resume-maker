import React from 'react'
import { E } from '../components/EditableText'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { DonutChart } from '../components/DonutChart'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { DONUT_COLORS } from '../utils/constants'

export const SECTION_DEF = { id: 'mytime', label: 'My Time', defaultColumn: 'sidebar' }

export function SectionMyTime({ sections, idx, layout }) {
  const { data, setMyTime, addMyTime, removeMyTime, moveSect, removeSection } = useResumeData()
  const { typo, ts, stp } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout
  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const sectionCtrl = () => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('mytime', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('mytime', 1)} title="Move down">↓</button>
      <button className="sa-remove" onClick={() => removeSection('mytime')} title="Remove section">×</button>
    </div>
  )

  return (
    <section key="mytime" className="section section-wrap"
      onMouseEnter={() => activate('mytime')} onMouseLeave={deactivate}
      onFocus={() => activate('mytime')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('mytime', [['sectionTitle', 'Section Title']], isInSidebar)} />
      <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        {sectionCtrl()}
        <h2 className="section-title st-inline" style={ts('sectionTitle')}>MY TIME</h2>
      </div>
      <div className={effectiveLayout !== 'compact' ? 'mytime-flow' : ''}>
        <DonutChart items={data.mytime || []} />
        <div className="mytime-legend">
          {(data.mytime || []).map((m, i) => (
            <div key={m.id} className="donut-legend-row">
              <span className="donut-legend-dot" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}>{String.fromCharCode(65 + i)}</span>
              <E as="span" className="donut-legend-text" value={m.label} onChange={v => setMyTime(m.id, 'label', v)} />
              <input type="number" min="1" max="99" value={m.value} onChange={e => setMyTime(m.id, 'value', Math.max(1, parseInt(e.target.value) || 1))} className="mytime-val-input no-print" />
              <button className="btn-remove-job no-print" onClick={() => removeMyTime(m.id)}>✕</button>
            </div>
          ))}
          <button className="btn-add-section no-print" onClick={addMyTime}>+ Add Item</button>
        </div>
      </div>
    </section>
  )
}
