import React, { useRef, useEffect } from 'react'
import { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon } from '../icons'

// ── Inline formatting helpers ──────────────────────────────────────────────────
const mdToHtml = text => text
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.*?)\*/g, '<em>$1</em>')

function htmlToMd(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  const walk = node => {
    if (node.nodeType === 3) return node.textContent
    if (node.tagName === 'STRONG' || node.tagName === 'B')
      return `**${Array.from(node.childNodes).map(walk).join('')}**`
    if (node.tagName === 'EM' || node.tagName === 'I')
      return `*${Array.from(node.childNodes).map(walk).join('')}*`
    if (node.tagName === 'BR') return ' '
    return Array.from(node.childNodes).map(walk).join('')
  }
  return walk(div).trim()
}

// ── Editable text ──────────────────────────────────────────────────────────────
export function E({ as: Tag = 'span', value, onChange, className = '', style, onKeyDown: extraKeyDown, inlineFmt }) {
  const ref = useRef(null)
  const focused = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    if (inlineFmt) ref.current.innerHTML = mdToHtml(value)
    else ref.current.textContent = value
  }, [])

  useEffect(() => {
    if (focused.current || !ref.current) return
    if (inlineFmt) {
      const expected = mdToHtml(value)
      if (ref.current.innerHTML !== expected) ref.current.innerHTML = expected
    } else {
      if (ref.current.textContent !== value) ref.current.textContent = value
    }
  })

  return (
    <Tag ref={ref} contentEditable suppressContentEditableWarning
      className={`e ${className}`.trim()} style={style}
      onFocus={() => { focused.current = true }}
      onBlur={ev => {
        focused.current = false
        const raw = inlineFmt ? htmlToMd(ev.currentTarget.innerHTML) : ev.currentTarget.textContent
        onChange(raw)
      }}
      onKeyDown={ev => {
        if (extraKeyDown) { extraKeyDown(ev); return }
        if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); ev.currentTarget.blur() }
      }}
    />
  )
}

export { AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon }

export default E
