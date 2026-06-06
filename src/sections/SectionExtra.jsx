import React from 'react'
import { E } from '../components/EditableText'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'

export const SECTION_DEF = { id: 'extra', label: 'Custom Section', defaultColumn: 'main' }

export function SectionExtra({ sections, idx, layout }) {
  const { data, setExtra, setExtraItem, addExtraItem, removeExtraItem, moveSect, removeSection } = useResumeData()
  const { typo, ts, stp } = useTypography()
  const { activate, deactivate } = useUI()

  const isInSidebar = layout === 'compact'
  const effectiveLayout = layout
  const colIdx = idx
  const colCount = sections ? sections.length : 0

  const es = data.extraSection
  if (!es || !es.visible) return null

  const sectionCtrl = () => (
    <div className="section-actions no-print">
      <button className="btn-move" disabled={colIdx === 0} onClick={() => moveSect('extra', -1)} title="Move up">↑</button>
      <button className="btn-move" disabled={colIdx >= colCount - 1} onClick={() => moveSect('extra', 1)} title="Move down">↓</button>
      <button className="sa-remove" onClick={() => removeSection('extra')} title="Remove section">×</button>
    </div>
  )

  return (
    <section key="extra" className="section section-wrap"
      onMouseEnter={() => activate('extra')} onMouseLeave={deactivate}
      onFocus={() => activate('extra')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('extra', [['sectionTitle', 'Section Title'], ['extraTitle', 'Item Title'], ['extraDesc', 'Item Desc']], isInSidebar)} />
      <div className="extra-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
        <E as="h2" className="section-title extra-section-title" value={es.title} onChange={v => setExtra('title', v)} style={ts('sectionTitle')} />
        {sectionCtrl()}
      </div>
      <div className={`extra-grid${(es.items.length === 1 || effectiveLayout === 'compact') ? ' extra-grid-single' : ''}`}>
        {es.items.map(item => (
          <div key={item.id} className="extra-item">
            <div className="extra-item-row">
              <E as="div" className="extra-item-title" value={item.title} onChange={v => setExtraItem(item.id, 'title', v)} style={ts('extraTitle')} />
              <button className="btn-remove-job no-print" onClick={() => removeExtraItem(item.id)}>✕</button>
            </div>
            <E as="div" className="extra-item-desc" value={item.description} onChange={v => setExtraItem(item.id, 'description', v)} style={ts('extraDesc')} inlineFmt />
          </div>
        ))}
      </div>
      <button className="btn-add-section no-print" onClick={addExtraItem}>+ Add Item</button>
    </section>
  )
}
