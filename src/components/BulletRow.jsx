import React from 'react'
import E from './EditableText'

export function BulletRow({ value, onChange, onEnter, onRemove, onBackspaceEmpty, dp, bulletStyle }) {
  return (
    <li className={`bullet-row${dp?.drag ? ' bu-drag' : ''}${dp?.over ? ' bu-over' : ''}`}
      onDragOver={dp?.onOver} onDragLeave={dp?.onLeave} onDrop={dp?.onDrop}
    >
      <span className="bu-handle no-print" draggable onDragStart={dp?.onStart} onDragEnd={dp?.onEnd}>⠿</span>
      <span className="bullet-marker">▫</span>
      <E as="span" className="bullet-text" value={value} onChange={onChange} style={bulletStyle} inlineFmt
        onKeyDown={ev => {
          if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); onEnter() }
          else if (ev.key === 'Backspace' && ev.currentTarget.textContent === '') { ev.preventDefault(); onBackspaceEmpty() }
        }}
      />
      <button className="bullet-remove no-print" onClick={onRemove}>×</button>
    </li>
  )
}
