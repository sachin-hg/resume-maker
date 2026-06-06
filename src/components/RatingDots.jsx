import React from 'react'

export function RatingDots({ value = 0, max = 5, onChange, color = '#1e2d3e', ratingStyle = 'dots' }) {
  if (ratingStyle === 'bar') {
    const pct = max > 0 ? (value / max) * 100 : 0
    const handleClick = onChange ? (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const newVal = Math.round(((e.clientX - rect.left) / rect.width) * max)
      onChange(Math.max(0, Math.min(max, newVal)) === value ? 0 : Math.max(0, Math.min(max, newVal)))
    } : undefined
    return (
      <span className="rating-bar no-print-interaction" onClick={handleClick}
        style={{ cursor: onChange ? 'pointer' : 'default' }}>
        <span className="rating-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </span>
    )
  }
  return (
    <span className={`rating-dots no-print-interaction${ratingStyle === 'stars' ? ' rating-stars' : ''}`}>
      {Array.from({ length: max }, (_, i) => (
        ratingStyle === 'stars' ? (
          <span key={i} className="rstar" style={{ color: i < value ? color : '#ddd' }}
            onClick={onChange ? () => onChange(i + 1 === value ? 0 : i + 1) : undefined}>★</span>
        ) : (
          <span key={i} className={`rdot${i < value ? ' rdot-on' : ' rdot-off'}`}
            style={i < value ? { background: color, borderColor: color } : { borderColor: color }}
            onClick={onChange ? () => onChange(i + 1 === value ? 0 : i + 1) : undefined} />
        )
      ))}
    </span>
  )
}
