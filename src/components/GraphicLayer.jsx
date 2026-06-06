import React from 'react'
import { GRAPHIC_DEFS } from '../graphics/defs'

// z-index: 2 places graphics above layout column divs (which get z-index:1 from the resume CSS rule)
// Low SVG fillOpacity (0.04–0.12) keeps text fully legible even when graphics overlay content
const SLOT_STYLES = {
  'top-right':     { position: 'absolute', top: 0, right: 0, pointerEvents: 'none', zIndex: 2 },
  'top-left':      { position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 },
  'bottom-right':  { position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none', zIndex: 2 },
  'bottom-left':   { position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', zIndex: 2 },
  'bottom-center': { position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 2 },
}

export function GraphicLayer({ graphicId }) {
  if (!graphicId || graphicId === 'none') return null
  const def = GRAPHIC_DEFS.find(g => g.id === graphicId)
  if (!def || !def.placements.length) return null

  return (
    <>
      {def.placements.map(({ slot, render }) => (
        <div key={slot} className="no-print" style={SLOT_STYLES[slot]}>
          {render()}
        </div>
      ))}
    </>
  )
}
