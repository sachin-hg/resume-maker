import { useState, useRef, useEffect, useCallback } from 'react'

const MD_SAMPLES = import.meta.glob('/samples/*.md', { query: '?raw', import: 'default', eager: true })

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconMail = () => (
  <svg width="13" height="11" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="18" height="14" rx="2"/>
    <polyline points="1,1 10,9 19,1"/>
  </svg>
)
const IconPhone = () => (
  <svg width="10" height="13" viewBox="0 0 16 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="14" height="20" rx="3"/>
    <circle cx="8" cy="17.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)
const IconMapPin = () => (
  <svg width="11" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3.5" fill="#1e2d3e"/>
    <circle cx="5.5" cy="5.5" r="1.75" fill="white"/>
    <rect x="3.75" y="9.5" width="3.5" height="9" rx="0.5" fill="white"/>
    <path d="M11.5 9.5h3v1.4c.5-.9 1.5-1.4 2.6-1.4 2.1 0 3.4 1.5 3.4 3.9V18.5h-3.2v-4.3c0-1.2-.6-2-1.6-2-.9 0-1.6.8-1.6 2V18.5h-2.6V9.5z" fill="white"/>
  </svg>
)
const IconGithub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

// ── Alignment icons for typography panel ──────────────────────────────────────
const AlignLeftIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/>
    <rect x="0" y="4" width="8" height="2" rx="1"/>
    <rect x="0" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignCenterIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/>
    <rect x="2" y="4" width="8" height="2" rx="1"/>
    <rect x="1" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignRightIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/>
    <rect x="4" y="4" width="8" height="2" rx="1"/>
    <rect x="2" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignJustifyIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/>
    <rect x="0" y="4" width="12" height="2" rx="1"/>
    <rect x="0" y="8" width="12" height="2" rx="1"/>
  </svg>
)

// ── Typography defaults ────────────────────────────────────────────────────────
const DEFAULT_TYPO = {
  name:        { size: 38,   bold: true,  italic: false, align: 'left', color: '#ffffff' },
  title:       { size: 15,   bold: false, italic: false, align: 'left', color: '#eeeeee' },
  summary:     { size: 12,   bold: false, italic: false, align: 'justify', color: '#dddddd' },
  contact:     { size: 11.5, bold: false, italic: false, align: 'left', color: '#333333' },
  sectionTitle:{ size: 15,   bold: true,  italic: false, align: 'left', color: '#111111' },
  skills:      { size: 11,   bold: false, italic: false, align: 'left', color: '#ffffff' },
  jobTitle:    { size: 13.5, bold: true,  italic: false, align: 'left', color: '#1a7a70' },
  jobCompany:  { size: 12,   bold: false, italic: false, align: 'left', color: '#222222' },
  jobPeriod:   { size: 11,   bold: false, italic: true,  align: 'left', color: '#666666' },
  jobDesc:     { size: 11,   bold: false, italic: true,  align: 'left', color: '#999999' },
  bulletText:  { size: 11,   bold: false, italic: false, align: 'justify', color: '#333333' },
  extraTitle:  { size: 13,   bold: true,  italic: false, align: 'left', color: '#222222' },
  extraDesc:   { size: 11.5, bold: false, italic: true,  align: 'justify', color: '#555555' },
  headerBg:    { color: '#1e2d3e' },
}

// ── URL helpers: store only the path, derive full URL for href ─────────────────
const normLinkedin = v => {
  if (!v) return v
  if (v.startsWith('/')) return v
  const m = v.match(/linkedin\.com(\/.+)/)
  return m ? m[1] : '/' + v
}
const normGithub = v => {
  if (!v) return v
  if (v.startsWith('/')) return v
  const m = v.match(/github\.com(\/.+)/)
  return m ? m[1] : '/' + v
}
const liHref = path => `https://linkedin.com${path?.startsWith('/') ? path : '/' + (path || '')}`
const ghHref = path => `https://github.com${path?.startsWith('/') ? path : '/' + (path || '')}`

// ── Sample list derived from glob ─────────────────────────────────────────────
const SAMPLE_LIST = Object.entries(MD_SAMPLES).map(([path, content]) => ({
  name: path.replace('/samples/', '').replace('.md', ''),
  content,
})).sort((a, b) => a.name.localeCompare(b.name))

// ── Markdown → resume data parser ─────────────────────────────────────────────
function parseMd(md) {
  const result = {
    name: '', title: '', summary: '',
    contact: { email: '', phone: '', location: '', showLocation: true, linkedin: '', showLinkedin: true, github: '', showGithub: false },
    skills: [],
    workExperience: [],
    extraSection: { title: 'PREVIOUS ORGANIZATIONS', visible: false, items: [] },
    sectionOrder: ['skills', 'work', 'extra'],
  }

  let section = null
  let headerState = 0
  let currentJob = null
  let extraItems = []

  const pushJob = () => {
    if (!currentJob) return
    if (!currentJob.bullets.length) currentJob.bullets = ['']
    result.workExperience.push(currentJob)
    currentJob = null
  }

  for (const rawLine of md.split('\n')) {
    const line = rawLine.trim()

    if (line.startsWith('## ')) {
      pushJob()
      const sec = line.slice(3).trim()
      const secUp = sec.toUpperCase()
      if (secUp === 'CONTACT') { section = 'contact'; continue }
      if (secUp === 'SKILLS') { section = 'skills'; continue }
      if (secUp === 'WORK EXPERIENCE') { section = 'work'; result.workExperience = []; continue }
      section = 'extra'
      result.extraSection.title = sec.toUpperCase()
      result.extraSection.visible = true
      extraItems = []
      continue
    }

    if (line.startsWith('### ') && section === 'work') {
      pushJob()
      currentJob = { id: result.workExperience.length + 1, title: line.slice(4).trim(), company: '', description: '', period: '', bullets: [] }
      continue
    }

    if (!line) continue

    if (section === null) {
      if (line.startsWith('# ')) { result.name = line.slice(2).trim(); headerState = 1 }
      else if (headerState === 1) { result.title = line; headerState = 2 }
      else if (headerState === 2) { result.summary = line; headerState = 3 }
      continue
    }

    if (section === 'contact') {
      const ci = line.indexOf(':')
      if (ci > -1) {
        const key = line.slice(0, ci).trim().toLowerCase()
        const val = line.slice(ci + 1).trim()
        if (key === 'email') result.contact.email = val
        else if (key === 'phone') result.contact.phone = val
        else if (key === 'location') { result.contact.location = val; result.contact.showLocation = Boolean(val) }
        else if (key === 'linkedin') { result.contact.linkedin = val; result.contact.showLinkedin = Boolean(val) }
        else if (key === 'github') { result.contact.github = val; result.contact.showGithub = Boolean(val) }
      }
      continue
    }

    if (section === 'skills') {
      result.skills = line.split(',').map(s => s.trim()).filter(Boolean)
      continue
    }

    if (section === 'work' && currentJob) {
      if (!currentJob.company && line.includes('·')) {
        const di = line.indexOf('·')
        currentJob.company = line.slice(0, di).trim()
        currentJob.period = line.slice(di + 1).trim()
      } else if (!currentJob.description && !line.startsWith('- ')) {
        currentJob.description = line
      } else if (line.startsWith('- ')) {
        currentJob.bullets.push(line.slice(2))
      }
      continue
    }

    if (section === 'extra' && line.includes('|')) {
      const pi = line.indexOf('|')
      extraItems.push({ id: extraItems.length + 1, title: line.slice(0, pi).trim(), description: line.slice(pi + 1).trim() })
    }
  }

  pushJob()
  result.extraSection.items = extraItems
  if (extraItems.length === 0) result.extraSection.visible = false
  return result
}

// ── Initial data ───────────────────────────────────────────────────────────────
const INITIAL = {
  name: 'Sachin Agrawal',
  title: 'Software Development Team Lead at Housing.com',
  summary: 'Building performant & scalable frontend solutions for 5 years. B.Tech CSE 2015 Graduate from VIT University, Vellore',
  contact: {
    email: 'a.sachin533@gmail.com',
    phone: '9811785389',
    location: 'Gurgaon, India',
    showLocation: true,
    linkedin: '/in/sachin-agrawal-a832a841',
    showLinkedin: true,
    github: '',
    showGithub: false,
  },
  skills: ['Javascript', 'Node', 'GraphQL', 'React', 'Webpack', 'Redux', 'Preact', 'EmotionJs', 'Rollup', 'Jenkins', 'Nginx'],
  workExperience: [
    {
      id: 1,
      title: 'Software Development Team Lead',
      company: 'Housing.com',
      description: 'Leading a team of 6. Recently revamped housing.com to latest tech from ground up to clear a long pending technical debt.',
      period: 'April 2019 - Present',
      bullets: [
        'Lighthouse score improved from 55 to 89 (94 without third party scripts).',
        'Page Load times (First CPU Idle time) decreased from 5.5 to 3.6s.',
        'JS & CSS size reduced from 300 to 125KB. Optimized for long term caching.',
        'HTML size reduced from 200 to 15 - 30 KB. (achieved using Critical CSS, JS lazy loading & GraphQL against API over-fetching)',
        'Service workers for complete offline experience, along with background sync for offline conversions.',
        'Differential serving of JS bundles (38% reduction in JS sizes in modern v/s legacy browsers). Combined SSR data fetching techniques from Next.js & Apollo Client for modularity, better code splitting & lazy loading. SSR of first fold for users and complete page for bots.',
        'Dynamic content caching on Cloudfront. Reduced server load and TTFB significantly. Normalized cache keys by handling parameters like device, users/bots, A/B tests, differential JS bundles, query string normalization with Lambda@Edge using Serverless.',
        'Choosing & setting up necessary stack for our use cases (Webpack 4, Redux, React 16 with SSR & hooks, & Apollo GraphQL server).',
        'Setting up build, release processes and monitoring systems (Datadog + Sentry). Jenkins pipelines for CI/CD integrations with Github.',
        'Ongoing projects: Webp compression on nginx. GraphQL query uglification Babel Plugin for cacheable GET requests. HTTP2 server push POC on Nginx & Akamai. Preact POC (SSR on React) on Housing.com. Micro-Frontend POC using Webpack 5 Module Federation.',
      ],
    },
    {
      id: 2,
      title: 'Senior SDE for PropertyForYou.com',
      company: 'Housing.com',
      description: "Lead a 2 member Frontend team for one of housing's project. A listing aggregator platform for unifying Makaan, Housing and Proptiger",
      period: 'Sept 2018 - Dec 2019',
      bullets: [
        'Handled Ideation, decision making, development & production deployment. System was built on React, Redux, GraphQL.',
        'Along with the PWA, we built a complete AMP website (desktop + mobile) rendered on server using React, will all feature sets.',
      ],
    },
    {
      id: 3,
      title: 'Senior SDE for seller.housing.com',
      company: 'Housing.com',
      description: "Individual member. Setup housing's seller portal for brokers and owners",
      period: 'Dec 2017 - Aug 2018',
      bullets: [
        'Built a PWA on Preact + Redux on webpack 3.',
        'Created generic components and highly configurable forms which are now used across housing.',
      ],
    },
  ],
  sectionOrder: ['skills', 'work', 'extra'],
  extraSection: {
    title: 'PREVIOUS ORGANIZATIONS',
    visible: true,
    items: [
      {
        id: 1,
        title: 'SDE at Paytm (06/2017 – 12/2017)',
        description: "Migrated a chunk of Paytm Seller's monorepo (Angular 1 + React) to different microservices, rewritten in React + Redux.",
      },
      {
        id: 2,
        title: "SDE in Via.com's Flights Team (05/2015 – 05/2017)",
        description: 'Migrated a Java monolith to a Spring Boot Layer & a frontend repo in jQuery. Achieved Internationalization for 8 countries & 14 environments',
      },
    ],
  },
}

// ── Editable text component ────────────────────────────────────────────────────
function E({ as: Tag = 'span', value, onChange, className = '', style, onKeyDown: extraKeyDown }) {
  const ref = useRef(null)
  const focused = useRef(false)

  useEffect(() => { if (ref.current) ref.current.textContent = value }, [])
  useEffect(() => {
    if (!focused.current && ref.current && ref.current.textContent !== value)
      ref.current.textContent = value
  })

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`e ${className}`.trim()}
      style={style}
      onFocus={() => { focused.current = true }}
      onBlur={ev => { focused.current = false; onChange(ev.currentTarget.textContent) }}
      onKeyDown={ev => {
        if (extraKeyDown) { extraKeyDown(ev); return }
        if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); ev.currentTarget.blur() }
      }}
    />
  )
}

function nextId(list) { return Math.max(0, ...list.map(x => x.id)) + 1 }

// ── Data loader with migration from old keys ───────────────────────────────────
const normalizeContact = c => ({
  showLocation: true, showLinkedin: true, showGithub: false,
  ...c,
  linkedin: normLinkedin(c?.linkedin ?? INITIAL.contact.linkedin),
  github: normGithub(c?.github ?? ''),
  showGithub: c?.showGithub !== undefined ? c.showGithub : Boolean(c?.github),
})

function loadData() {
  try {
    const v3 = localStorage.getItem('resume-v3')
    if (v3) {
      const d = JSON.parse(v3)
      return { ...d, contact: normalizeContact(d.contact), sectionOrder: d.sectionOrder || ['skills', 'work', 'extra'] }
    }
    const old = localStorage.getItem('resume-v1') || localStorage.getItem('resume-v2')
    if (old) {
      const d = JSON.parse(old)
      return {
        ...INITIAL,
        name: d.name ?? INITIAL.name,
        title: d.title ?? INITIAL.title,
        summary: d.summary ?? INITIAL.summary,
        contact: normalizeContact(d.contact),
        skills: d.skills ?? INITIAL.skills,
        workExperience: d.workExperience ?? INITIAL.workExperience,
        extraSection: d.previousOrgs
          ? { title: 'PREVIOUS ORGANIZATIONS', visible: true, items: d.previousOrgs }
          : d.extraSection ?? INITIAL.extraSection,
      }
    }
  } catch {}
  return INITIAL
}

function loadTypo() {
  try {
    const saved = localStorage.getItem('resume-typography')
    if (saved) {
      const parsed = JSON.parse(saved)
      // merge with defaults so new keys added to DEFAULT_TYPO are picked up
      const merged = { ...DEFAULT_TYPO }
      for (const key of Object.keys(DEFAULT_TYPO)) {
        if (parsed[key]) merged[key] = { ...DEFAULT_TYPO[key], ...parsed[key] }
      }
      return merged
    }
  } catch {}
  return DEFAULT_TYPO
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(loadData)
  const [typo, setTypo] = useState(loadTypo)

  useEffect(() => { localStorage.setItem('resume-v3', JSON.stringify(data)) }, [data])
  useEffect(() => { localStorage.setItem('resume-typography', JSON.stringify(typo)) }, [typo])

  const set = useCallback(fn => setData(prev => fn(prev)), [])
  const setTypoKey = (key, val) => setTypo(t => ({ ...t, [key]: val }))
  const ts = key => {
    const t = typo[key]
    return {
      fontSize: `${t.size}px`,
      fontWeight: t.bold ? 700 : 400,
      fontStyle: t.italic ? 'italic' : 'normal',
      textAlign: t.align,
      color: t.color,
    }
  }

  const setField = (f, v) => set(d => ({ ...d, [f]: v }))
  const setContact = (f, v) => set(d => ({ ...d, contact: { ...d.contact, [f]: v } }))

  const setSkill = (i, v) => set(d => { const s = [...d.skills]; s[i] = v; return { ...d, skills: s } })
  const removeSkill = i => set(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }))
  const addSkill = () => set(d => ({ ...d, skills: [...d.skills, 'New Skill'] }))

  const setJob = (id, f, v) => set(d => ({ ...d, workExperience: d.workExperience.map(j => j.id === id ? { ...j, [f]: v } : j) }))
  const setBullet = (jid, bi, v) => set(d => ({
    ...d,
    workExperience: d.workExperience.map(j => {
      if (j.id !== jid) return j
      const b = [...j.bullets]; b[bi] = v; return { ...j, bullets: b }
    }),
  }))
  const addBullet = (jid, after) => set(d => ({
    ...d,
    workExperience: d.workExperience.map(j => {
      if (j.id !== jid) return j
      const b = [...j.bullets]; b.splice(after + 1, 0, ''); return { ...j, bullets: b }
    }),
  }))
  const removeBullet = (jid, bi) => set(d => ({
    ...d,
    workExperience: d.workExperience.map(j => j.id !== jid ? j : { ...j, bullets: j.bullets.filter((_, i) => i !== bi) }),
  }))
  const addJob = () => set(d => ({
    ...d,
    workExperience: [...d.workExperience, { id: nextId(d.workExperience), title: 'Job Title', company: 'Company', description: 'Role description', period: 'Start – End', bullets: [''] }],
  }))
  const removeJob = id => set(d => ({ ...d, workExperience: d.workExperience.filter(j => j.id !== id) }))
  const setJobHidden = (id, field, isHidden) => set(d => ({
    ...d,
    workExperience: d.workExperience.map(j =>
      j.id !== id ? j : { ...j, hidden: { ...j.hidden, [field]: isHidden } }
    ),
  }))

  const moveSect = (id, dir) => set(d => {
    const order = [...(d.sectionOrder || ['skills', 'work', 'extra'])]
    const i = order.indexOf(id), j = i + dir
    if (j < 0 || j >= order.length) return d
    ;[order[i], order[j]] = [order[j], order[i]]
    return { ...d, sectionOrder: order }
  })

  const [allSaves, setAllSaves] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resume-saves') || '{}') } catch { return {} }
  })
  const [activeSave, setActiveSave] = useState(() => localStorage.getItem('resume-active') || '')

  const saveAs = () => {
    const name = prompt('Save resume as:', activeSave || '')?.trim()
    if (!name) return
    const saves = { ...allSaves, [name]: data }
    localStorage.setItem('resume-saves', JSON.stringify(saves))
    setAllSaves(saves)
    setActiveSave(name)
    localStorage.setItem('resume-active', name)
  }

  const loadSave = name => {
    const saved = allSaves[name]
    if (!saved) return
    if (confirm(`Switch to "${name}"?`)) {
      setData({ ...saved, contact: normalizeContact(saved.contact), sectionOrder: saved.sectionOrder || ['skills', 'work', 'extra'] })
      setActiveSave(name)
      localStorage.setItem('resume-active', name)
    }
  }

  const deleteSave = name => {
    if (!confirm(`Delete saved resume "${name}"?`)) return
    const saves = { ...allSaves }
    delete saves[name]
    localStorage.setItem('resume-saves', JSON.stringify(saves))
    setAllSaves(saves)
    if (activeSave === name) { setActiveSave(''); localStorage.removeItem('resume-active') }
  }

  const [dragSk, setDragSk] = useState(null)
  const [dragSkOver, setDragSkOver] = useState(null)
  const [dragBu, setDragBu] = useState(null)
  const [dragBuOver, setDragBuOver] = useState(null)

  const reorderSkill = (from, to) => set(d => {
    const s = [...d.skills]
    s.splice(to, 0, s.splice(from, 1)[0])
    return { ...d, skills: s }
  })

  const reorderBullet = (jobId, from, to) => set(d => ({
    ...d,
    workExperience: d.workExperience.map(j => {
      if (j.id !== jobId) return j
      const b = [...j.bullets]
      b.splice(to, 0, b.splice(from, 1)[0])
      return { ...j, bullets: b }
    }),
  }))

  const setExtra = (f, v) => set(d => ({ ...d, extraSection: { ...d.extraSection, [f]: v } }))
  const setExtraItem = (id, f, v) => set(d => ({
    ...d,
    extraSection: { ...d.extraSection, items: d.extraSection.items.map(o => o.id === id ? { ...o, [f]: v } : o) },
  }))
  const addExtraItem = () => set(d => ({
    ...d,
    extraSection: { ...d.extraSection, items: [...d.extraSection.items, { id: nextId(d.extraSection.items), title: 'Title', description: 'Description' }] },
  }))
  const removeExtraItem = id => set(d => ({
    ...d,
    extraSection: { ...d.extraSection, items: d.extraSection.items.filter(o => o.id !== id) },
  }))

  const es = data.extraSection
  const esCount = es.items.length

  return (
    <div className="page-bg">
      <div className="toolbar no-print">
        <span className="toolbar-hint">
          Click to edit · <kbd>⌘P</kbd> PDF
          {activeSave ? <span className="save-name"> · {activeSave}</span> : <span className="save-unsaved"> · unsaved</span>}
        </span>
        <div className="toolbar-actions">
          {Object.keys(allSaves).length > 0 && (
            <select className="sample-select" value={activeSave} onChange={e => { if (e.target.value) loadSave(e.target.value) }}>
              <option value="" disabled>↓ My Resumes…</option>
              {Object.keys(allSaves).map(n => (
                <option key={n} value={n}>{n}{n === activeSave ? ' ✓' : ''}</option>
              ))}
            </select>
          )}
          <button className="btn-save" onClick={saveAs} title="Save with a name">
            {activeSave ? '💾 Save' : 'Save as…'}
          </button>
          {SAMPLE_LIST.length > 0 && (
            <select className="sample-select" value="" onChange={e => {
              const c = SAMPLE_LIST.find(s => s.name === e.target.value)
              if (c && confirm(`Load "${c.name}" template? Replaces current content.`)) setData(parseMd(c.content))
            }}>
              <option value="" disabled>↓ Template…</option>
              {SAMPLE_LIST.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          )}
          <button className="btn-reset" onClick={() => { if (confirm('Reset to original?')) { localStorage.removeItem('resume-v3'); setData(INITIAL) } }}>
            Reset
          </button>
        </div>
      </div>

      <div className="content-row">
        <TypographyPanel typo={typo} setTypoKey={setTypoKey} onReset={() => setTypo(DEFAULT_TYPO)} />

        <div className="resume">
          {/* ── HEADER ── */}
          <div className="rh" style={{ backgroundColor: typo.headerBg.color }}>
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={ts('title')} />
            <E as="div" className="rh-summary" value={data.summary} onChange={v => setField('summary', v)} style={ts('summary')} />
          </div>

          {/* ── CONTACT BAR ── */}
          <div className="contact-bar" style={{ fontSize: ts('contact').fontSize, fontWeight: ts('contact').fontWeight, fontStyle: ts('contact').fontStyle, color: ts('contact').color }}>
            <span className="contact-item">
              <span className="ci-icon"><IconMail/></span>
              <E value={data.contact.email} onChange={v => setContact('email', v)} />
            </span>
            <span className="contact-item">
              <span className="ci-icon"><IconPhone/></span>
              <E value={data.contact.phone} onChange={v => setContact('phone', v)} />
            </span>
            {data.contact.showLocation !== false ? (
              <span className="contact-item ci-opt">
                <span className="ci-icon"><IconMapPin/></span>
                <E value={data.contact.location} onChange={v => setContact('location', v)} />
                <button className="btn-ci-rm no-print" onClick={() => setContact('showLocation', false)}>×</button>
              </span>
            ) : (
              <button className="btn-ci-add no-print" onClick={() => setContact('showLocation', true)}>+ location</button>
            )}
            {data.contact.showLinkedin !== false ? (
              <span className="contact-item ci-opt">
                <a href={liHref(data.contact.linkedin)} target="_blank" rel="noopener noreferrer" className="ci-icon ci-link-icon">
                  <IconLinkedIn/>
                </a>
                <E value={data.contact.linkedin} onChange={v => setContact('linkedin', normLinkedin(v))} />
                <button className="btn-ci-rm no-print" onClick={() => setContact('showLinkedin', false)}>×</button>
              </span>
            ) : (
              <button className="btn-ci-add no-print" onClick={() => setContact('showLinkedin', true)}>+ linkedin</button>
            )}
            {data.contact.showGithub ? (
              <span className="contact-item ci-opt">
                <a href={ghHref(data.contact.github)} target="_blank" rel="noopener noreferrer" className="ci-icon ci-link-icon">
                  <IconGithub/>
                </a>
                <E value={data.contact.github} onChange={v => setContact('github', normGithub(v))} />
                <button className="btn-ci-rm no-print" onClick={() => setContact('showGithub', false)}>×</button>
              </span>
            ) : (
              <button className="btn-ci-add no-print" onClick={() => { setContact('showGithub', true); if (!data.contact.github) setContact('github', '/username') }}>+ github</button>
            )}
          </div>

          {/* ── SECTIONS (dynamically ordered) ── */}
          {(data.sectionOrder || ['skills', 'work', 'extra']).map((id, idx, order) => {
            const moveBtn = (
              <div className="section-move no-print">
                <button className="btn-move" disabled={idx === 0} onClick={() => moveSect(id, -1)} title="Move up">↑</button>
                <button className="btn-move" disabled={idx === order.length - 1} onClick={() => moveSect(id, 1)} title="Move down">↓</button>
              </div>
            )

            if (id === 'skills') return (
              <section key="skills" className="section">
                <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
                  <h2 className="section-title st-inline" style={ts('sectionTitle')}>SKILLS</h2>
                  {moveBtn}
                </div>
                <div className="skills-row">
                  {data.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`skill-tag${dragSk === i ? ' sk-drag' : ''}${dragSkOver === i && dragSk !== i ? ' sk-over' : ''}`}
                      onDragOver={e => { e.preventDefault(); setDragSkOver(i) }}
                      onDragLeave={() => setDragSkOver(null)}
                      onDrop={e => { e.preventDefault(); if (dragSk !== null && dragSk !== i) reorderSkill(dragSk, i); setDragSk(null); setDragSkOver(null) }}
                    >
                      <span
                        className="sk-handle no-print"
                        draggable
                        onDragStart={e => { e.stopPropagation(); setDragSk(i) }}
                        onDragEnd={() => { setDragSk(null); setDragSkOver(null) }}
                      >⠿</span>
                      <E value={skill} onChange={v => setSkill(i, v)} style={{ minWidth: 18, fontSize: ts('skills').fontSize, fontWeight: ts('skills').fontWeight, fontStyle: ts('skills').fontStyle, color: ts('skills').color }} />
                      <button className="skill-remove no-print" onClick={() => removeSkill(i)}>×</button>
                    </span>
                  ))}
                  <button className="btn-add-skill no-print" onClick={addSkill}>+ Add</button>
                </div>
              </section>
            )

            if (id === 'work') return (
              <section key="work" className="section">
                <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
                  <h2 className="section-title st-inline" style={ts('sectionTitle')}>WORK EXPERIENCE</h2>
                  {moveBtn}
                </div>
                {data.workExperience.map(job => (
                  <div key={job.id} className="job-entry">
                    <div className="job-header-row">
                      <E as="div" className="job-title" value={job.title} onChange={v => setJob(job.id, 'title', v)} style={ts('jobTitle')} />
                      <div className="job-meta">
                        {!job.hidden?.company ? (
                          <span className="job-meta-item">
                            <E as="span" className="job-company-inline" value={job.company} onChange={v => setJob(job.id, 'company', v)} style={ts('jobCompany')} />
                            <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'company', true)}>×</button>
                          </span>
                        ) : (
                          <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'company', false)}>+co</button>
                        )}
                        {!job.hidden?.company && !job.hidden?.period && <span className="meta-sep">·</span>}
                        {!job.hidden?.period ? (
                          <span className="job-meta-item">
                            <E as="span" className="job-period-inline" value={job.period} onChange={v => setJob(job.id, 'period', v)} style={ts('jobPeriod')} />
                            <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'period', true)}>×</button>
                          </span>
                        ) : (
                          <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'period', false)}>+date</button>
                        )}
                      </div>
                      <button className="btn-remove-job no-print" onClick={() => removeJob(job.id)}>✕</button>
                    </div>
                    {!job.hidden?.description ? (
                      <div className="opt-row">
                        <E as="div" className="job-desc" value={job.description} onChange={v => setJob(job.id, 'description', v)} style={ts('jobDesc')} />
                        <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'description', true)}>×</button>
                      </div>
                    ) : (
                      <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'description', false)}>+ description</button>
                    )}
                    <ul className="bullets">
                      {job.bullets.map((b, bi) => (
                        <BulletRow key={bi} value={b}
                          onChange={v => setBullet(job.id, bi, v)}
                          onEnter={() => addBullet(job.id, bi)}
                          onRemove={() => removeBullet(job.id, bi)}
                          onBackspaceEmpty={() => bi > 0 && removeBullet(job.id, bi)}
                          bulletStyle={ts('bulletText')}
                          dp={{
                            drag: dragBu?.jobId === job.id && dragBu?.idx === bi,
                            over: dragBuOver?.jobId === job.id && dragBuOver?.idx === bi,
                            onStart: () => setDragBu({ jobId: job.id, idx: bi }),
                            onEnd: () => { setDragBu(null); setDragBuOver(null) },
                            onOver: e => { e.preventDefault(); setDragBuOver({ jobId: job.id, idx: bi }) },
                            onLeave: () => setDragBuOver(null),
                            onDrop: e => { e.preventDefault(); if (dragBu?.jobId === job.id && dragBu.idx !== bi) reorderBullet(job.id, dragBu.idx, bi); setDragBu(null); setDragBuOver(null) },
                          }}
                        />
                      ))}
                    </ul>
                    <button className="btn-add-bullet no-print" onClick={() => addBullet(job.id, job.bullets.length - 1)}>+ Add bullet</button>
                  </div>
                ))}
                <button className="btn-add-section no-print" onClick={addJob}>+ Add Work Experience</button>
              </section>
            )

            if (id === 'extra') return es.visible ? (
              <section key="extra" className="section">
                <div className="extra-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
                  <E as="h2" className="section-title extra-section-title" value={es.title} onChange={v => setExtra('title', v)} style={ts('sectionTitle')} />
                  {moveBtn}
                  <button className="btn-remove-section no-print" onClick={() => setExtra('visible', false)}>× Remove Section</button>
                </div>
                <div className={`extra-grid${esCount === 1 ? ' extra-grid-single' : ''}`}>
                  {es.items.map(item => (
                    <div key={item.id} className="extra-item">
                      <div className="extra-item-row">
                        <E as="div" className="extra-item-title" value={item.title} onChange={v => setExtraItem(item.id, 'title', v)} style={ts('extraTitle')} />
                        <button className="btn-remove-job no-print" onClick={() => removeExtraItem(item.id)}>✕</button>
                      </div>
                      <E as="div" className="extra-item-desc" value={item.description} onChange={v => setExtraItem(item.id, 'description', v)} style={ts('extraDesc')} />
                    </div>
                  ))}
                </div>
                <button className="btn-add-section no-print" onClick={addExtraItem}>+ Add Item</button>
              </section>
            ) : (
              <div key="extra" className="no-print" style={{ padding: '6px 28px 12px' }}>
                <button className="btn-add-section" style={{ width: 'auto', padding: '4px 16px' }} onClick={() => setExtra('visible', true)}>
                  + Add Section (Prev Orgs / Projects / etc.)
                </button>
              </div>
            )

            return null
          })}
        </div>
      </div>
    </div>
  )
}

// ── Typography panel row ───────────────────────────────────────────────────────
function TypoRow({ label, value, onChange }) {
  return (
    <div className="tp-row">
      <div className="tp-label">{label}</div>
      <div className="tp-line1">
        <input
          type="number"
          className="tp-size"
          value={value.size}
          min={7} max={72} step={0.5}
          onChange={e => {
            const n = parseFloat(e.target.value)
            if (!isNaN(n)) onChange({ ...value, size: n })
          }}
        />
        <span className="tp-unit">px</span>
        <button
          className={`tp-btn tp-bold${value.bold ? ' tp-on' : ''}`}
          onClick={() => onChange({ ...value, bold: !value.bold })}
          title="Bold"
        >B</button>
        <button
          className={`tp-btn tp-ital${value.italic ? ' tp-on' : ''}`}
          onClick={() => onChange({ ...value, italic: !value.italic })}
          title="Italic"
        >I</button>
        <input
          type="color"
          className="tp-color"
          value={value.color}
          onChange={e => onChange({ ...value, color: e.target.value })}
          title="Text color"
        />
      </div>
      <div className="tp-line2">
        {[
          ['left', <AlignLeftIcon />],
          ['center', <AlignCenterIcon />],
          ['right', <AlignRightIcon />],
          ['justify', <AlignJustifyIcon />],
        ].map(([a, icon]) => (
          <button
            key={a}
            className={`tp-align${value.align === a ? ' tp-on' : ''}`}
            onClick={() => onChange({ ...value, align: a })}
            title={`Align ${a}`}
          >{icon}</button>
        ))}
      </div>
    </div>
  )
}

// ── Typography panel ───────────────────────────────────────────────────────────
function TypographyPanel({ typo, setTypoKey, onReset }) {
  const row = (key, label) => (
    <TypoRow key={key} label={label} value={typo[key]} onChange={val => setTypoKey(key, val)} />
  )
  return (
    <div className="typo-panel no-print">
      <div className="tp-header">
        <span className="tp-title">Typography</span>
        <button className="tp-reset" onClick={onReset} title="Reset all typography to defaults">Reset</button>
      </div>

      <div className="tp-group">
        <div className="tp-group-label">Header</div>
        <div className="tp-row">
          <div className="tp-label">Background</div>
          <div className="tp-line1">
            <input type="color" className="tp-color" style={{ marginLeft: 0 }}
              value={typo.headerBg.color}
              onChange={e => setTypoKey('headerBg', { color: e.target.value })}
              title="Header background color" />
          </div>
        </div>
        {row('name', 'Name')}
        {row('title', 'Title')}
        {row('summary', 'Summary')}
      </div>

      <div className="tp-group">
        <div className="tp-group-label">Contact</div>
        {row('contact', 'Contact')}
      </div>

      <div className="tp-group">
        <div className="tp-group-label">Sections</div>
        {row('sectionTitle', 'Section Title')}
        {row('skills', 'Skills')}
      </div>

      <div className="tp-group">
        <div className="tp-group-label">Job Entries</div>
        {row('jobTitle', 'Job Title')}
        {row('jobCompany', 'Company')}
        {row('jobPeriod', 'Period')}
        {row('jobDesc', 'Job Desc')}
        {row('bulletText', 'Bullet')}
      </div>

      <div className="tp-group">
        <div className="tp-group-label">Extra Section</div>
        {row('extraTitle', 'Item Title')}
        {row('extraDesc', 'Item Desc')}
      </div>
    </div>
  )
}

// ── Bullet row ─────────────────────────────────────────────────────────────────
function BulletRow({ value, onChange, onEnter, onRemove, onBackspaceEmpty, dp, bulletStyle }) {
  return (
    <li
      className={`bullet-row${dp?.drag ? ' bu-drag' : ''}${dp?.over ? ' bu-over' : ''}`}
      onDragOver={dp?.onOver}
      onDragLeave={dp?.onLeave}
      onDrop={dp?.onDrop}
    >
      <span
        className="bu-handle no-print"
        draggable
        onDragStart={dp?.onStart}
        onDragEnd={dp?.onEnd}
      >⠿</span>
      <span className="bullet-marker">▫</span>
      <E
        as="span"
        className="bullet-text"
        value={value}
        onChange={onChange}
        style={bulletStyle}
        onKeyDown={ev => {
          if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); onEnter() }
          else if (ev.key === 'Backspace' && ev.currentTarget.textContent === '') { ev.preventDefault(); onBackspaceEmpty() }
        }}
      />
      <button className="bullet-remove no-print" onClick={onRemove}>×</button>
    </li>
  )
}
