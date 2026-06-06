import { useCallback, useEffect } from 'react'
import { THEME_DEFS } from '../themes'
import { DEFAULT_TYPO } from '../utils/constants'

const ALL_VARS = [
  '--th-page-bg', '--th-chip-bg', '--th-chip-color', '--th-chip-border',
  '--th-chip-radius', '--th-sec-rule-w', '--th-job-sep-border', '--th-job-sep-pb',
  '--th-job-sep-mb', '--th-blob-display', '--th-blob-color-1', '--th-blob-color-2',
  '--th-arc-color-1', '--th-arc-color-2',
  '--th-font-family', '--th-photo-radius', '--th-accent', '--th-accent2',
  '--th-badge-color', '--th-title-bg',
]

function applyThemeVars(def) {
  const root = document.documentElement
  ALL_VARS.forEach(v => root.style.removeProperty(v))
  Object.entries(def.vars || {}).forEach(([k, v]) => root.style.setProperty(k, v))
  const existing = document.getElementById('gf-theme')
  if (existing) existing.remove()
  if (def.googleFontUrl) {
    const link = document.createElement('link')
    link.id = 'gf-theme'; link.rel = 'stylesheet'; link.href = def.googleFontUrl
    document.head.appendChild(link)
  }
}

// useTheme accepts external state setters and runs the CSS vars side-effect.
// Returns applyTheme — call it with a theme ID to switch theme + update typo.
// onThemeChange is called after switching themes (e.g. to reset graphic/font overrides).
export function useTheme({ theme, setTheme, setTypo, onThemeChange }) {
  useEffect(() => {
    const def = THEME_DEFS.find(t => t.id === theme) || THEME_DEFS[0]
    applyThemeVars(def)
    localStorage.setItem('resume-theme', theme)
  }, [theme])

  const applyTheme = useCallback((id) => {
    const def = THEME_DEFS.find(t => t.id === id) || THEME_DEFS[0]
    setTheme(id)
    applyThemeVars(def)
    localStorage.setItem('resume-theme', id)
    const merged = { ...DEFAULT_TYPO }
    Object.entries(def.typo || {}).forEach(([k, v]) => { merged[k] = { ...DEFAULT_TYPO[k], ...v } })
    setTypo(merged)
    onThemeChange?.()
  }, [setTheme, setTypo, onThemeChange])

  return { applyTheme }
}
