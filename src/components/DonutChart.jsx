import React from 'react'

const DONUT_COLORS = ['#4292c6','#74c476','#fd8d3c','#9467bd','#e377c2','#8c564b','#17becf','#bcbd22']

export function DonutChart({ items }) {
  if (!items || !items.length) return <div className="donut-empty no-print">Add items to see chart</div>
  const SIZE = 160, cx = 80, cy = 80, outerR = 58, innerR = 33
  const total = items.reduce((s, it) => s + Math.max(1, it.value || 1), 0)
  let angle = -Math.PI / 2
  const segs = items.map((item, i) => {
    const v = Math.max(1, item.value || 1)
    const sweep = (v / total) * 2 * Math.PI
    const end = angle + sweep, large = sweep > Math.PI ? 1 : 0
    const x1 = cx + outerR * Math.cos(angle), y1 = cy + outerR * Math.sin(angle)
    const x2 = cx + outerR * Math.cos(end),   y2 = cy + outerR * Math.sin(end)
    const ix1 = cx + innerR * Math.cos(angle), iy1 = cy + innerR * Math.sin(angle)
    const ix2 = cx + innerR * Math.cos(end),   iy2 = cy + innerR * Math.sin(end)
    const mid = angle + sweep / 2
    const lx = cx + (outerR + 11) * Math.cos(mid), ly = cy + (outerR + 11) * Math.sin(mid)
    const d = `M${x1},${y1} A${outerR},${outerR} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${large},0 ${ix1},${iy1} Z`
    const color = item.color || DONUT_COLORS[i % DONUT_COLORS.length]
    const seg = { d, lx, ly, color, lbl: String.fromCharCode(65 + i) }
    angle = end; return seg
  })
  return (
    <div className="donut-wrap">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {segs.map((s, i) => <path key={i} d={s.d} fill={s.color} stroke="#fff" strokeWidth="1.5"/>)}
        {segs.map((s, i) => <text key={i} x={s.lx} y={s.ly} textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="700" fill="#333">{s.lbl}</text>)}
      </svg>
    </div>
  )
}
