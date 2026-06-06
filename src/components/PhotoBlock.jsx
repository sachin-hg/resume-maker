import React, { useRef } from 'react'

export function PhotoBlock({ photo, onUpload, onRemove, onFlip, flipSide, size = 80 }) {
  const inputRef = useRef(null)
  const handleFile = e => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = ev => onUpload(ev.target.result)
    r.readAsDataURL(f)
    e.target.value = ''
  }
  return (
    <div className={`photo-block${photo ? '' : ' photo-block-empty'}`} style={{ width: size, height: size, flexShrink: 0 }}>
      {photo ? (
        <div className="photo-container" style={{ width: size, height: size }}>
          <img src={photo} className="photo-img" style={{ width: size, height: size }} alt="Profile" />
          <button className="photo-rm no-print" onClick={onRemove} title="Remove photo">×</button>
          {onFlip && (
            <button className="photo-flip-btn no-print" onClick={onFlip} title={flipSide === 'right' ? 'Move photo left' : 'Move photo right'}>
              {flipSide === 'right' ? '← Left' : 'Right →'}
            </button>
          )}
        </div>
      ) : (
        <button className="photo-placeholder no-print" style={{ width: size, height: size }} onClick={() => inputRef.current.click()}>
          + Photo
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  )
}
