import React from 'react'
import { SECTION_TYPE_DEFS } from '../utils/constants'
import { TEMPLATE_DEFS } from '../layouts/defs'

// ── Section Manager ────────────────────────────────────────────────────────────
export function SectionManager({ sectionOrder, columnAssignment, template, onAdd, onRemove, onMoveUp, onMoveDown, onColumnChange, onClose }) {
  const tplDef = TEMPLATE_DEFS.find(t => t.id === template) || TEMPLATE_DEFS[0]
  const activeSections = sectionOrder
  const inactiveSections = Object.keys(SECTION_TYPE_DEFS).filter(id => !activeSections.includes(id))

  return (
    <div className="sm-overlay no-print">
      <div className="sm-panel">
        <div className="sm-header">
          <span>Manage Sections</span>
          <button className="sm-close" onClick={onClose}>×</button>
        </div>

        <div className="sm-body">
          <div className="sm-group-label">Active Sections</div>
          {activeSections.map((id, idx) => (
            <div key={id} className="sm-row">
              <span className="sm-row-label">{SECTION_TYPE_DEFS[id]?.label || id}</span>
              {tplDef.columnOptions && (
                <select className="sm-col-select" value={columnAssignment[id] || tplDef.columnOptions[0].value}
                  onChange={e => onColumnChange(id, e.target.value)}>
                  {tplDef.columnOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
              <button className="sm-btn-icon" disabled={idx === 0} onClick={() => onMoveUp(id)} title="Move up">↑</button>
              <button className="sm-btn-icon" disabled={idx === activeSections.length - 1} onClick={() => onMoveDown(id)} title="Move down">↓</button>
              <button className="sm-btn-remove" onClick={() => onRemove(id)} title="Remove section">×</button>
            </div>
          ))}

          {inactiveSections.length > 0 && (
            <>
              <div className="sm-group-label sm-group-label-add">Add Section</div>
              {inactiveSections.map(id => (
                <div key={id} className="sm-row sm-row-inactive">
                  <span className="sm-row-label sm-row-label-dim">{SECTION_TYPE_DEFS[id]?.label || id}</span>
                  <button className="sm-btn-add" onClick={() => onAdd(id)}>+ Add</button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
