import { useState, useRef, useEffect, useCallback } from 'react'
import { ResumeProvider } from './context/ResumeContext'
import { TypographyProvider } from './context/TypographyContext'
import { UIProvider } from './context/UIContext'
import { useTheme } from './hooks/useTheme'
import { usePersist } from './hooks/usePersist'
import { TEMPLATE_DEFS, LAYOUT_COMPONENTS } from './layouts'
import { THEME_DEFS } from './themes'
import { SECTION_REGISTRY } from './sections'
import { FormattingToolbar } from './components/FormattingToolbar'
import { ThemePicker } from './components/ThemePicker'
import { TemplatePicker } from './components/TemplatePicker'
import { SectionManager } from './components/SectionManager'
import { GraphicLayer } from './components/GraphicLayer'
import { GraphicPicker } from './components/GraphicPicker'
import { FONT_DEFS, loadFont } from './graphics/fonts'
import { isColorDark } from './utils/color'
import { DEFAULT_TYPO, INITIAL, normalizeContact } from './utils/constants'
import { parseMd, dataToMd, parseTypoFromMd } from './utils/markdown'
import './styles/index.css'

const MD_SAMPLES = import.meta.glob('/samples/*.md', { query: '?raw', import: 'default', eager: true })
const SAMPLE_LIST = Object.entries(MD_SAMPLES)
  .map(([path, content]) => ({ name: path.split('/').pop().replace('.md', ''), content }))
  .sort((a, b) => a.name.localeCompare(b.name))

// ── Pure helpers ───────────────────────────────────────────────────────────────
function nextId(list) { return Math.max(0, ...list.map(x => x.id)) + 1 }

function getDefaultColumns(tplId) {
  const tpl = TEMPLATE_DEFS.find(t => t.id === tplId) || TEMPLATE_DEFS[0]
  const a = {}
  for (const id of (tpl.defaultMain || [])) a[id] = 'main'
  for (const id of (tpl.defaultSidebar || [])) a[id] = 'sidebar'
  for (const id of (tpl.defaultLeft || [])) a[id] = 'left'
  for (const id of (tpl.defaultRight || [])) a[id] = 'right'
  for (const id of (tpl.defaultBottom || [])) a[id] = 'bottom'
  return a
}

function renderSection(id, sections, idx, layoutMode) {
  const def = SECTION_REGISTRY[id]
  if (!def) return null
  const Comp = def.component
  return <Comp key={id} sections={sections} idx={idx} layout={layoutMode} />
}

// ── State initializers ─────────────────────────────────────────────────────────
function initData() {
  try {
    const v3 = localStorage.getItem('resume-v3')
    if (v3) {
      const d = JSON.parse(v3)
      return {
        ...INITIAL, ...d,
        contact: normalizeContact(d.contact),
        sectionOrder: d.sectionOrder || ['skills', 'work', 'extra'],
        education: d.education || [], achievements: d.achievements || [],
        languages: d.languages || [], courses: d.courses || [],
        passions: d.passions || [], certifications: d.certifications || [],
        mytime: d.mytime || [],
        jobMetaLayout: d.jobMetaLayout || 'inline',
        skillsMode: d.skillsMode || 'chips',
        skillsRatingStyle: d.skillsRatingStyle || 'dots',
        skillRatings: d.skillRatings || {},
        languagesMode: d.languagesMode || 'rated',
        languagesRatingStyle: d.languagesRatingStyle || 'dots',
      }
    }
    const old = localStorage.getItem('resume-v1') || localStorage.getItem('resume-v2')
    if (old) {
      const d = JSON.parse(old)
      return {
        ...INITIAL, name: d.name ?? INITIAL.name, title: d.title ?? INITIAL.title,
        summary: d.summary ?? INITIAL.summary, contact: normalizeContact(d.contact),
        skills: d.skills ?? INITIAL.skills, workExperience: d.workExperience ?? INITIAL.workExperience,
        extraSection: d.previousOrgs
          ? { title: 'PREVIOUS ORGANIZATIONS', visible: true, items: d.previousOrgs }
          : d.extraSection ?? INITIAL.extraSection,
        education: [], achievements: [],
      }
    }
  } catch {}
  return INITIAL
}

function initTypo() {
  try {
    const saved = localStorage.getItem('resume-typography')
    if (saved) {
      const parsed = JSON.parse(saved)
      const merged = { ...DEFAULT_TYPO }
      for (const key of Object.keys(DEFAULT_TYPO)) {
        if (parsed[key]) merged[key] = { ...DEFAULT_TYPO[key], ...parsed[key] }
      }
      return merged
    }
  } catch {}
  return DEFAULT_TYPO
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(initData)
  const [typo, setTypo] = useState(initTypo)
  const [template, setTemplate] = useState(() => localStorage.getItem('resume-template') || 'classic')
  const [columnAssignment, setColumnAssignment] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('resume-columns') || 'null')
      if (saved) return saved
    } catch {}
    return getDefaultColumns(localStorage.getItem('resume-template') || 'classic')
  })
  const [sidebarSide, setSidebarSide] = useState(() => localStorage.getItem('resume-sidebar-side') || 'right')
  const [theme, setTheme] = useState(() => localStorage.getItem('resume-theme') || 'default')
  const [activeSection, setActiveSection] = useState(null)
  const [allSaves, setAllSaves] = useState(() => { try { return JSON.parse(localStorage.getItem('resume-saves') || '{}') } catch { return {} } })
  const [activeSave, setActiveSave] = useState(() => localStorage.getItem('resume-active') || '')
  const [graphic, setGraphic] = useState(() => localStorage.getItem('resume-graphic') || null)
  const [font, setFont] = useState(() => localStorage.getItem('resume-font') || null)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [showSectionManager, setShowSectionManager] = useState(false)
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showStylePicker, setShowStylePicker] = useState(false)
  const [dragSk, setDragSk] = useState(null)
  const [dragSkOver, setDragSkOver] = useState(null)
  const [dragBu, setDragBu] = useState(null)
  const [dragBuOver, setDragBuOver] = useState(null)

  const { applyTheme } = useTheme({
    theme, setTheme, setTypo,
    onThemeChange: useCallback(() => { setGraphic(null); setFont(null) }, []),
  })

  usePersist('resume-v3', data)
  usePersist('resume-typography', typo)
  usePersist('resume-template', template)
  usePersist('resume-columns', columnAssignment)
  usePersist('resume-sidebar-side', sidebarSide)

  // Apply user font override — when null, theme CSS var takes over
  useEffect(() => {
    if (font) {
      const def = FONT_DEFS.find(f => f.id === font)
      if (def?.stack) {
        loadFont(def)
        document.documentElement.style.setProperty('--th-font-family', def.stack)
      }
    }
  }, [font])

  useEffect(() => {
    if (graphic) localStorage.setItem('resume-graphic', graphic)
    else localStorage.removeItem('resume-graphic')
  }, [graphic])
  useEffect(() => {
    if (font) localStorage.setItem('resume-font', font)
    else localStorage.removeItem('resume-font')
  }, [font])

  // ── Activation ───────────────────────────────────────────────────────────────
  const leaveTimer = useRef(null)
  const activate = useCallback(id => { clearTimeout(leaveTimer.current); setActiveSection(id) }, [])
  const deactivate = useCallback(() => {
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => setActiveSection(null), 300)
  }, [])

  // ── Core setters ─────────────────────────────────────────────────────────────
  const set = useCallback(fn => setData(prev => fn(prev)), [])
  const setTypoKey = useCallback((key, val) => setTypo(t => ({ ...t, [key]: val })), [])
  const setField = useCallback((f, v) => set(d => ({ ...d, [f]: v })), [set])

  // ── Typography helpers ────────────────────────────────────────────────────────
  const ts = key => {
    const t = typo[key]
    if (!t || typeof t.size === 'undefined') return {}
    return { fontSize: `${t.size}px`, fontWeight: t.bold ? 700 : 400, fontStyle: t.italic ? 'italic' : 'normal', textAlign: t.align, color: t.color }
  }
  const stp = (id, rows, flipped = false) => ({
    visible: activeSection === id,
    onEnter: () => activate(id),
    onLeave: deactivate,
    typo, setTypoKey, rows, flipped,
  })
  const accentColor = typo.accentColor?.color || '#1a7a70'

  // ── Theme-derived values ──────────────────────────────────────────────────────
  const themeDef = THEME_DEFS.find(t => t.id === theme) || THEME_DEFS[0]
  const themeHasTimeline = themeDef.timelineDecoration || false
  const themeHasBadge = themeDef.sectionBadge || false
  const themeHasTitlePill = themeDef.titlePill || false
  const themeSectionStyle = themeDef.sectionStyle || 'rule-under'
  const themeChipStyle = themeDef.chipStyle || 'default'
  // Effective graphic: user explicit choice → theme default → none
  const effectiveGraphic = graphic ?? (themeDef.defaultGraphic || 'none')

  // ── Layout-derived values ─────────────────────────────────────────────────────
  const tplDef = TEMPLATE_DEFS.find(t => t.id === template) || TEMPLATE_DEFS[0]
  const isMultiCol = tplDef.columns !== 'single'
  const isThreeCol = tplDef.columns === 'three'
  const isSidebarBand = tplDef.columns === 'sidebar-band'
  const sectionOrder = data.sectionOrder || ['skills', 'work', 'extra']
  const noSummary = id => !(tplDef.summaryHandledByLayout && id === 'summary')
  const mainSections = isMultiCol ? sectionOrder.filter(id => (columnAssignment[id] || 'main') === 'main' && noSummary(id)) : sectionOrder.filter(noSummary)
  const sidebarSections = (isMultiCol && !isThreeCol) ? sectionOrder.filter(id => (columnAssignment[id] || 'main') === 'sidebar' && noSummary(id)) : []
  const leftSections = isThreeCol ? sectionOrder.filter(id => (columnAssignment[id] || 'left') === 'left') : []
  const rightSections = isThreeCol ? sectionOrder.filter(id => (columnAssignment[id] || 'right') === 'right') : []
  const bottomSections = isSidebarBand ? sectionOrder.filter(id => columnAssignment[id] === 'bottom' && noSummary(id)) : []

  const headerIsDarkForSummary = isColorDark(typo.headerBg.color)
  const summaryInHeaderStyle = headerIsDarkForSummary
    ? { ...ts('summary'), color: 'rgba(255,255,255,0.70)' }
    : ts('summary')
  const pillTitleStyle = themeHasTitlePill
    ? { ...ts('title'), color: '#ffffff', background: `var(--th-accent, ${accentColor})`, padding: '5px 14px', borderRadius: '5px', margin: '3px 0', borderBottom: 'none', display: 'inline-block', lineHeight: 1.4 }
    : ts('title')
  const resumeClasses = [
    'resume', `resume-${template}`,
    themeHasTimeline && 'resume-tl',
    themeHasBadge && 'resume-badge',
    themeHasTitlePill && 'resume-title-pill',
    themeSectionStyle === 'overline' && 'resume-sec-overline',
    themeSectionStyle === 'left-accent' && 'resume-sec-left-accent',
    themeChipStyle === 'underlined' && 'resume-chip-underline',
  ].filter(Boolean).join(' ')

  const LayoutComponent = LAYOUT_COMPONENTS[template] || LAYOUT_COMPONENTS['classic']

  // ── Skills ───────────────────────────────────────────────────────────────────
  const setSkill = (i, v) => set(d => { const s = [...d.skills]; s[i] = v; return { ...d, skills: s } })
  const removeSkill = i => set(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }))
  const addSkill = () => set(d => ({ ...d, skills: [...d.skills, 'New Skill'] }))
  const toggleSkillsMode = () => set(d => ({ ...d, skillsMode: d.skillsMode === 'chips' ? 'rated' : 'chips' }))
  const setSkillRating = (name, v) => set(d => ({ ...d, skillRatings: { ...d.skillRatings, [name]: v } }))
  const reorderSkill = (from, to) => set(d => { const s = [...d.skills]; s.splice(to, 0, s.splice(from, 1)[0]); return { ...d, skills: s } })

  // ── Work ─────────────────────────────────────────────────────────────────────
  const setJob = (id, f, v) => set(d => ({ ...d, workExperience: d.workExperience.map(j => j.id === id ? { ...j, [f]: v } : j) }))
  const setBullet = (jid, bi, v) => set(d => ({ ...d, workExperience: d.workExperience.map(j => j.id !== jid ? j : { ...j, bullets: j.bullets.map((b, i) => i === bi ? v : b) }) }))
  const addBullet = (jid, after) => set(d => ({ ...d, workExperience: d.workExperience.map(j => { if (j.id !== jid) return j; const b = [...j.bullets]; b.splice(after + 1, 0, ''); return { ...j, bullets: b } }) }))
  const removeBullet = (jid, bi) => set(d => ({ ...d, workExperience: d.workExperience.map(j => j.id !== jid ? j : { ...j, bullets: j.bullets.filter((_, i) => i !== bi) }) }))
  const addJob = () => set(d => ({ ...d, workExperience: [...d.workExperience, { id: nextId(d.workExperience), title: 'Job Title', company: 'Company', description: 'Role description', period: 'Start – End', bullets: [''] }] }))
  const removeJob = id => set(d => ({ ...d, workExperience: d.workExperience.filter(j => j.id !== id) }))
  const setJobHidden = (id, field, v) => set(d => ({ ...d, workExperience: d.workExperience.map(j => j.id !== id ? j : { ...j, hidden: { ...j.hidden, [field]: v } }) }))
  const reorderBullet = (jid, from, to) => set(d => ({ ...d, workExperience: d.workExperience.map(j => { if (j.id !== jid) return j; const b = [...j.bullets]; b.splice(to, 0, b.splice(from, 1)[0]); return { ...j, bullets: b } }) }))

  // ── Education ────────────────────────────────────────────────────────────────
  const setEdu = (id, f, v) => set(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [f]: v } : e) }))
  const addEdu = () => set(d => ({ ...d, education: [...(d.education || []), { id: nextId(d.education || []), degree: 'Degree / Certification', institution: 'Institution', period: 'Year', location: '' }] }))
  const removeEdu = id => set(d => ({ ...d, education: d.education.filter(e => e.id !== id) }))

  // ── Photo ────────────────────────────────────────────────────────────────────
  const setPhoto = v => set(d => ({ ...d, photo: v }))
  const setPhotoSide = v => set(d => ({ ...d, photoSide: v }))

  // ── Achievements ─────────────────────────────────────────────────────────────
  const setAch = (id, f, v) => set(d => ({ ...d, achievements: d.achievements.map(a => a.id === id ? { ...a, [f]: v } : a) }))
  const addAch = () => set(d => ({ ...d, achievements: [...(d.achievements || []), { id: nextId(d.achievements || []), title: 'Achievement Title', description: 'Description of the achievement' }] }))
  const removeAch = id => set(d => ({ ...d, achievements: d.achievements.filter(a => a.id !== id) }))

  // ── Languages ────────────────────────────────────────────────────────────────
  const setLang = (id, f, v) => set(d => ({ ...d, languages: d.languages.map(l => l.id === id ? { ...l, [f]: v } : l) }))
  const addLang = () => set(d => ({ ...d, languages: [...(d.languages || []), { id: nextId(d.languages || []), name: 'Language', level: 'Native', rating: 5 }] }))
  const removeLang = id => set(d => ({ ...d, languages: d.languages.filter(l => l.id !== id) }))

  // ── Courses ──────────────────────────────────────────────────────────────────
  const setCourse = (id, f, v) => set(d => ({ ...d, courses: d.courses.map(c => c.id === id ? { ...c, [f]: v } : c) }))
  const addCourse = () => set(d => ({ ...d, courses: [...(d.courses || []), { id: nextId(d.courses || []), title: 'Course Title', provider: 'Provider', year: '', description: '' }] }))
  const removeCourse = id => set(d => ({ ...d, courses: d.courses.filter(c => c.id !== id) }))

  // ── Passions ─────────────────────────────────────────────────────────────────
  const setPassion = (id, f, v) => set(d => ({ ...d, passions: d.passions.map(p => p.id === id ? { ...p, [f]: v } : p) }))
  const addPassion = () => set(d => ({ ...d, passions: [...(d.passions || []), { id: nextId(d.passions || []), icon: 'star', title: 'Passion', description: 'Description' }] }))
  const removePassion = id => set(d => ({ ...d, passions: d.passions.filter(p => p.id !== id) }))

  // ── Certifications ───────────────────────────────────────────────────────────
  const setCert = (id, f, v) => set(d => ({ ...d, certifications: d.certifications.map(c => c.id === id ? { ...c, [f]: v } : c) }))
  const addCert = () => set(d => ({ ...d, certifications: [...(d.certifications || []), { id: nextId(d.certifications || []), title: 'Certification', issuer: 'Issuer', date: '' }] }))
  const removeCert = id => set(d => ({ ...d, certifications: d.certifications.filter(c => c.id !== id) }))

  // ── My Time ──────────────────────────────────────────────────────────────────
  const setMyTime = (id, f, v) => set(d => ({ ...d, mytime: d.mytime.map(m => m.id === id ? { ...m, [f]: v } : m) }))
  const addMyTime = () => set(d => ({ ...d, mytime: [...(d.mytime || []), { id: nextId(d.mytime || []), label: 'Activity', value: 1 }] }))
  const removeMyTime = id => set(d => ({ ...d, mytime: d.mytime.filter(m => m.id !== id) }))

  // ── Extra section ────────────────────────────────────────────────────────────
  const setExtra = (f, v) => set(d => ({ ...d, extraSection: { ...d.extraSection, [f]: v } }))
  const setExtraItem = (id, f, v) => set(d => ({ ...d, extraSection: { ...d.extraSection, items: d.extraSection.items.map(o => o.id === id ? { ...o, [f]: v } : o) } }))
  const addExtraItem = () => set(d => ({ ...d, extraSection: { ...d.extraSection, items: [...d.extraSection.items, { id: nextId(d.extraSection.items), title: 'Title', description: 'Description' }] } }))
  const removeExtraItem = id => set(d => ({ ...d, extraSection: { ...d.extraSection, items: d.extraSection.items.filter(o => o.id !== id) } }))

  // ── Section order ────────────────────────────────────────────────────────────
  const moveSect = (id, dir) => set(d => {
    const colIds = (d.sectionOrder || []).filter(s => (columnAssignment[s] || 'main') === (columnAssignment[id] || 'main'))
    const colIdx = colIds.indexOf(id)
    const targetId = colIds[colIdx + dir]
    if (!targetId) return d
    const order = [...d.sectionOrder]
    const a = order.indexOf(id), b = order.indexOf(targetId)
    ;[order[a], order[b]] = [order[b], order[a]]
    return { ...d, sectionOrder: order }
  })

  const addSection = id => {
    set(d => {
      if (d.sectionOrder.includes(id)) return d
      const o = [...d.sectionOrder, id]
      if (id === 'education' && !d.education?.length) return { ...d, sectionOrder: o, education: [{ id: 1, degree: 'Degree / Certification', institution: 'Institution', period: 'Year', location: '' }] }
      if (id === 'achievements' && !d.achievements?.length) return { ...d, sectionOrder: o, achievements: [{ id: 1, title: 'Achievement Title', description: 'Description' }] }
      if (id === 'extra') return { ...d, sectionOrder: o, extraSection: { ...d.extraSection, visible: true } }
      if (id === 'languages' && !d.languages?.length) return { ...d, sectionOrder: o, languages: [{ id: 1, name: 'English', level: 'Native', rating: 5 }] }
      if (id === 'courses' && !d.courses?.length) return { ...d, sectionOrder: o, courses: [{ id: 1, title: 'Course Title', provider: 'Provider', description: '' }] }
      if (id === 'passions' && !d.passions?.length) return { ...d, sectionOrder: o, passions: [{ id: 1, icon: 'star', title: 'Passion', description: 'Short description' }] }
      if (id === 'certifications' && !d.certifications?.length) return { ...d, sectionOrder: o, certifications: [{ id: 1, title: 'Certification', issuer: 'Issuer', date: '' }] }
      if (id === 'mytime' && !d.mytime?.length) return { ...d, sectionOrder: o, mytime: [{ id: 1, label: 'Activity A', value: 3 }, { id: 2, label: 'Activity B', value: 2 }, { id: 3, label: 'Activity C', value: 1 }] }
      return { ...d, sectionOrder: o }
    })
    const tpl = TEMPLATE_DEFS.find(t => t.id === template)
    if (tpl?.columnOptions) {
      setColumnAssignment(prev => {
        if (id in prev) return prev
        return { ...prev, [id]: tpl.defaultSidebar?.includes(id) ? 'sidebar' : 'main' }
      })
    }
  }

  const removeSection = id => set(d => ({
    ...d,
    sectionOrder: d.sectionOrder.filter(s => s !== id),
    extraSection: id === 'extra' ? { ...d.extraSection, visible: false } : d.extraSection,
  }))

  const reorderSection = (id, dir) => set(d => {
    const order = [...d.sectionOrder]
    const i = order.indexOf(id), j = i + dir
    if (j < 0 || j >= order.length) return d
    ;[order[i], order[j]] = [order[j], order[i]]
    return { ...d, sectionOrder: order }
  })

  const handleSelectTemplate = tplId => {
    setTemplate(tplId)
    setColumnAssignment(getDefaultColumns(tplId))
    const newTpl = TEMPLATE_DEFS.find(t => t.id === tplId)
    if (newTpl?.autoAddSummary) {
      set(d => d.sectionOrder.includes('summary') ? d : { ...d, sectionOrder: ['summary', ...d.sectionOrder] })
    }
  }

  // ── Saves ────────────────────────────────────────────────────────────────────
  const saveAs = () => {
    const name = prompt('Save resume as:', activeSave || '')?.trim()
    if (!name) return
    const saves = { ...allSaves, [name]: { data, typo, template, columnAssignment } }
    localStorage.setItem('resume-saves', JSON.stringify(saves))
    setAllSaves(saves); setActiveSave(name); localStorage.setItem('resume-active', name)
  }
  const loadSave = name => {
    const saved = allSaves[name]; if (!saved) return
    if (!confirm(`Switch to "${name}"?`)) return
    const d = saved.data || saved
    setData({ ...INITIAL, ...d, contact: normalizeContact(d.contact), sectionOrder: d.sectionOrder || ['skills', 'work', 'extra'], education: d.education || [], achievements: d.achievements || [] })
    if (saved.typo) setTypo({ ...DEFAULT_TYPO, ...saved.typo })
    if (saved.template) setTemplate(saved.template)
    if (saved.columnAssignment) setColumnAssignment(saved.columnAssignment)
    setActiveSave(name); localStorage.setItem('resume-active', name)
  }
  const deleteSave = name => {
    if (!confirm(`Delete saved resume "${name}"?`)) return
    const saves = { ...allSaves }; delete saves[name]
    localStorage.setItem('resume-saves', JSON.stringify(saves)); setAllSaves(saves)
    if (activeSave === name) { setActiveSave(''); localStorage.removeItem('resume-active') }
  }

  // ── Context values ────────────────────────────────────────────────────────────
  const resumeCtx = {
    data, set, setField,
    setSkill, removeSkill, addSkill, toggleSkillsMode, setSkillRating, reorderSkill,
    setJob, setBullet, addBullet, removeBullet, addJob, removeJob, setJobHidden, reorderBullet,
    setEdu, addEdu, removeEdu,
    setPhoto, setPhotoSide,
    setAch, addAch, removeAch,
    setLang, addLang, removeLang,
    setCourse, addCourse, removeCourse,
    setPassion, addPassion, removePassion,
    setCert, addCert, removeCert,
    setMyTime, addMyTime, removeMyTime,
    setExtra, setExtraItem, addExtraItem, removeExtraItem,
    moveSect, addSection, removeSection,
    columnAssignment, setColumnAssignment,
  }

  const typoCtx = {
    typo, setTypoKey,
    ts, stp, accentColor,
    pillTitleStyle, summaryInHeaderStyle,
    activeSection,
  }

  const uiCtx = {
    template, handleSelectTemplate,
    columnAssignment, setColumnAssignment,
    sidebarSide, setSidebarSide,
    theme, applyTheme,
    activeSection, activate, deactivate,
    allSaves, activeSave, saveAs, loadSave, deleteSave,
    showTemplatePicker, setShowTemplatePicker,
    showSectionManager, setShowSectionManager,
    showThemePicker, setShowThemePicker,
    tplDef, isMultiCol, isThreeCol, isSidebarBand,
    sectionOrder, mainSections, sidebarSections, leftSections, rightSections, bottomSections,
    renderSection,
    dragSk, setDragSk, dragSkOver, setDragSkOver,
    dragBu, setDragBu, dragBuOver, setDragBuOver,
  }

  const closeOverlays = e => {
    if (!e.target.closest('.tpl-overlay')) setShowTemplatePicker(false)
    if (!e.target.closest('.sm-overlay')) setShowSectionManager(false)
    if (!e.target.closest('.thm-overlay')) setShowThemePicker(false)
    if (!e.target.closest('.gfx-overlay')) setShowStylePicker(false)
  }

  const exportMd = () => {
    const md = dataToMd(data)
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }))
    a.download = `${(activeSave || data.name || 'resume').replace(/[^a-zA-Z0-9_. -]/g, '').replace(/\s+/g, '-').toLowerCase()}.md`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <ResumeProvider value={resumeCtx}>
      <TypographyProvider value={typoCtx}>
        <UIProvider value={uiCtx}>
          <div className="page-bg" onClick={closeOverlays}>
            <FormattingToolbar />

            {showThemePicker && <ThemePicker current={theme} onSelect={applyTheme} onClose={() => setShowThemePicker(false)} />}
            {showTemplatePicker && <TemplatePicker current={template} onSelect={handleSelectTemplate} onClose={() => setShowTemplatePicker(false)} />}
            {showStylePicker && (
              <GraphicPicker
                currentGraphic={effectiveGraphic}
                currentFont={font || 'auto'}
                onGraphicSelect={id => setGraphic(id === 'none' ? 'none' : id)}
                onFontSelect={id => setFont(id === 'auto' ? null : id)}
                onClose={() => setShowStylePicker(false)}
              />
            )}
            {showSectionManager && (
              <SectionManager
                sectionOrder={sectionOrder}
                columnAssignment={columnAssignment}
                template={template}
                onAdd={addSection}
                onRemove={removeSection}
                onMoveUp={id => reorderSection(id, -1)}
                onMoveDown={id => reorderSection(id, 1)}
                onColumnChange={(id, col) => setColumnAssignment(prev => ({ ...prev, [id]: col }))}
                onClose={() => setShowSectionManager(false)}
              />
            )}

            <div className="toolbar no-print">
              <span className="toolbar-hint">
                Click to edit · <kbd>⌘P</kbd> PDF
                {activeSave ? <span className="save-name"> · {activeSave}</span> : <span className="save-unsaved"> · unsaved</span>}
              </span>
              <div className="toolbar-actions">
                <button className={`btn-tpl${showTemplatePicker ? ' btn-tpl-active' : ''}`} onClick={e => { e.stopPropagation(); setShowTemplatePicker(v => !v); setShowSectionManager(false); setShowThemePicker(false); setShowStylePicker(false) }}>◫ Layout</button>
                <button className={`btn-tpl${showThemePicker ? ' btn-tpl-active' : ''}`} onClick={e => { e.stopPropagation(); setShowThemePicker(v => !v); setShowTemplatePicker(false); setShowSectionManager(false); setShowStylePicker(false) }}>◑ Theme</button>
                <button className={`btn-tpl${showStylePicker ? ' btn-tpl-active' : ''}`} onClick={e => { e.stopPropagation(); setShowStylePicker(v => !v); setShowTemplatePicker(false); setShowThemePicker(false); setShowSectionManager(false) }}>✦ Style</button>
                <button className={`btn-sections${showSectionManager ? ' btn-sections-active' : ''}`} onClick={e => { e.stopPropagation(); setShowSectionManager(v => !v); setShowTemplatePicker(false); setShowThemePicker(false); setShowStylePicker(false) }}>☰ Sections</button>
                {isMultiCol && <button className="btn-flip" onClick={() => setSidebarSide(s => s === 'right' ? 'left' : 'right')}>{sidebarSide === 'right' ? '⇆ Sidebar Left' : '⇆ Sidebar Right'}</button>}
                {Object.keys(allSaves).length > 0 && (
                  <select className="sample-select" value={activeSave} onChange={e => { if (e.target.value) loadSave(e.target.value) }}>
                    <option value="" disabled>↓ My Resumes…</option>
                    {Object.keys(allSaves).map(n => <option key={n} value={n}>{n}{n === activeSave ? ' ✓' : ''}</option>)}
                  </select>
                )}
                <button className="btn-save" onClick={saveAs}>{activeSave ? '💾 Save' : 'Save as…'}</button>
                {SAMPLE_LIST.length > 0 && (
                  <select className="sample-select" value="" onChange={e => {
                    const c = SAMPLE_LIST.find(s => s.name === e.target.value)
                    if (c && confirm(`Load "${c.name}" template? Replaces current content.`)) {
                      const parsed = parseMd(c.content)
                      setData(parsed)
                      const t = parseTypoFromMd(c.content)
                      if (t) setTypo(t)
                    }
                  }}>
                    <option value="" disabled>↓ Sample…</option>
                    {SAMPLE_LIST.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                )}
                <button className="btn-export" onClick={exportMd}>↓ .md</button>
                <button className="btn-reset" onClick={() => { if (confirm('Reset to original?')) { localStorage.removeItem('resume-v3'); setData(INITIAL) } }}>Reset</button>
              </div>
            </div>

            <div
              className={resumeClasses}
              style={tplDef.sidebarBgOnWrapper ? { background: typo.sidebarBg?.color ?? typo.headerBg.color } : {}}
            >
              <GraphicLayer graphicId={effectiveGraphic} />
              <LayoutComponent
                mainSections={mainSections}
                sidebarSections={sidebarSections}
                leftSections={leftSections}
                rightSections={rightSections}
                bottomSections={bottomSections}
                renderSection={renderSection}
                sidebarSide={sidebarSide}
              />
            </div>
          </div>
        </UIProvider>
      </TypographyProvider>
    </ResumeProvider>
  )
}
