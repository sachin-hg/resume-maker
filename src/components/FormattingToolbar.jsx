import React, { useRef, useEffect, useState } from 'react'

// ── Floating formatting toolbar ────────────────────────────────────────────────
const FMT_SELECTOR = '.bullet-text, .job-desc, .rh-summary, .extra-item-desc, .ach-desc'
export function FormattingToolbar() {
  const [pos, setPos] = useState(null)
  useEffect(() => {
    let timer = null
    const update = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const sel = window.getSelection()
        if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setPos(null); return }
        const range = sel.getRangeAt(0)
        const node = range.commonAncestorContainer
        const el = node.nodeType === 3 ? node.parentElement : node
        if (!el.closest(FMT_SELECTOR)) { setPos(null); return }
        const rect = range.getBoundingClientRect()
        if (!rect.width) { setPos(null); return }
        setPos({ top: rect.top - 36, left: rect.left + rect.width / 2 })
      }, 50)
    }
    document.addEventListener('selectionchange', update)
    return () => { document.removeEventListener('selectionchange', update); clearTimeout(timer) }
  }, [])
  if (!pos) return null
  const apply = cmd => e => { e.preventDefault(); document.execCommand(cmd) }
  return (
    <div className="fmt-tb no-print" style={{ top: pos.top, left: pos.left }}>
      <button className="fmt-b" onMouseDown={apply('bold')} title="Bold (⌘B)">B</button>
      <span className="fmt-sep" />
      <button className="fmt-i" onMouseDown={apply('italic')} title="Italic (⌘I)">I</button>
    </div>
  )
}
