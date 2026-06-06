import React, { useState, useRef, useEffect } from 'react'
import * as Icons from '../icons'
import { SECTION_ICON_MAP, SECTION_ICON_KEYS } from '../utils/constants'

export function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  return (
    <div ref={ref} className="icon-picker no-print" style={{ position: 'relative', display: 'inline-flex' }}>
      <button className="icon-picker-btn" onClick={() => setOpen(v => !v)} title="Choose icon">
        {value ? SECTION_ICON_MAP[value] : <span style={{ fontSize: 8, color: '#aaa' }}>icon</span>}
      </button>
      {open && (
        <div className="icon-picker-popup">
          {SECTION_ICON_KEYS.map(k => (
            <button key={k} className={`icon-picker-opt${value === k ? ' active' : ''}`} onClick={() => { onChange(k); setOpen(false) }}>{SECTION_ICON_MAP[k]}</button>
          ))}
          <button className="icon-picker-opt icon-picker-none" onClick={() => { onChange(null); setOpen(false) }}>✕</button>
        </div>
      )}
    </div>
  )
}
