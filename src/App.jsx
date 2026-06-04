import { useState, useRef, useEffect, useCallback } from 'react'

const MD_SAMPLES = import.meta.glob('/samples/*.md', { query: '?raw', import: 'default', eager: true })

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconMail = () => (
  <svg width="13" height="11" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="18" height="14" rx="2"/><polyline points="1,1 10,9 19,1"/>
  </svg>
)
const IconPhone = () => (
  <svg width="10" height="13" viewBox="0 0 16 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="14" height="20" rx="3"/><circle cx="8" cy="17.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
)
const IconMapPin = () => (
  <svg width="11" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
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

// ── Section item icons ─────────────────────────────────────────────────────────
const IconStar     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
const IconLightning= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
const IconHeart    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
const IconTrophy   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 21h8m-4-4v4m-5-9V5h10v7a5 5 0 0 1-10 0z"/><path d="M7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4"/></svg>
const IconTarget   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
const IconBook     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconUser     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconGlobe    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const IconCalendar = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IconMusic    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
const IconCode     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const IconIdea     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.9V17H8v-2.1A7 7 0 0 1 12 2z"/></svg>

const SECTION_ICON_MAP = { star: <IconStar/>, lightning: <IconLightning/>, heart: <IconHeart/>, trophy: <IconTrophy/>, target: <IconTarget/>, book: <IconBook/>, user: <IconUser/>, globe: <IconGlobe/>, music: <IconMusic/>, code: <IconCode/>, idea: <IconIdea/> }
const SECTION_ICON_KEYS = Object.keys(SECTION_ICON_MAP)

function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  return (
    <div ref={ref} className="icon-picker no-print" style={{ position: 'relative', display: 'inline-flex' }}>
      <button className="icon-picker-btn" onClick={() => setOpen(v => !v)} title="Choose icon">
        {value ? SECTION_ICON_MAP[value] : <span style={{ fontSize: 8, color: '#aaa' }}>icon</span>}
      </button>
      {open && (
        <div className="icon-picker-popup">
          {SECTION_ICON_KEYS.map(k => (
            <button key={k} className={`icon-picker-opt${value === k ? ' active' : ''}`} onClick={() => { onChange(k); setOpen(false) }}>{SECTION_ICON_MAP[k]}</button>
          ))}
          <button className="icon-picker-opt icon-picker-none" onClick={() => { onChange(null); setOpen(false) }}>✕</button>
        </div>
      )}
    </div>
  )
}

function RatingDots({ value = 0, max = 5, onChange, color = '#1e2d3e', ratingStyle = 'dots' }) {
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

const DONUT_COLORS = ['#4292c6','#74c476','#fd8d3c','#9467bd','#e377c2','#8c564b','#17becf','#bcbd22']

function DonutChart({ items }) {
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

// ── Alignment icons ────────────────────────────────────────────────────────────
const AlignLeftIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="0" y="4" width="8" height="2" rx="1"/><rect x="0" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignCenterIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="2" y="4" width="8" height="2" rx="1"/><rect x="1" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignRightIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="4" y="4" width="8" height="2" rx="1"/><rect x="2" y="8" width="10" height="2" rx="1"/>
  </svg>
)
const AlignJustifyIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
    <rect x="0" y="0" width="12" height="2" rx="1"/><rect x="0" y="4" width="12" height="2" rx="1"/><rect x="0" y="8" width="12" height="2" rx="1"/>
  </svg>
)

// ── Template definitions ───────────────────────────────────────────────────────
const TEMPLATE_DEFS = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Dark header · Single column',
    columns: 'single',
    headerStyle: 'dark',
    defaultMain: ['skills', 'work', 'education', 'achievements', 'extra'],
    defaultSidebar: [],
  },
  {
    id: 'two-col',
    name: 'Two Column',
    desc: 'Dark header · Two-column body',
    columns: 'two',
    headerStyle: 'dark',
    defaultMain: ['work', 'education'],
    defaultSidebar: ['skills', 'achievements', 'extra'],
  },
  {
    id: 'sidebar-dark',
    name: 'Dark Sidebar',
    desc: 'Dark left panel · White content',
    columns: 'sidebar-left',
    headerStyle: 'integrated',
    defaultMain: ['summary', 'work', 'education', 'extra'],
    defaultSidebar: ['skills', 'achievements'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Light header · Clean layout',
    columns: 'single',
    headerStyle: 'light',
    defaultMain: ['skills', 'work', 'education', 'achievements', 'extra'],
    defaultSidebar: [],
  },
  {
    id: 'three-col',
    name: 'Three Column',
    desc: 'Dark left · Main center · Right sidebar',
    columns: 'three',
    headerStyle: 'dark',
    defaultLeft: ['summary', 'achievements', 'passions', 'languages'],
    defaultMain: ['work', 'education'],
    defaultRight: ['skills', 'courses', 'certifications', 'extra'],
  },
  {
    id: 'sidebar-band',
    name: 'Sidebar + Band',
    desc: 'Header · Dark sidebar + Main · Footer',
    columns: 'sidebar-band',
    headerStyle: 'dark',
    defaultSidebar: ['summary', 'skills', 'languages'],
    defaultMain: ['work', 'education'],
    defaultBottom: ['achievements', 'certifications', 'extra'],
  },
]

// ── Section type registry ──────────────────────────────────────────────────────
const SECTION_TYPE_DEFS = {
  summary:        { label: 'Summary' },
  skills:         { label: 'Skills' },
  work:           { label: 'Work Experience' },
  education:      { label: 'Education' },
  achievements:   { label: 'Key Achievements' },
  languages:      { label: 'Languages' },
  courses:        { label: 'Courses' },
  passions:       { label: 'Passions & Interests' },
  certifications: { label: 'Certifications' },
  mytime:         { label: 'My Time' },
  extra:          { label: 'Custom Section' },
}

// ── Typography defaults ────────────────────────────────────────────────────────
const DEFAULT_TYPO = {
  name:        { size: 38,   bold: true,  italic: false, align: 'left',    color: '#ffffff' },
  title:       { size: 15,   bold: false, italic: false, align: 'left',    color: '#eeeeee' },
  summary:     { size: 12,   bold: false, italic: false, align: 'justify', color: '#dddddd' },
  contact:     { size: 11.5, bold: false, italic: false, align: 'left',    color: '#333333' },
  sectionTitle:{ size: 15,   bold: true,  italic: false, align: 'left',    color: '#111111' },
  skills:      { size: 11,   bold: false, italic: false, align: 'left',    color: '#ffffff' },
  jobTitle:    { size: 13.5, bold: true,  italic: false, align: 'left',    color: '#1a7a70' },
  jobCompany:  { size: 12,   bold: false, italic: false, align: 'left',    color: '#222222' },
  jobPeriod:   { size: 11,   bold: false, italic: true,  align: 'left',    color: '#666666' },
  jobDesc:     { size: 11,   bold: false, italic: true,  align: 'left',    color: '#999999' },
  bulletText:  { size: 11,   bold: false, italic: false, align: 'justify', color: '#333333' },
  extraTitle:  { size: 13,   bold: true,  italic: false, align: 'left',    color: '#222222' },
  extraDesc:   { size: 11.5, bold: false, italic: true,  align: 'justify', color: '#555555' },
  eduDegree:   { size: 13.5, bold: true,  italic: false, align: 'left',    color: '#1a7a70' },
  eduInst:     { size: 12,   bold: false, italic: false, align: 'left',    color: '#222222' },
  eduPeriod:   { size: 11,   bold: false, italic: true,  align: 'left',    color: '#666666' },
  achTitle:    { size: 13,   bold: true,  italic: false, align: 'left',    color: '#222222' },
  achDesc:     { size: 11.5, bold: false, italic: false, align: 'justify', color: '#555555' },
  headerBg:    { color: '#1e2d3e' },
  accentColor: { color: '#1a7a70' },
}

// ── URL helpers ────────────────────────────────────────────────────────────────
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

const SAMPLE_LIST = Object.entries(MD_SAMPLES).map(([path, content]) => ({
  name: path.replace('/samples/', '').replace('.md', ''),
  content,
})).sort((a, b) => a.name.localeCompare(b.name))

// ── Markdown parser ────────────────────────────────────────────────────────────
function parseMd(md) {
  const result = {
    name: '', title: '', summary: '',
    contact: { email: '', phone: '', location: '', showLocation: true, linkedin: '', showLinkedin: true, github: '', showGithub: false },
    skills: [], skillRatings: {}, skillsMode: 'chips',
    workExperience: [],
    education: [],
    achievements: [],
    languages: [],
    courses: [],
    passions: [],
    certifications: [],
    mytime: [],
    extraSection: { title: 'PREVIOUS ORGANIZATIONS', visible: false, items: [] },
    sectionOrder: ['skills', 'work', 'extra'],
  }
  let section = null, headerState = 0, currentJob = null, currentEdu = null, extraItems = [], achItems = []
  const pushJob = () => {
    if (!currentJob) return
    if (!currentJob.bullets.length) currentJob.bullets = ['']
    result.workExperience.push(currentJob); currentJob = null
  }
  const pushEdu = () => {
    if (!currentEdu) return
    result.education.push(currentEdu); currentEdu = null
  }
  for (const rawLine of md.split('\n')) {
    const line = rawLine.trim()
    if (line.startsWith('## ')) {
      pushJob(); pushEdu()
      const sec = line.slice(3).trim(), secUp = sec.toUpperCase()
      if (secUp === 'CONTACT') { section = 'contact'; continue }
      if (secUp === 'SKILLS') { section = 'skills'; continue }
      if (secUp === 'WORK EXPERIENCE') { section = 'work'; result.workExperience = []; continue }
      if (secUp === 'EDUCATION') {
        section = 'education'; result.education = []
        if (!result.sectionOrder.includes('education')) result.sectionOrder.push('education')
        continue
      }
      if (secUp === 'KEY ACHIEVEMENTS' || secUp === 'ACHIEVEMENTS') {
        section = 'achievements'; achItems = []
        if (!result.sectionOrder.includes('achievements')) result.sectionOrder.push('achievements')
        continue
      }
      if (secUp === 'LANGUAGES') { section = 'languages'; if (!result.sectionOrder.includes('languages')) result.sectionOrder.push('languages'); continue }
      if (secUp === 'COURSES') { section = 'courses'; if (!result.sectionOrder.includes('courses')) result.sectionOrder.push('courses'); continue }
      if (secUp === 'PASSIONS & INTERESTS' || secUp === 'PASSIONS') { section = 'passions'; if (!result.sectionOrder.includes('passions')) result.sectionOrder.push('passions'); continue }
      if (secUp === 'CERTIFICATIONS') { section = 'certifications'; if (!result.sectionOrder.includes('certifications')) result.sectionOrder.push('certifications'); continue }
      if (secUp === 'MY TIME') { section = 'mytime'; if (!result.sectionOrder.includes('mytime')) result.sectionOrder.push('mytime'); continue }
      section = 'extra'; result.extraSection.title = sec.toUpperCase(); result.extraSection.visible = true; extraItems = []; continue
    }
    if (line.startsWith('### ')) {
      if (section === 'work') {
        pushJob(); currentJob = { id: result.workExperience.length + 1, title: line.slice(4).trim(), company: '', description: '', period: '', bullets: [] }
      } else if (section === 'education') {
        pushEdu(); currentEdu = { id: result.education.length + 1, degree: line.slice(4).trim(), institution: '', period: '', location: '' }
      }
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
        const key = line.slice(0, ci).trim().toLowerCase(), val = line.slice(ci + 1).trim()
        if (key === 'email') result.contact.email = val
        else if (key === 'phone') result.contact.phone = val
        else if (key === 'location') { result.contact.location = val; result.contact.showLocation = Boolean(val) }
        else if (key === 'linkedin') { result.contact.linkedin = val; result.contact.showLinkedin = Boolean(val) }
        else if (key === 'github') { result.contact.github = val; result.contact.showGithub = Boolean(val) }
      }
      continue
    }
    if (section === 'skills') {
      const items = line.split(',').map(s => s.trim()).filter(Boolean)
      result.skills = []
      result.skillRatings = {}
      for (const item of items) {
        if (item.includes('|')) {
          const [name, ratingStr] = item.split('|').map(s => s.trim())
          if (name) {
            result.skills.push(name)
            const r = parseInt(ratingStr)
            if (!isNaN(r) && r > 0) result.skillRatings[name] = r
          }
        } else {
          result.skills.push(item)
        }
      }
      result.skillsMode = Object.keys(result.skillRatings).length > 0 ? 'rated' : 'chips'
      continue
    }
    if (section === 'work' && currentJob) {
      if (!currentJob.company && line.includes('·')) {
        const di = line.indexOf('·'); currentJob.company = line.slice(0, di).trim(); currentJob.period = line.slice(di + 1).trim()
      } else if (!currentJob.description && !line.startsWith('- ')) {
        currentJob.description = line
      } else if (line.startsWith('- ')) {
        currentJob.bullets.push(line.slice(2))
      }
      continue
    }
    if (section === 'education' && currentEdu) {
      if (!currentEdu.institution) {
        const parts = line.split('·').map(p => p.trim())
        currentEdu.institution = parts[0] || ''
        currentEdu.period = parts[1] || ''
        currentEdu.location = parts[2] || ''
      }
      continue
    }
    if (section === 'achievements') {
      if (line.includes('|')) {
        const pi = line.indexOf('|')
        achItems.push({ id: achItems.length + 1, title: line.slice(0, pi).trim(), description: line.slice(pi + 1).trim() })
      }
      continue
    }
    if (section === 'languages' && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim())
      result.languages.push({ id: result.languages.length + 1, name: parts[0] || '', level: parts[1] || '', rating: parseInt(parts[2]) || 0 })
      continue
    }
    if (section === 'courses' && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim())
      result.courses.push({ id: result.courses.length + 1, title: parts[0] || '', provider: parts[1] || '', year: parts[2] || '', description: parts[3] || '' })
      continue
    }
    if (section === 'passions' && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim())
      result.passions.push({ id: result.passions.length + 1, icon: parts[0] || 'star', title: parts[1] || '', description: parts[2] || '' })
      continue
    }
    if (section === 'certifications' && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim())
      result.certifications.push({ id: result.certifications.length + 1, title: parts[0] || '', issuer: parts[1] || '', date: parts[2] || '' })
      continue
    }
    if (section === 'mytime' && line.includes('|')) {
      const parts = line.split('|').map(p => p.trim())
      result.mytime.push({ id: result.mytime.length + 1, label: parts[0] || '', value: parseInt(parts[1]) || 1 })
      continue
    }
    if (section === 'extra' && line.includes('|')) {
      const pi = line.indexOf('|')
      extraItems.push({ id: extraItems.length + 1, title: line.slice(0, pi).trim(), description: line.slice(pi + 1).trim() })
    }
  }
  pushJob(); pushEdu()
  result.extraSection.items = extraItems
  result.achievements = achItems
  if (extraItems.length === 0) result.extraSection.visible = false
  return result
}

// ── Typography ↔ md comment ────────────────────────────────────────────────────
function parseTypoFromMd(md) {
  const first = md.split('\n')[0]
  const m = first.match(/^<!-- typo:(.*) -->$/)
  if (!m) return null
  try { return { ...DEFAULT_TYPO, ...JSON.parse(m[1]) } } catch { return null }
}

// ── Data → markdown serializer ─────────────────────────────────────────────────
function dataToMd(data, typo) {
  const lines = []
  if (typo) lines.push(`<!-- typo:${JSON.stringify(typo)} -->`)
  lines.push(`# ${data.name}`)
  if (data.title)   lines.push(data.title)
  if (data.summary) lines.push(data.summary)
  lines.push('')
  lines.push('## Contact')
  lines.push(`email: ${data.contact.email || ''}`)
  lines.push(`phone: ${data.contact.phone || ''}`)
  if (data.contact.location) lines.push(`location: ${data.contact.location}`)
  if (data.contact.linkedin) lines.push(`linkedin: ${data.contact.linkedin}`)
  if (data.contact.github)   lines.push(`github: ${data.contact.github}`)
  lines.push('')
  const order = data.sectionOrder || ['skills', 'work', 'extra']
  for (const id of order) {
    if (id === 'skills') {
      lines.push('## Skills')
      const hasRatings = data.skillRatings && Object.keys(data.skillRatings).length > 0
      lines.push(data.skills.map(s => (hasRatings && data.skillRatings[s]) ? `${s} | ${data.skillRatings[s]}` : s).join(', '))
      lines.push('')
    }
    if (id === 'work') {
      lines.push('## Work Experience')
      for (const job of data.workExperience) {
        lines.push('')
        lines.push(`### ${job.title}`)
        const co  = !job.hidden?.company  ? (job.company  || '') : ''
        const per = !job.hidden?.period   ? (job.period   || '') : ''
        if (co && per) lines.push(`${co} · ${per}`)
        else if (co)   lines.push(co)
        else if (per)  lines.push(per)
        if (!job.hidden?.description && job.description) lines.push(job.description)
        for (const b of job.bullets) { if (b) lines.push(`- ${b}`) }
      }
      lines.push('')
    }
    if (id === 'education' && data.education?.length) {
      lines.push('## Education')
      for (const edu of data.education) {
        lines.push(`### ${edu.degree}`)
        const parts = [edu.institution, edu.period, edu.location].filter(Boolean)
        if (parts.length) lines.push(parts.join(' · '))
      }
      lines.push('')
    }
    if (id === 'achievements' && data.achievements?.length) {
      lines.push('## Key Achievements')
      for (const a of data.achievements) lines.push(`${a.title} | ${a.description}`)
      lines.push('')
    }
    if (id === 'languages' && data.languages?.length) {
      lines.push('## Languages')
      for (const l of data.languages) lines.push(`${l.name} | ${l.level} | ${l.rating ?? 0}`)
      lines.push('')
    }
    if (id === 'courses' && data.courses?.length) {
      lines.push('## Courses')
      for (const c of data.courses) lines.push(`${c.title} | ${c.provider} | ${c.year || ''} | ${c.description || ''}`)
      lines.push('')
    }
    if (id === 'passions' && data.passions?.length) {
      lines.push('## Passions & Interests')
      for (const p of data.passions) lines.push(`${p.icon || 'star'} | ${p.title} | ${p.description}`)
      lines.push('')
    }
    if (id === 'certifications' && data.certifications?.length) {
      lines.push('## Certifications')
      for (const c of data.certifications) lines.push(`${c.title} | ${c.issuer} | ${c.date || ''}`)
      lines.push('')
    }
    if (id === 'mytime' && data.mytime?.length) {
      lines.push('## My Time')
      for (const m of data.mytime) lines.push(`${m.label} | ${m.value}`)
      lines.push('')
    }
    if (id === 'extra' && data.extraSection.visible && data.extraSection.items.length > 0) {
      lines.push(`## ${data.extraSection.title}`)
      for (const item of data.extraSection.items) lines.push(`${item.title} | ${item.description}`)
      lines.push('')
    }
  }
  return lines.join('\n').trimEnd() + '\n'
}

// ── Photo upload block ─────────────────────────────────────────────────────────
function PhotoBlock({ photo, onUpload, onRemove, onFlip, flipSide, size = 80 }) {
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

// ── Initial data ───────────────────────────────────────────────────────────────
const INITIAL = {
  name: 'Sachin Agrawal',
  title: 'Software Development Team Lead at Housing.com',
  summary: 'Building performant & scalable frontend solutions for 5 years. B.Tech CSE 2015 Graduate from VIT University, Vellore',
  contact: {
    email: 'a.sachin533@gmail.com', phone: '9811785389', location: 'Gurgaon, India',
    showLocation: true, linkedin: '/in/sachin-agrawal-a832a841', showLinkedin: true, github: '', showGithub: false,
  },
  skills: ['Javascript', 'Node', 'GraphQL', 'React', 'Webpack', 'Redux', 'Preact', 'EmotionJs', 'Rollup', 'Jenkins', 'Nginx'],
  workExperience: [
    {
      id: 1, title: 'Software Development Team Lead', company: 'Housing.com',
      description: 'Leading a team of 6. Recently revamped housing.com to latest tech from ground up to clear a long pending technical debt.',
      period: 'April 2019 - Present',
      bullets: [
        'Lighthouse score improved from 55 to 89 (94 without third party scripts).',
        'Page Load times (First CPU Idle time) decreased from 5.5 to 3.6s.',
        'JS & CSS size reduced from 300 to 125KB.',
      ],
    },
    {
      id: 2, title: 'Senior SDE for PropertyForYou.com', company: 'Housing.com',
      description: "Lead a 2 member Frontend team for one of housing's project.",
      period: 'Sept 2018 - Dec 2019',
      bullets: [
        'Built on React, Redux, GraphQL with full PWA and AMP website.',
      ],
    },
  ],
  education: [],
  achievements: [],
  languages: [],
  courses: [],
  passions: [],
  certifications: [],
  mytime: [],
  jobMetaLayout: 'inline',
  skillsMode: 'chips',
  skillsRatingStyle: 'dots',
  skillRatings: {},
  languagesMode: 'rated',
  languagesRatingStyle: 'dots',
  photo: null,
  photoSide: 'right',
  photoAlign: 'center',
  sectionLayouts: {},
  sectionOrder: ['skills', 'work', 'extra'],
  extraSection: {
    title: 'PREVIOUS ORGANIZATIONS', visible: true,
    items: [
      { id: 1, title: 'SDE at Paytm (06/2017 – 12/2017)', description: "Migrated Paytm Seller's monorepo to microservices in React + Redux." },
      { id: 2, title: "SDE in Via.com's Flights Team (05/2015 – 05/2017)", description: 'Migrated Java monolith to Spring Boot + jQuery frontend. Internationalization for 8 countries.' },
    ],
  },
}

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
function E({ as: Tag = 'span', value, onChange, className = '', style, onKeyDown: extraKeyDown, inlineFmt }) {
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

function nextId(list) { return Math.max(0, ...list.map(x => x.id)) + 1 }

const normalizeContact = c => {
  const base = { showLocation: true, showLinkedin: true, showGithub: false, ...c }
  base.linkedin = normLinkedin(c?.linkedin ?? INITIAL.contact.linkedin)
  base.github = normGithub(c?.github ?? '')
  base.showGithub = c?.showGithub !== undefined ? c.showGithub : Boolean(c?.github)
  return base
}

function loadData() {
  try {
    const v3 = localStorage.getItem('resume-v3')
    if (v3) {
      const d = JSON.parse(v3)
      return {
        ...INITIAL, ...d,
        contact: normalizeContact(d.contact),
        sectionOrder: d.sectionOrder || ['skills', 'work', 'extra'],
        education: d.education || [],
        achievements: d.achievements || [],
        languages: d.languages || [],
        courses: d.courses || [],
        passions: d.passions || [],
        certifications: d.certifications || [],
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

function loadTypo() {
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

// ── Floating formatting toolbar ────────────────────────────────────────────────
const FMT_SELECTOR = '.bullet-text, .job-desc, .rh-summary, .extra-item-desc, .ach-desc'
function FormattingToolbar() {
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

// ── Typography row control ─────────────────────────────────────────────────────
function TypoRow({ label, value, onChange }) {
  return (
    <div className="tp-row">
      <div className="tp-label">{label}</div>
      <div className="tp-line1">
        <input type="number" className="tp-size" value={value.size} min={7} max={72} step={0.5}
          onChange={e => { const n = parseFloat(e.target.value); if (!isNaN(n)) onChange({ ...value, size: n }) }} />
        <span className="tp-unit">px</span>
        <button className={`tp-btn tp-bold${value.bold ? ' tp-on' : ''}`} onClick={() => onChange({ ...value, bold: !value.bold })} title="Bold">B</button>
        <button className={`tp-btn tp-ital${value.italic ? ' tp-on' : ''}`} onClick={() => onChange({ ...value, italic: !value.italic })} title="Italic">I</button>
        <input type="color" className="tp-color" value={value.color} onChange={e => onChange({ ...value, color: e.target.value })} title="Color" />
      </div>
      <div className="tp-line2">
        {[['left', <AlignLeftIcon />], ['center', <AlignCenterIcon />], ['right', <AlignRightIcon />], ['justify', <AlignJustifyIcon />]].map(([a, icon]) => (
          <button key={a} className={`tp-align${value.align === a ? ' tp-on' : ''}`} onClick={() => onChange({ ...value, align: a })} title={`Align ${a}`}>{icon}</button>
        ))}
      </div>
    </div>
  )
}

// ── Section typography panel ───────────────────────────────────────────────────
function SectionTypoPanel({ visible, onEnter, onLeave, typo, setTypoKey, rows, flipped, extraClass = '' }) {
  return (
    <div className={`stp no-print${visible ? ' stp-visible' : ''}${flipped ? ' stp-flipped' : ''}${extraClass ? ' ' + extraClass : ''}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {rows.map(([key, label]) =>
        key === 'bg' ? (
          <div key="bg" className="tp-row">
            <div className="tp-label">{label}</div>
            <div className="tp-line1">
              <input type="color" className="tp-color" style={{ marginLeft: 0 }}
                value={typo.headerBg.color} onChange={e => setTypoKey('headerBg', { color: e.target.value })} title="Background color" />
            </div>
          </div>
        ) : key === 'accent' ? (
          <div key="accent" className="tp-row">
            <div className="tp-label">{label}</div>
            <div className="tp-line1">
              <input type="color" className="tp-color" style={{ marginLeft: 0 }}
                value={typo.accentColor?.color || '#1a7a70'} onChange={e => setTypoKey('accentColor', { color: e.target.value })} title="Accent color" />
            </div>
          </div>
        ) : (
          <TypoRow key={key} label={label} value={typo[key]} onChange={val => setTypoKey(key, val)} />
        )
      )}
    </div>
  )
}

// ── Template Thumbnail ─────────────────────────────────────────────────────────
function TemplateThumbnail({ id }) {
  if (id === 'classic') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-contact-bar" />
      <div className="tt-body-single">
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line tt-short" />
        <div className="tt-gap" />
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
      </div>
    </div>
  )
  if (id === 'two-col') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-contact-bar" />
      <div className="tt-body-two">
        <div className="tt-col-main">
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
          <div className="tt-gap" />
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line tt-short" />
        </div>
        <div className="tt-col-side">
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" /><div className="tt-line tt-sb tt-short" />
          <div className="tt-gap" />
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" />
        </div>
      </div>
    </div>
  )
  if (id === 'sidebar-dark') return (
    <div className="tt-wrap tt-wrap-sdark">
      <div className="tt-sidebar-dark">
        <div className="tt-sd-name" /><div className="tt-sd-title" />
        <div className="tt-gap" />
        <div className="tt-sd-section" /><div className="tt-line tt-sd-line" /><div className="tt-line tt-sd-line tt-short" />
        <div className="tt-gap" />
        <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
      </div>
      <div className="tt-main-white">
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
        <div className="tt-gap" />
        <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line tt-short" />
      </div>
    </div>
  )
  if (id === 'three-col') return (
    <div className="tt-wrap">
      <div className="tt-dark-bar" />
      <div className="tt-contact-bar" />
      <div className="tt-body-three">
        <div className="tt-col-3left">
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
          <div className="tt-gap" />
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
        </div>
        <div className="tt-col-3main">
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
          <div className="tt-gap" />
          <div className="tt-section-block" /><div className="tt-line" />
        </div>
        <div className="tt-col-3right">
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" />
          <div className="tt-gap" />
          <div className="tt-section-block tt-sb" /><div className="tt-line tt-sb" />
        </div>
      </div>
    </div>
  )
  if (id === 'minimal') return (
    <div className="tt-wrap">
      <div className="tt-light-bar">
        <div className="tt-lh-name" /><div className="tt-lh-title" />
      </div>
      <div className="tt-contact-bar" />
      <div className="tt-body-single">
        <div className="tt-section-block tt-min" /><div className="tt-line" /><div className="tt-line tt-short" />
        <div className="tt-gap" />
        <div className="tt-section-block tt-min" /><div className="tt-line" /><div className="tt-line" />
      </div>
    </div>
  )
  if (id === 'sidebar-band') return (
    <div className="tt-wrap tt-wrap-sdark">
      <div className="tt-dark-bar" />
      <div className="tt-body-sbband">
        <div className="tt-sbband-sidebar">
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
          <div className="tt-gap" />
          <div className="tt-sd-section" /><div className="tt-line tt-sd-line" />
        </div>
        <div className="tt-sbband-main">
          <div className="tt-section-block" /><div className="tt-line" /><div className="tt-line" />
          <div className="tt-gap" />
          <div className="tt-section-block" /><div className="tt-line" />
        </div>
      </div>
      <div className="tt-sbband-footer" />
    </div>
  )
  return null
}

// ── Template Picker ────────────────────────────────────────────────────────────
function TemplatePicker({ current, onSelect, onClose }) {
  return (
    <div className="tpl-overlay no-print">
      <div className="tpl-panel">
        <div className="tpl-panel-header">
          <span>Choose Layout</span>
          <button className="tpl-close" onClick={onClose}>×</button>
        </div>
        <div className="tpl-grid">
          {TEMPLATE_DEFS.map(t => (
            <button key={t.id} className={`tpl-card${current === t.id ? ' tpl-card-active' : ''}`} onClick={() => { onSelect(t.id); onClose() }}>
              <TemplateThumbnail id={t.id} />
              <div className="tpl-card-name">{t.name}</div>
              <div className="tpl-card-desc">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section Manager ────────────────────────────────────────────────────────────
function SectionManager({ sectionOrder, columnAssignment, template, onAdd, onRemove, onMoveUp, onMoveDown, onColumnChange, onClose }) {
  const tplDef = TEMPLATE_DEFS.find(t => t.id === template) || TEMPLATE_DEFS[0]
  const isMultiCol = tplDef.columns !== 'single'
  const activeSections = sectionOrder
  const inactiveSections = Object.keys(SECTION_TYPE_DEFS).filter(id => !activeSections.includes(id))

  return (
    <div className="sm-overlay no-print">
      <div className="sm-panel">
        <div className="sm-header">
          <span>Manage Sections</span>
          <button className="sm-close" onClick={onClose}>×</button>
        </div>

        <div className="sm-body">
          <div className="sm-group-label">Active Sections</div>
          {activeSections.map((id, idx) => (
            <div key={id} className="sm-row">
              <span className="sm-row-label">{SECTION_TYPE_DEFS[id]?.label || id}</span>
              {isMultiCol && (
                tplDef.columns === 'three' ? (
                  <select className="sm-col-select" value={columnAssignment[id] || 'main'}
                    onChange={e => onColumnChange(id, e.target.value)}>
                    <option value="left">Left</option>
                    <option value="main">Center</option>
                    <option value="right">Right</option>
                  </select>
                ) : tplDef.columns === 'sidebar-band' ? (
                  <select className="sm-col-select" value={columnAssignment[id] || 'main'}
                    onChange={e => onColumnChange(id, e.target.value)}>
                    <option value="sidebar">Sidebar</option>
                    <option value="main">Main</option>
                    <option value="bottom">Footer</option>
                  </select>
                ) : (
                  <select className="sm-col-select" value={columnAssignment[id] || 'main'}
                    onChange={e => onColumnChange(id, e.target.value)}>
                    <option value="main">Main</option>
                    <option value="sidebar">Sidebar</option>
                  </select>
                )
              )}
              <button className="sm-btn-icon" disabled={idx === 0} onClick={() => onMoveUp(id)} title="Move up">↑</button>
              <button className="sm-btn-icon" disabled={idx === activeSections.length - 1} onClick={() => onMoveDown(id)} title="Move down">↓</button>
              <button className="sm-btn-remove" onClick={() => onRemove(id)} title="Remove section">×</button>
            </div>
          ))}

          {inactiveSections.length > 0 && (
            <>
              <div className="sm-group-label sm-group-label-add">Add Section</div>
              {inactiveSections.map(id => (
                <div key={id} className="sm-row sm-row-inactive">
                  <span className="sm-row-label sm-row-label-dim">{SECTION_TYPE_DEFS[id]?.label || id}</span>
                  <button className="sm-btn-add" onClick={() => onAdd(id)}>+ Add</button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(loadData)
  const [typo, setTypo] = useState(loadTypo)
  const [template, setTemplate] = useState(() => localStorage.getItem('resume-template') || 'classic')
  const [columnAssignment, setColumnAssignment] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('resume-columns') || 'null')
      if (saved) return saved
    } catch {}
    const savedTemplate = localStorage.getItem('resume-template') || 'classic'
    return getDefaultColumns(savedTemplate)
  })
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [showSectionManager, setShowSectionManager] = useState(false)
  const [sidebarSide, setSidebarSide] = useState(() => localStorage.getItem('resume-sidebar-side') || 'right')

  function getDefaultColumns(tplId) {
    const tpl = TEMPLATE_DEFS.find(t => t.id === tplId) || TEMPLATE_DEFS[0]
    const assignment = {}
    for (const id of (tpl.defaultMain || [])) assignment[id] = 'main'
    for (const id of (tpl.defaultSidebar || [])) assignment[id] = 'sidebar'
    for (const id of (tpl.defaultLeft || [])) assignment[id] = 'left'
    for (const id of (tpl.defaultRight || [])) assignment[id] = 'right'
    for (const id of (tpl.defaultBottom || [])) assignment[id] = 'bottom'
    return assignment
  }

  useEffect(() => { localStorage.setItem('resume-v3', JSON.stringify(data)) }, [data])
  useEffect(() => { localStorage.setItem('resume-typography', JSON.stringify(typo)) }, [typo])
  useEffect(() => { localStorage.setItem('resume-template', template) }, [template])
  useEffect(() => { localStorage.setItem('resume-columns', JSON.stringify(columnAssignment)) }, [columnAssignment])
  useEffect(() => { localStorage.setItem('resume-sidebar-side', sidebarSide) }, [sidebarSide])

  const handleSelectTemplate = (tplId) => {
    setTemplate(tplId)
    setColumnAssignment(getDefaultColumns(tplId))
    if (tplId === 'sidebar-dark' || tplId === 'three-col' || tplId === 'sidebar-band') {
      set(d => d.sectionOrder.includes('summary') ? d : { ...d, sectionOrder: ['summary', ...d.sectionOrder] })
    }
  }

  const leaveTimer = useRef(null)
  const [activeSection, setActiveSection] = useState(null)
  const activate = id => { clearTimeout(leaveTimer.current); setActiveSection(id) }
  const deactivate = () => { clearTimeout(leaveTimer.current); leaveTimer.current = setTimeout(() => setActiveSection(null), 300) }

  const set = useCallback(fn => setData(prev => fn(prev)), [])
  const setTypoKey = (key, val) => setTypo(t => ({ ...t, [key]: val }))
  const ts = key => {
    const t = typo[key]
    if (!t || typeof t.size === 'undefined') return {}
    return { fontSize: `${t.size}px`, fontWeight: t.bold ? 700 : 400, fontStyle: t.italic ? 'italic' : 'normal', textAlign: t.align, color: t.color }
  }

  const setField = (f, v) => set(d => ({ ...d, [f]: v }))
  const setContact = (f, v) => set(d => ({ ...d, contact: { ...d.contact, [f]: v } }))

  const setSkill = (i, v) => set(d => { const s = [...d.skills]; s[i] = v; return { ...d, skills: s } })
  const removeSkill = i => set(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }))
  const addSkill = () => set(d => ({ ...d, skills: [...d.skills, 'New Skill'] }))

  const setJob = (id, f, v) => set(d => ({ ...d, workExperience: d.workExperience.map(j => j.id === id ? { ...j, [f]: v } : j) }))
  const setBullet = (jid, bi, v) => set(d => ({
    ...d, workExperience: d.workExperience.map(j => {
      if (j.id !== jid) return j
      const b = [...j.bullets]; b[bi] = v; return { ...j, bullets: b }
    }),
  }))
  const addBullet = (jid, after) => set(d => ({
    ...d, workExperience: d.workExperience.map(j => {
      if (j.id !== jid) return j
      const b = [...j.bullets]; b.splice(after + 1, 0, ''); return { ...j, bullets: b }
    }),
  }))
  const removeBullet = (jid, bi) => set(d => ({
    ...d, workExperience: d.workExperience.map(j => j.id !== jid ? j : { ...j, bullets: j.bullets.filter((_, i) => i !== bi) }),
  }))
  const addJob = () => set(d => ({
    ...d, workExperience: [...d.workExperience, { id: nextId(d.workExperience), title: 'Job Title', company: 'Company', description: 'Role description', period: 'Start – End', bullets: [''] }],
  }))
  const removeJob = id => set(d => ({ ...d, workExperience: d.workExperience.filter(j => j.id !== id) }))
  const setJobHidden = (id, field, isHidden) => set(d => ({
    ...d, workExperience: d.workExperience.map(j => j.id !== id ? j : { ...j, hidden: { ...j.hidden, [field]: isHidden } }),
  }))

  // Education handlers
  const setEdu = (id, f, v) => set(d => ({ ...d, education: d.education.map(e => e.id === id ? { ...e, [f]: v } : e) }))
  const addEdu = () => set(d => ({
    ...d, education: [...(d.education || []), { id: nextId(d.education || []), degree: 'Degree / Certification', institution: 'Institution', period: 'Year', location: '' }],
  }))
  const removeEdu = id => set(d => ({ ...d, education: d.education.filter(e => e.id !== id) }))

  // Photo handlers
  const setPhoto = v => set(d => ({ ...d, photo: v }))
  const setPhotoSide = v => set(d => ({ ...d, photoSide: v }))

  // Achievements handlers
  const setAch = (id, f, v) => set(d => ({ ...d, achievements: d.achievements.map(a => a.id === id ? { ...a, [f]: v } : a) }))
  const addAch = () => set(d => ({
    ...d, achievements: [...(d.achievements || []), { id: nextId(d.achievements || []), title: 'Achievement Title', description: 'Description of the achievement' }],
  }))
  const removeAch = id => set(d => ({ ...d, achievements: d.achievements.filter(a => a.id !== id) }))

  // Languages handlers
  const setLang = (id, f, v) => set(d => ({ ...d, languages: d.languages.map(l => l.id === id ? { ...l, [f]: v } : l) }))
  const addLang = () => set(d => ({ ...d, languages: [...(d.languages||[]), { id: nextId(d.languages||[]), name: 'Language', level: 'Native', rating: 5 }] }))
  const removeLang = id => set(d => ({ ...d, languages: d.languages.filter(l => l.id !== id) }))

  // Courses handlers
  const setCourse = (id, f, v) => set(d => ({ ...d, courses: d.courses.map(c => c.id === id ? { ...c, [f]: v } : c) }))
  const addCourse = () => set(d => ({ ...d, courses: [...(d.courses||[]), { id: nextId(d.courses||[]), title: 'Course Title', provider: 'Provider', year: '', description: '' }] }))
  const removeCourse = id => set(d => ({ ...d, courses: d.courses.filter(c => c.id !== id) }))

  // Passions handlers
  const setPassion = (id, f, v) => set(d => ({ ...d, passions: d.passions.map(p => p.id === id ? { ...p, [f]: v } : p) }))
  const addPassion = () => set(d => ({ ...d, passions: [...(d.passions||[]), { id: nextId(d.passions||[]), icon: 'star', title: 'Passion', description: 'Description' }] }))
  const removePassion = id => set(d => ({ ...d, passions: d.passions.filter(p => p.id !== id) }))

  // Certifications handlers
  const setCert = (id, f, v) => set(d => ({ ...d, certifications: d.certifications.map(c => c.id === id ? { ...c, [f]: v } : c) }))
  const addCert = () => set(d => ({ ...d, certifications: [...(d.certifications||[]), { id: nextId(d.certifications||[]), title: 'Certification', issuer: 'Issuer', date: '' }] }))
  const removeCert = id => set(d => ({ ...d, certifications: d.certifications.filter(c => c.id !== id) }))

  // My Time handlers
  const setMyTime = (id, f, v) => set(d => ({ ...d, mytime: d.mytime.map(m => m.id === id ? { ...m, [f]: v } : m) }))
  const addMyTime = () => set(d => ({ ...d, mytime: [...(d.mytime||[]), { id: nextId(d.mytime||[]), label: 'Activity', value: 1 }] }))
  const removeMyTime = id => set(d => ({ ...d, mytime: d.mytime.filter(m => m.id !== id) }))

  // Skills mode / ratings
  const toggleSkillsMode = () => set(d => ({ ...d, skillsMode: d.skillsMode === 'chips' ? 'rated' : 'chips' }))
  const setSkillRating = (name, v) => set(d => ({ ...d, skillRatings: { ...d.skillRatings, [name]: v } }))

  // Section order management
  const moveSect = (id, dir) => set(d => {
    const order = [...(d.sectionOrder || ['skills', 'work', 'extra'])]
    const i = order.indexOf(id), j = i + dir
    if (j < 0 || j >= order.length) return d
    ;[order[i], order[j]] = [order[j], order[i]]
    return { ...d, sectionOrder: order }
  })

  const addSection = (id) => {
    set(d => {
      if (d.sectionOrder.includes(id)) return d
      const newOrder = [...d.sectionOrder, id]
      // auto-populate education/achievements with one item if empty
      if (id === 'education' && (!d.education || !d.education.length)) {
        return { ...d, sectionOrder: newOrder, education: [{ id: 1, degree: 'Degree / Certification', institution: 'Institution', period: 'Year', location: '' }] }
      }
      if (id === 'achievements' && (!d.achievements || !d.achievements.length)) {
        return { ...d, sectionOrder: newOrder, achievements: [{ id: 1, title: 'Achievement Title', description: 'Description' }] }
      }
      if (id === 'extra') return { ...d, sectionOrder: newOrder, extraSection: { ...d.extraSection, visible: true } }
      if (id === 'languages' && !d.languages?.length) return { ...d, sectionOrder: newOrder, languages: [{ id: 1, name: 'English', level: 'Native', rating: 5 }] }
      if (id === 'courses' && !d.courses?.length) return { ...d, sectionOrder: newOrder, courses: [{ id: 1, title: 'Course Title', provider: 'Provider', description: '' }] }
      if (id === 'passions' && !d.passions?.length) return { ...d, sectionOrder: newOrder, passions: [{ id: 1, icon: 'star', title: 'Passion', description: 'Short description' }] }
      if (id === 'certifications' && !d.certifications?.length) return { ...d, sectionOrder: newOrder, certifications: [{ id: 1, title: 'Certification', issuer: 'Issuer', date: '' }] }
      if (id === 'mytime' && !d.mytime?.length) return { ...d, sectionOrder: newOrder, mytime: [{ id: 1, label: 'Activity A', value: 3 }, { id: 2, label: 'Activity B', value: 2 }, { id: 3, label: 'Activity C', value: 1 }] }
      return { ...d, sectionOrder: newOrder }
    })
    const tpl = TEMPLATE_DEFS.find(t => t.id === template)
    if (tpl && tpl.columns !== 'single') {
      setColumnAssignment(prev => {
        if (id in prev) return prev
        const col = tpl.defaultSidebar.includes(id) ? 'sidebar' : 'main'
        return { ...prev, [id]: col }
      })
    }
  }

  const removeSection = (id) => {
    set(d => ({
      ...d,
      sectionOrder: d.sectionOrder.filter(s => s !== id),
      extraSection: id === 'extra' ? { ...d.extraSection, visible: false } : d.extraSection,
    }))
  }

  const [dragSk, setDragSk] = useState(null)
  const [dragSkOver, setDragSkOver] = useState(null)
  const [dragBu, setDragBu] = useState(null)
  const [dragBuOver, setDragBuOver] = useState(null)

  const reorderSkill = (from, to) => set(d => { const s = [...d.skills]; s.splice(to, 0, s.splice(from, 1)[0]); return { ...d, skills: s } })
  const reorderBullet = (jobId, from, to) => set(d => ({
    ...d, workExperience: d.workExperience.map(j => {
      if (j.id !== jobId) return j
      const b = [...j.bullets]; b.splice(to, 0, b.splice(from, 1)[0]); return { ...j, bullets: b }
    }),
  }))

  const setExtra = (f, v) => set(d => ({ ...d, extraSection: { ...d.extraSection, [f]: v } }))
  const setExtraItem = (id, f, v) => set(d => ({
    ...d, extraSection: { ...d.extraSection, items: d.extraSection.items.map(o => o.id === id ? { ...o, [f]: v } : o) },
  }))
  const addExtraItem = () => set(d => ({
    ...d, extraSection: { ...d.extraSection, items: [...d.extraSection.items, { id: nextId(d.extraSection.items), title: 'Title', description: 'Description' }] },
  }))
  const removeExtraItem = id => set(d => ({
    ...d, extraSection: { ...d.extraSection, items: d.extraSection.items.filter(o => o.id !== id) },
  }))

  const [allSaves, setAllSaves] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resume-saves') || '{}') } catch { return {} }
  })
  const [activeSave, setActiveSave] = useState(() => localStorage.getItem('resume-active') || '')

  const saveAs = () => {
    const name = prompt('Save resume as:', activeSave || '')?.trim()
    if (!name) return
    const saves = { ...allSaves, [name]: { data, typo, template, columnAssignment } }
    localStorage.setItem('resume-saves', JSON.stringify(saves))
    setAllSaves(saves); setActiveSave(name); localStorage.setItem('resume-active', name)
  }
  const loadSave = name => {
    const saved = allSaves[name]; if (!saved) return
    if (confirm(`Switch to "${name}"?`)) {
      const d = saved.data || saved
      const t = saved.typo || null
      setData({ ...INITIAL, ...d, contact: normalizeContact(d.contact), sectionOrder: d.sectionOrder || ['skills', 'work', 'extra'], education: d.education || [], achievements: d.achievements || [] })
      if (t) setTypo({ ...DEFAULT_TYPO, ...t })
      if (saved.template) setTemplate(saved.template)
      if (saved.columnAssignment) setColumnAssignment(saved.columnAssignment)
      setActiveSave(name); localStorage.setItem('resume-active', name)
    }
  }
  const deleteSave = name => {
    if (!confirm(`Delete saved resume "${name}"?`)) return
    const saves = { ...allSaves }; delete saves[name]
    localStorage.setItem('resume-saves', JSON.stringify(saves)); setAllSaves(saves)
    if (activeSave === name) { setActiveSave(''); localStorage.removeItem('resume-active') }
  }

  const tplDef = TEMPLATE_DEFS.find(t => t.id === template) || TEMPLATE_DEFS[0]
  const isMultiCol = tplDef.columns !== 'single'
  const isSidebarDark = tplDef.columns === 'sidebar-left'
  const isThreeCol = tplDef.columns === 'three'
  const isSidebarBand = tplDef.columns === 'sidebar-band'
  const isMinimal = tplDef.headerStyle === 'light'
  const accentColor = typo.accentColor?.color || '#1a7a70'

  const sectionOrder = data.sectionOrder || ['skills', 'work', 'extra']
  const mainSections = isMultiCol
    ? sectionOrder.filter(id => (columnAssignment[id] || 'main') === 'main')
    : sectionOrder
  const sidebarSections = (isMultiCol && !isThreeCol)
    ? sectionOrder.filter(id => (columnAssignment[id] || 'main') === 'sidebar')
    : []
  const leftSections = isThreeCol
    ? sectionOrder.filter(id => (columnAssignment[id] || 'left') === 'left')
    : []
  const rightSections = isThreeCol
    ? sectionOrder.filter(id => (columnAssignment[id] || 'right') === 'right')
    : []
  const bottomSections = isSidebarBand
    ? sectionOrder.filter(id => columnAssignment[id] === 'bottom')
    : []

  const es = data.extraSection
  const esCount = es.items.length

  const stp = (id, rows, flipped = false) => ({
    visible: activeSection === id,
    onEnter: () => activate(id),
    onLeave: deactivate,
    typo, setTypoKey, rows, flipped,
  })

  // ── Section renderer ─────────────────────────────────────────────────────────
  const renderSection = (id, sectionsInColumn, idx, layoutMode = 'compact') => {
    const isInSidebar = isMultiCol && (columnAssignment[id] || 'main') === 'sidebar'
    const moveUp = () => {
      const i = sectionOrder.indexOf(id)
      const colIds = sectionOrder.filter(s => (columnAssignment[s] || 'main') === (columnAssignment[id] || 'main'))
      const colIdx = colIds.indexOf(id)
      if (colIdx <= 0) return
      const targetId = colIds[colIdx - 1]
      set(d => {
        const order = [...d.sectionOrder]
        const a = order.indexOf(id), b = order.indexOf(targetId)
        ;[order[a], order[b]] = [order[b], order[a]]
        return { ...d, sectionOrder: order }
      })
    }
    const moveDown = () => {
      const colIds = sectionOrder.filter(s => (columnAssignment[s] || 'main') === (columnAssignment[id] || 'main'))
      const colIdx = colIds.indexOf(id)
      if (colIdx >= colIds.length - 1) return
      const targetId = colIds[colIdx + 1]
      set(d => {
        const order = [...d.sectionOrder]
        const a = order.indexOf(id), b = order.indexOf(targetId)
        ;[order[a], order[b]] = [order[b], order[a]]
        return { ...d, sectionOrder: order }
      })
    }
    const colIds = sectionOrder.filter(s => (columnAssignment[s] || 'main') === (columnAssignment[id] || 'main'))
    const colIdx = colIds.indexOf(id)

    // Per-section layout override
    const LAYOUT_SECTIONS = new Set(['education','achievements','languages','courses','passions','certifications','mytime','extra','skills'])
    const layoutOverride = data.sectionLayouts?.[id]
    const effectiveLayout = layoutMode === 'compact' ? 'compact' : (layoutOverride ?? layoutMode)
    const setLayoutOverride = v => set(d => {
      const sl = { ...(d.sectionLayouts || {}) }
      if (v == null) { delete sl[id] } else { sl[id] = v }
      return { ...d, sectionLayouts: sl }
    })

    const showLayoutBtns = LAYOUT_SECTIONS.has(id) && layoutMode !== 'compact' &&
      (id !== 'skills' || data.skillsMode === 'rated')
    const layoutBtns = showLayoutBtns ? (
      <div className="sa-layout-group">
        <button className={`sa-layout-btn${layoutOverride === 'compact' ? ' active' : ''}`}
          onClick={() => setLayoutOverride(layoutOverride === 'compact' ? null : 'compact')} title="Single column">▤</button>
        <button className={`sa-layout-btn${layoutOverride === 'wide' ? ' active' : ''}`}
          onClick={() => setLayoutOverride(layoutOverride === 'wide' ? null : 'wide')} title="Two columns">⊞</button>
      </div>
    ) : null

    const sectionCtrl = (extra = null, noRemove = false) => (
      <div className="section-actions no-print">
        <button className="btn-move" disabled={colIdx === 0} onClick={moveUp} title="Move up">↑</button>
        <button className="btn-move" disabled={colIdx === colIds.length - 1} onClick={moveDown} title="Move down">↓</button>
        {extra}
        {layoutBtns}
        {!noRemove && <button className="sa-remove" onClick={() => removeSection(id)} title="Remove section">×</button>}
      </div>
    )

    if (id === 'summary') return (
      <section key="summary" className="section section-wrap"
        onMouseEnter={() => activate('summary')} onMouseLeave={deactivate}
        onFocus={() => activate('summary')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('summary', [['sectionTitle', 'Section Title'], ['summary', 'Summary']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          {sectionCtrl()}
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>SUMMARY</h2>
        </div>
        <E as="div" className="summary-section-text" value={data.summary} onChange={v => setField('summary', v)}
          style={{ fontSize: '11.5px', lineHeight: 1.5, color: '#444', textAlign: 'justify' }} inlineFmt />
      </section>
    )

    if (id === 'skills') return (
      <section key="skills" className="section section-wrap"
        onMouseEnter={() => activate('skills')} onMouseLeave={deactivate}
        onFocus={() => activate('skills')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('skills', [['sectionTitle', 'Section Title'], ['skills', 'Skills']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          {sectionCtrl(<>
            <button className="sa-mode" onClick={toggleSkillsMode} title={data.skillsMode === 'rated' ? 'Switch to chips' : 'Switch to rated'}>{data.skillsMode === 'rated' ? '◻' : '★'}</button>
            {data.skillsMode === 'rated' && <>
              <button className="sa-mode" onClick={() => set(d => ({...d, skillsRatingStyle: d.skillsRatingStyle === 'stars' ? 'dots' : 'stars'}))} title={data.skillsRatingStyle === 'stars' ? 'Switch to dots' : 'Switch to stars'}>{data.skillsRatingStyle === 'stars' ? '●' : '★'}</button>
              <label className="sa-color-btn no-print" style={{ background: data.skillsRatingColor || accentColor }} title="Rating color">
                <input type="color" value={data.skillsRatingColor || accentColor} onChange={e => set(d => ({...d, skillsRatingColor: e.target.value}))} />
              </label>
            </>}
          </>)}
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>SKILLS</h2>
        </div>
        {data.skillsMode === 'rated' ? (
          <div className={`skills-rated${effectiveLayout === 'wide' ? ' sec-2col' : ''}`}>
            {data.skills.map((skill, i) => (
              <div key={i} className="skills-rated-row">
                <span className="bu-handle no-print" draggable
                  onDragStart={e => { e.stopPropagation(); setDragSk(i) }}
                  onDragEnd={() => { setDragSk(null); setDragSkOver(null) }}>⠿</span>
                <E as="span" className="skill-rated-name" value={skill} onChange={v => setSkill(i, v)} style={{ fontSize: '12px', flex: 1 }} />
                <RatingDots value={data.skillRatings?.[skill] || 0} max={5} color={data.skillsRatingColor || accentColor} onChange={v => setSkillRating(skill, v)} ratingStyle={data.skillsRatingStyle || 'dots'} />
                <button className="skill-remove no-print" style={{ color: '#ccc', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }} onClick={() => removeSkill(i)}>×</button>
              </div>
            ))}
            <button className="btn-add-skill no-print" onClick={addSkill}>+ Add</button>
          </div>
        ) : (
          <div className="skills-row">
            {data.skills.map((skill, i) => (
              <span key={i}
                className={`skill-tag${dragSk === i ? ' sk-drag' : ''}${dragSkOver === i && dragSk !== i ? ' sk-over' : ''}`}
                style={{ background: typo.headerBg.color }}
                onDragOver={e => { e.preventDefault(); setDragSkOver(i) }}
                onDragLeave={() => setDragSkOver(null)}
                onDrop={e => { e.preventDefault(); if (dragSk !== null && dragSk !== i) reorderSkill(dragSk, i); setDragSk(null); setDragSkOver(null) }}
              >
                <span className="sk-handle no-print" draggable onDragStart={e => { e.stopPropagation(); setDragSk(i) }} onDragEnd={() => { setDragSk(null); setDragSkOver(null) }}>⠿</span>
                <E value={skill} onChange={v => setSkill(i, v)} style={{ minWidth: 18, fontSize: ts('skills').fontSize, fontWeight: ts('skills').fontWeight, fontStyle: ts('skills').fontStyle, color: ts('skills').color }} />
                <button className="skill-remove no-print" onClick={() => removeSkill(i)}>×</button>
              </span>
            ))}
            <button className="btn-add-skill no-print" onClick={addSkill}>+ Add</button>
          </div>
        )}
      </section>
    )

    if (id === 'work') return (
      <section key="work" className="section section-wrap"
        onMouseEnter={() => activate('work')} onMouseLeave={deactivate}
        onFocus={() => activate('work')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('work', [
          ['sectionTitle', 'Section Title'], ['jobTitle', 'Job Title'],
          ['jobCompany', 'Company'], ['jobPeriod', 'Period'],
          ['jobDesc', 'Desc'], ['bulletText', 'Bullet'],
        ], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          {sectionCtrl(
            <div className="sa-layout-group">
              <button className={`sa-layout-btn${(data.jobMetaLayout || 'inline') === 'inline' ? ' active' : ''}`}
                onClick={() => set(d => ({...d, jobMetaLayout: 'inline'}))} title="Company & date on same line as title">—</button>
              <button className={`sa-layout-btn${data.jobMetaLayout === 'below' ? ' active' : ''}`}
                onClick={() => set(d => ({...d, jobMetaLayout: 'below'}))} title="Company & date below title">↓</button>
            </div>,
            true
          )}
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>WORK EXPERIENCE</h2>
        </div>
        {data.workExperience.map(job => {
          const metaBelow = data.jobMetaLayout === 'below'
          const jobMeta = (
            <div className={metaBelow ? 'job-meta job-meta-below' : 'job-meta'}>
              {!job.hidden?.company ? (
                <span className="job-meta-item">
                  <E as="span" className="job-company-inline" value={job.company} onChange={v => setJob(job.id, 'company', v)} style={ts('jobCompany')} />
                  <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'company', true)}>×</button>
                </span>
              ) : <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'company', false)}>+co</button>}
              {!job.hidden?.company && !job.hidden?.period && <span className="meta-sep">·</span>}
              {!job.hidden?.period ? (
                <span className="job-meta-item">
                  <E as="span" className="job-period-inline" value={job.period} onChange={v => setJob(job.id, 'period', v)} style={ts('jobPeriod')} />
                  <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'period', true)}>×</button>
                </span>
              ) : <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'period', false)}>+date</button>}
            </div>
          )
          return (
          <div key={job.id} className="job-entry">
            <div className="job-header-row">
              <E as="div" className="job-title" value={job.title} onChange={v => setJob(job.id, 'title', v)} style={{ ...ts('jobTitle'), color: accentColor }} />
              {!metaBelow && jobMeta}
              <button className="btn-remove-job no-print" onClick={() => removeJob(job.id)}>✕</button>
            </div>
            {metaBelow && jobMeta}
            {!job.hidden?.description ? (
              <div className="opt-row">
                <E as="div" className="job-desc" value={job.description} onChange={v => setJob(job.id, 'description', v)} style={ts('jobDesc')} inlineFmt />
                <button className="btn-field-rm no-print" onClick={() => setJobHidden(job.id, 'description', true)}>×</button>
              </div>
            ) : <button className="btn-field-add no-print" onClick={() => setJobHidden(job.id, 'description', false)}>+ description</button>}
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
        )})}
        <button className="btn-add-section no-print" onClick={addJob}>+ Add Work Experience</button>
      </section>
    )

    if (id === 'education') return (
      <section key="education" className="section section-wrap"
        onMouseEnter={() => activate('education')} onMouseLeave={deactivate}
        onFocus={() => activate('education')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('education', [
          ['sectionTitle', 'Section Title'], ['eduDegree', 'Degree'],
          ['eduInst', 'Institution'], ['eduPeriod', 'Period'],
        ], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>EDUCATION</h2>
          {sectionCtrl()}
        </div>
        <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
          {(data.education || []).map(edu => (
            <div key={edu.id} className="edu-entry">
              <div className="edu-header-row">
                <E as="div" className="edu-degree" value={edu.degree} onChange={v => setEdu(edu.id, 'degree', v)} style={{ ...ts('eduDegree'), color: accentColor }} />
                <button className="btn-remove-job no-print" onClick={() => removeEdu(edu.id)}>✕</button>
              </div>
              <div className="edu-meta-row">
                <E as="span" className="edu-inst" value={edu.institution} onChange={v => setEdu(edu.id, 'institution', v)} style={ts('eduInst')} />
                {edu.period && <span className="meta-sep">·</span>}
                <E as="span" className="edu-period" value={edu.period} onChange={v => setEdu(edu.id, 'period', v)} style={ts('eduPeriod')} />
                {edu.location && <span className="meta-sep">·</span>}
                <E as="span" className="edu-location" value={edu.location} onChange={v => setEdu(edu.id, 'location', v)} style={ts('eduPeriod')} />
              </div>
            </div>
          ))}
        </div>
        <button className="btn-add-section no-print" onClick={addEdu}>+ Add Education</button>
      </section>
    )

    if (id === 'achievements') return (
      <section key="achievements" className="section section-wrap"
        onMouseEnter={() => activate('achievements')} onMouseLeave={deactivate}
        onFocus={() => activate('achievements')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('achievements', [
          ['sectionTitle', 'Section Title'], ['achTitle', 'Title'], ['achDesc', 'Description'],
        ], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>KEY ACHIEVEMENTS</h2>
          {sectionCtrl()}
        </div>
        <div className={`ach-list${effectiveLayout === 'wide' ? ' sec-2col' : ''}`}>
          {(data.achievements || []).map(ach => (
            <div key={ach.id} className="ach-item">
              <div className="ach-header-row">
                <E as="div" className="ach-title" value={ach.title} onChange={v => setAch(ach.id, 'title', v)} style={ts('achTitle')} />
                <button className="btn-remove-job no-print" onClick={() => removeAch(ach.id)}>✕</button>
              </div>
              <E as="div" className="ach-desc" value={ach.description} onChange={v => setAch(ach.id, 'description', v)} style={ts('achDesc')} inlineFmt />
            </div>
          ))}
        </div>
        <button className="btn-add-section no-print" onClick={addAch}>+ Add Achievement</button>
      </section>
    )

    if (id === 'languages') return (
      <section key="languages" className="section section-wrap"
        onMouseEnter={() => activate('languages')} onMouseLeave={deactivate}
        onFocus={() => activate('languages')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('languages', [['sectionTitle', 'Section Title']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          {sectionCtrl(<>
            <button className="sa-mode" onClick={() => set(d => ({...d, languagesMode: d.languagesMode === 'chips' ? 'rated' : 'chips'}))} title={data.languagesMode === 'rated' ? 'Switch to chips' : 'Switch to rated'}>{data.languagesMode === 'rated' ? '◻' : '★'}</button>
            {data.languagesMode === 'rated' && <>
              <button className="sa-mode" onClick={() => set(d => ({...d, languagesRatingStyle: d.languagesRatingStyle === 'stars' ? 'dots' : 'stars'}))} title={data.languagesRatingStyle === 'stars' ? 'Switch to dots' : 'Switch to stars'}>{data.languagesRatingStyle === 'stars' ? '●' : '★'}</button>
              <label className="sa-color-btn no-print" style={{ background: data.languagesRatingColor || accentColor }} title="Rating color">
                <input type="color" value={data.languagesRatingColor || accentColor} onChange={e => set(d => ({...d, languagesRatingColor: e.target.value}))} />
              </label>
            </>}
          </>)}
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>LANGUAGES</h2>
        </div>
        {data.languagesMode === 'chips' ? (
          <div className="skills-row">
            {(data.languages||[]).map(lang => (
              <span key={lang.id} className="skill-tag" style={{ background: typo.headerBg.color }}>
                <E value={lang.name} onChange={v => setLang(lang.id, 'name', v)} style={{ fontSize: ts('skills').fontSize, fontWeight: ts('skills').fontWeight, color: ts('skills').color }} />
                {lang.level && <span className="lang-chip-level"> · {lang.level}</span>}
                <button className="skill-remove no-print" onClick={() => removeLang(lang.id)}>×</button>
              </span>
            ))}
          </div>
        ) : (
          <div className={effectiveLayout !== 'compact' ? 'sec-2col' : ''}>
            {(data.languages||[]).map(lang => (
              <div key={lang.id} className="lang-row">
                <E as="span" className="lang-name" value={lang.name} onChange={v => setLang(lang.id, 'name', v)} style={{ fontSize: '12px', fontWeight: 500 }} />
                <E as="span" className="lang-level" value={lang.level} onChange={v => setLang(lang.id, 'level', v)} style={{ fontSize: '10.5px', color: '#888' }} />
                <RatingDots value={lang.rating || 0} max={5} color={data.languagesRatingColor || accentColor} onChange={v => setLang(lang.id, 'rating', v)} ratingStyle={data.languagesRatingStyle || 'dots'} />
                <button className="btn-remove-job no-print" onClick={() => removeLang(lang.id)}>✕</button>
              </div>
            ))}
          </div>
        )}
        <button className="btn-add-section no-print" onClick={addLang}>+ Add Language</button>
      </section>
    )

    if (id === 'courses') return (
      <section key="courses" className="section section-wrap"
        onMouseEnter={() => activate('courses')} onMouseLeave={deactivate}
        onFocus={() => activate('courses')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('courses', [['sectionTitle', 'Section Title']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>COURSES</h2>
          {sectionCtrl()}
        </div>
        <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
          {(data.courses||[]).map(c => (
            <div key={c.id} className="course-entry">
              <div className="course-header-row">
                <E as="div" className="course-title" value={c.title} onChange={v => setCourse(c.id, 'title', v)} style={{ color: accentColor, fontWeight: 600, fontSize: '12.5px' }} />
                <button className="btn-remove-job no-print" onClick={() => removeCourse(c.id)}>✕</button>
              </div>
              <div className="edu-meta-row">
                <E as="span" className="course-provider" value={c.provider} onChange={v => setCourse(c.id, 'provider', v)} />
                {c.provider && <span className="meta-sep">·</span>}
                <E as="span" className="edu-period" value={c.year || ''} onChange={v => setCourse(c.id, 'year', v)} />
              </div>
              {c.description && <E as="div" className="course-desc" value={c.description} onChange={v => setCourse(c.id, 'description', v)} inlineFmt />}
            </div>
          ))}
        </div>
        <button className="btn-add-section no-print" onClick={addCourse}>+ Add Course</button>
      </section>
    )

    if (id === 'passions') return (
      <section key="passions" className="section section-wrap"
        onMouseEnter={() => activate('passions')} onMouseLeave={deactivate}
        onFocus={() => activate('passions')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('passions', [['sectionTitle', 'Section Title']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>PASSIONS & INTERESTS</h2>
          {sectionCtrl()}
        </div>
        <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
        {(data.passions||[]).map(p => (
          <div key={p.id} className="passion-item">
            <div className="passion-icon-wrap" style={{ background: p.iconBg || accentColor }}>
              {p.icon ? SECTION_ICON_MAP[p.icon] : null}
              <input type="color" className="passion-icon-color no-print"
                value={p.iconBg || accentColor}
                onChange={e => setPassion(p.id, 'iconBg', e.target.value)}
                title="Change icon color" />
            </div>
            <div className="passion-text">
              <div className="passion-header-row">
                <E as="span" className="passion-title" value={p.title} onChange={v => setPassion(p.id, 'title', v)} style={{ fontSize: '12.5px', fontWeight: 600 }} />
                <IconPicker value={p.icon} onChange={v => setPassion(p.id, 'icon', v)} />
                <button className="btn-remove-job no-print" onClick={() => removePassion(p.id)}>✕</button>
              </div>
              <E as="div" className="passion-desc" value={p.description} onChange={v => setPassion(p.id, 'description', v)} style={{ fontSize: '11px', color: '#555' }} inlineFmt />
            </div>
          </div>
        ))}
        </div>
        <button className="btn-add-section no-print" onClick={addPassion}>+ Add Passion</button>
      </section>
    )

    if (id === 'certifications') return (
      <section key="certifications" className="section section-wrap"
        onMouseEnter={() => activate('certifications')} onMouseLeave={deactivate}
        onFocus={() => activate('certifications')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('certifications', [['sectionTitle', 'Section Title']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>CERTIFICATIONS</h2>
          {sectionCtrl()}
        </div>
        <div className={effectiveLayout === 'wide' ? 'sec-2col' : ''}>
          {(data.certifications||[]).map(c => (
            <div key={c.id} className="cert-entry">
              <div className="cert-header-row">
                <E as="div" className="cert-title" value={c.title} onChange={v => setCert(c.id, 'title', v)} style={{ color: accentColor, fontWeight: 600, fontSize: '12.5px' }} />
                <button className="btn-remove-job no-print" onClick={() => removeCert(c.id)}>✕</button>
              </div>
              <div className="edu-meta-row">
                <E as="span" className="cert-issuer" value={c.issuer} onChange={v => setCert(c.id, 'issuer', v)} style={{ fontSize: '11px', color: '#666' }} />
                {c.issuer && <span className="meta-sep">·</span>}
                <E as="span" className="edu-period" value={c.date || ''} onChange={v => setCert(c.id, 'date', v)} />
              </div>
            </div>
          ))}
        </div>
        <button className="btn-add-section no-print" onClick={addCert}>+ Add Certification</button>
      </section>
    )

    if (id === 'mytime') return (
      <section key="mytime" className="section section-wrap"
        onMouseEnter={() => activate('mytime')} onMouseLeave={deactivate}
        onFocus={() => activate('mytime')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('mytime', [['sectionTitle', 'Section Title']], isInSidebar)} />
        <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <h2 className="section-title st-inline" style={ts('sectionTitle')}>MY TIME</h2>
          {sectionCtrl()}
        </div>
        <div className={effectiveLayout !== 'compact' ? 'mytime-flow' : ''}>
          <DonutChart items={data.mytime || []} />
          <div className="mytime-legend">
            {(data.mytime||[]).map((m, i) => (
              <div key={m.id} className="donut-legend-row">
                <span className="donut-legend-dot" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}>{String.fromCharCode(65 + i)}</span>
                <E as="span" className="donut-legend-text" value={m.label} onChange={v => setMyTime(m.id, 'label', v)} />
                <input type="number" min="1" max="99" value={m.value}
                  onChange={e => setMyTime(m.id, 'value', Math.max(1, parseInt(e.target.value)||1))}
                  className="mytime-val-input no-print" />
                <button className="btn-remove-job no-print" onClick={() => removeMyTime(m.id)}>✕</button>
              </div>
            ))}
            <button className="btn-add-section no-print" onClick={addMyTime}>+ Add Item</button>
          </div>
        </div>
      </section>
    )

    if (id === 'extra') return es.visible ? (
      <section key="extra" className="section section-wrap"
        onMouseEnter={() => activate('extra')} onMouseLeave={deactivate}
        onFocus={() => activate('extra')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('extra', [
          ['sectionTitle', 'Section Title'], ['extraTitle', 'Item Title'], ['extraDesc', 'Item Desc'],
        ], isInSidebar)} />
        <div className="extra-title-row" style={{ borderBottomColor: typo.sectionTitle.color }}>
          <E as="h2" className="section-title extra-section-title" value={es.title} onChange={v => setExtra('title', v)} style={ts('sectionTitle')} />
          {sectionCtrl()}
        </div>
        <div className={`extra-grid${(esCount === 1 || effectiveLayout === 'compact') ? ' extra-grid-single' : ''}`}>
          {es.items.map(item => (
            <div key={item.id} className="extra-item">
              <div className="extra-item-row">
                <E as="div" className="extra-item-title" value={item.title} onChange={v => setExtraItem(item.id, 'title', v)} style={ts('extraTitle')} />
                <button className="btn-remove-job no-print" onClick={() => removeExtraItem(item.id)}>✕</button>
              </div>
              <E as="div" className="extra-item-desc" value={item.description} onChange={v => setExtraItem(item.id, 'description', v)} style={ts('extraDesc')} inlineFmt />
            </div>
          ))}
        </div>
        <button className="btn-add-section no-print" onClick={addExtraItem}>+ Add Item</button>
      </section>
    ) : null

    return null
  }

  // ── Contact bar (shared between layouts) ─────────────────────────────────────
  const renderContact = (vertical = false, isDark = false, extraStyle = {}) => (
    <div className={`contact-bar${vertical ? ' contact-bar-v' : ''}${isDark ? ' contact-bar-dark' : ''}`}
      style={{ fontSize: ts('contact').fontSize, color: isDark ? 'rgba(255,255,255,0.75)' : ts('contact').color, ...extraStyle }}
      onMouseEnter={() => activate('contact')} onMouseLeave={deactivate}
      onFocus={() => activate('contact')} onBlur={deactivate}
    >
      <SectionTypoPanel {...stp('contact', [['contact', 'Contact']])} extraClass={vertical ? 'stp-below' : ''} />
      <span className={`contact-item${vertical ? ' contact-item-v' : ''}`}>
        <span className="ci-icon"><IconMail/></span>
        <E value={data.contact.email} onChange={v => setContact('email', v)} />
      </span>
      <span className={`contact-item${vertical ? ' contact-item-v' : ''}`}>
        <span className="ci-icon"><IconPhone/></span>
        <E value={data.contact.phone} onChange={v => setContact('phone', v)} />
      </span>
      {data.contact.showLocation !== false && data.contact.location ? (
        <span className={`contact-item ci-opt${vertical ? ' contact-item-v' : ''}`}>
          <span className="ci-icon"><IconMapPin/></span>
          <E value={data.contact.location} onChange={v => setContact('location', v)} />
          <button className="btn-ci-rm no-print" onClick={() => setContact('showLocation', false)}>×</button>
        </span>
      ) : <button className="btn-ci-add no-print" onClick={() => { setContact('showLocation', true); if (!data.contact.location) setContact('location', 'City, Country') }}>+ location</button>}
      {data.contact.showLinkedin !== false ? (
        <span className={`contact-item ci-opt${vertical ? ' contact-item-v' : ''}`}>
          <a href={liHref(data.contact.linkedin)} target="_blank" rel="noopener noreferrer" className="ci-icon ci-link-icon"><IconLinkedIn/></a>
          <E value={data.contact.linkedin} onChange={v => setContact('linkedin', normLinkedin(v))} />
          <button className="btn-ci-rm no-print" onClick={() => setContact('showLinkedin', false)}>×</button>
        </span>
      ) : <button className="btn-ci-add no-print" onClick={() => setContact('showLinkedin', true)}>+ linkedin</button>}
      {data.contact.showGithub ? (
        <span className={`contact-item ci-opt${vertical ? ' contact-item-v' : ''}`}>
          <a href={ghHref(data.contact.github)} target="_blank" rel="noopener noreferrer" className="ci-icon ci-link-icon"><IconGithub/></a>
          <E value={data.contact.github} onChange={v => setContact('github', normGithub(v))} />
          <button className="btn-ci-rm no-print" onClick={() => setContact('showGithub', false)}>×</button>
        </span>
      ) : <button className="btn-ci-add no-print" onClick={() => { setContact('showGithub', true); if (!data.contact.github) setContact('github', '/username') }}>+ github</button>}
    </div>
  )

  // ── Layout: Sidebar Dark ──────────────────────────────────────────────────────
  const renderSidebarDark = () => {
    const sidebar = (
      <div className="sdark-sidebar" style={{ background: typo.headerBg.color }}>
        <div className="section-wrap"
          onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
          onFocus={() => activate('header')} onBlur={deactivate}
        >
          <SectionTypoPanel {...stp('header', [['bg', 'Background'], ['name', 'Name'], ['title', 'Title'], ['accent', 'Accent Color']])} />
          <div className={`sdark-name-block${data.photoAlign === 'left' ? ' pa-left' : data.photoAlign === 'right' ? ' pa-right' : ''}`}>
            {data.photo && (
              <div className="sdark-photo-wrap no-print-remove">
                <img src={data.photo} className="sdark-photo" alt="Profile" />
                <button className="photo-rm no-print" onClick={() => setPhoto(null)}>×</button>
              </div>
            )}
            {!data.photo && (
              <PhotoBlock photo={null} onUpload={setPhoto} onRemove={() => setPhoto(null)} size={72} />
            )}
            <div className="sdark-align-btns no-print">
              {['left', 'center', 'right'].map(a => (
                <button key={a} className={`sdark-align-btn${(data.photoAlign || 'center') === a ? ' active' : ''}`}
                  onClick={() => set(d => ({ ...d, photoAlign: a }))} title={`Align ${a}`}>
                  {a === 'left' ? '←' : a === 'center' ? '⊙' : '→'}
                </button>
              ))}
            </div>
            <E as="h1" className="sdark-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="sdark-title" value={data.title} onChange={v => setField('title', v)} style={{ fontSize: '11px', fontWeight: 400, color: accentColor, display: 'block', marginTop: 3, lineHeight: 1.4 }} />
          </div>
        </div>
        <div className="sdark-divider" />
        {renderContact(true, true)}
        <div className="sdark-divider" />
        {sidebarSections.map((id, idx) => renderSection(id, sidebarSections, idx, 'compact'))}
      </div>
    )
    const main = (
      <div className="sdark-main">
        {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
      </div>
    )
    return (
      <div className={`resume-sdark${sidebarSide === 'left' ? ' sdark-left' : ''}`}>
        {sidebarSide === 'left' ? <>{sidebar}{main}</> : <>{main}{sidebar}</>}
      </div>
    )
  }

  // ── Layout: Two Column ────────────────────────────────────────────────────────
  const renderTwoCol = () => (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['bg', 'Background'], ['name', 'Name'], ['title', 'Title'], ['summary', 'Summary'], ['accent', 'Accent Color']])} />
        <div className="rh rh-with-photo" style={{ background: typo.headerBg.color }}>
          {data.photoSide === 'left' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={84} />}
          <div className="rh-content">
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={ts('title')} />
            <E as="div" className="rh-summary" value={data.summary} onChange={v => setField('summary', v)} style={ts('summary')} inlineFmt />
          </div>
          {data.photoSide === 'right' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={84} />}
        </div>
      </div>
      {renderContact(false, true, { background: typo.headerBg.color, borderBottomColor: 'rgba(255,255,255,0.1)' })}
      <div className={`resume-two-col${sidebarSide === 'left' ? ' two-col-reversed' : ''}`}>
        <div className="two-col-main">
          {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
        </div>
        <div className="two-col-sidebar">
          {sidebarSections.map((id, idx) => renderSection(id, sidebarSections, idx, 'compact'))}
        </div>
      </div>
    </>
  )

  // ── Layout: Minimal ───────────────────────────────────────────────────────────
  const renderMinimal = () => (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['name', 'Name'], ['title', 'Title'], ['accent', 'Accent Color']])} />
        <div className="rh-minimal rh-with-photo">
          {data.photoSide === 'left' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={80} />}
          <div className="rh-minimal-text rh-content">
            <E as="h1" className="rh-name rh-name-dark" value={data.name} onChange={v => setField('name', v)} style={{ ...ts('name'), color: '#1a1a1a' }} />
            <E as="div" className="rh-title rh-title-accent" value={data.title} onChange={v => setField('title', v)} style={{ ...ts('title'), color: accentColor }} />
          </div>
          {data.photoSide === 'right' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={80} />}
        </div>
      </div>
      {renderContact()}
      {data.summary && (
        <div className="section section-wrap"
          onMouseEnter={() => activate('summary')} onMouseLeave={deactivate}
          onFocus={() => activate('summary')} onBlur={deactivate}
        >
          <SectionTypoPanel {...stp('summary', [['sectionTitle', 'Section Title'], ['summary', 'Summary']])} />
          <div className="section-title-row" style={{ borderBottomColor: accentColor }}>
            <h2 className="section-title st-inline" style={{ ...ts('sectionTitle'), color: accentColor }}>SUMMARY</h2>
          </div>
          <E as="div" className="rh-summary minimal-summary-text" value={data.summary} onChange={v => setField('summary', v)} style={{ ...ts('summary'), color: '#444' }} inlineFmt />
        </div>
      )}
      {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
    </>
  )

  // ── Layout: Classic ───────────────────────────────────────────────────────────
  const renderClassic = () => (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['bg', 'Background'], ['name', 'Name'], ['title', 'Title'], ['summary', 'Summary'], ['accent', 'Accent Color']])} />
        <div className="rh rh-with-photo" style={{ background: typo.headerBg.color }}>
          {data.photoSide === 'left' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={84} />}
          <div className="rh-content">
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={ts('title')} />
            <E as="div" className="rh-summary" value={data.summary} onChange={v => setField('summary', v)} style={ts('summary')} inlineFmt />
          </div>
          {data.photoSide === 'right' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={84} />}
        </div>
      </div>
      {renderContact()}
      {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
    </>
  )

  // ── Layout: Three Column ─────────────────────────────────────────────────────
  const renderThreeCol = () => (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['bg', 'Background'], ['name', 'Name'], ['title', 'Title'], ['summary', 'Summary'], ['accent', 'Accent Color']])} />
        <div className="rh rh-with-photo" style={{ background: typo.headerBg.color }}>
          {data.photoSide === 'left' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={80} />}
          <div className="rh-content">
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={ts('title')} />
          </div>
          {data.photoSide === 'right' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={80} />}
        </div>
      </div>
      {renderContact()}
      <div className="resume-three-col">
        {sidebarSide === 'left' ? (
          <>
            <div className="three-col-right">
              {rightSections.map((id, idx) => renderSection(id, rightSections, idx, 'compact'))}
            </div>
            <div className="three-col-main">
              {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'medium'))}
            </div>
            <div className="three-col-left" style={{ background: typo.headerBg.color }}>
              {leftSections.map((id, idx) => renderSection(id, leftSections, idx, 'compact'))}
            </div>
          </>
        ) : (
          <>
            <div className="three-col-left" style={{ background: typo.headerBg.color }}>
              {leftSections.map((id, idx) => renderSection(id, leftSections, idx, 'compact'))}
            </div>
            <div className="three-col-main">
              {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'medium'))}
            </div>
            <div className="three-col-right">
              {rightSections.map((id, idx) => renderSection(id, rightSections, idx, 'compact'))}
            </div>
          </>
        )}
      </div>
    </>
  )

  // ── Layout: Sidebar Band ─────────────────────────────────────────────────────
  const renderSidebarBand = () => {
    const sidebar = (
      <div className="sb-sidebar" style={{ background: typo.headerBg.color }}>
        {sidebarSections.map((id, idx) => renderSection(id, sidebarSections, idx, 'compact'))}
      </div>
    )
    const main = (
      <div className="sb-main">
        {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
      </div>
    )
    return (
      <>
        <div className="section-wrap"
          onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
          onFocus={() => activate('header')} onBlur={deactivate}
        >
          <SectionTypoPanel {...stp('header', [['bg', 'Background'], ['name', 'Name'], ['title', 'Title'], ['summary', 'Summary'], ['accent', 'Accent Color']])} />
          <div className="rh rh-with-photo" style={{ background: typo.headerBg.color }}>
            {data.photoSide === 'left' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={84} />}
            <div className="rh-content">
              <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
              <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={ts('title')} />
              <E as="div" className="rh-summary" value={data.summary} onChange={v => setField('summary', v)} style={ts('summary')} inlineFmt />
            </div>
            {data.photoSide === 'right' && <PhotoBlock photo={data.photo || null} onUpload={setPhoto} onRemove={() => setPhoto(null)} onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')} flipSide={data.photoSide} size={84} />}
          </div>
        </div>
        {renderContact(false, true, { background: typo.headerBg.color, borderBottomColor: 'rgba(255,255,255,0.1)' })}
        <div className="sb-body">
          {sidebarSide === 'left' ? <>{main}{sidebar}</> : <>{sidebar}{main}</>}
        </div>
        {bottomSections.length > 0 && (
          <div className="sb-footer">
            {bottomSections.map((id, idx) => renderSection(id, bottomSections, idx, 'wide'))}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="page-bg" onClick={e => {
      if (e.target.closest('.tpl-overlay') === null) setShowTemplatePicker(false)
      if (e.target.closest('.sm-overlay') === null) setShowSectionManager(false)
    }}>
      <FormattingToolbar />

      {showTemplatePicker && (
        <TemplatePicker
          current={template}
          onSelect={handleSelectTemplate}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}

      {showSectionManager && (
        <SectionManager
          sectionOrder={sectionOrder}
          columnAssignment={columnAssignment}
          template={template}
          onAdd={id => { addSection(id); }}
          onRemove={id => removeSection(id)}
          onMoveUp={id => {
            set(d => {
              const order = [...d.sectionOrder]
              const i = order.indexOf(id)
              if (i <= 0) return d
              ;[order[i], order[i - 1]] = [order[i - 1], order[i]]
              return { ...d, sectionOrder: order }
            })
          }}
          onMoveDown={id => {
            set(d => {
              const order = [...d.sectionOrder]
              const i = order.indexOf(id)
              if (i >= order.length - 1) return d
              ;[order[i], order[i + 1]] = [order[i + 1], order[i]]
              return { ...d, sectionOrder: order }
            })
          }}
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
          <button
            className={`btn-tpl${showTemplatePicker ? ' btn-tpl-active' : ''}`}
            onClick={e => { e.stopPropagation(); setShowTemplatePicker(v => !v); setShowSectionManager(false) }}
          >
            ◫ Layout
          </button>
          <button
            className={`btn-sections${showSectionManager ? ' btn-sections-active' : ''}`}
            onClick={e => { e.stopPropagation(); setShowSectionManager(v => !v); setShowTemplatePicker(false) }}
          >
            ☰ Sections
          </button>
          {isMultiCol && (
            <button className="btn-flip" onClick={() => setSidebarSide(s => s === 'right' ? 'left' : 'right')} title="Flip sidebar side">
              {sidebarSide === 'right' ? '⇆ Sidebar Left' : '⇆ Sidebar Right'}
            </button>
          )}
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
          <button className="btn-export" onClick={() => {
            const md = dataToMd(data)
            const a = document.createElement('a')
            a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' }))
            a.download = `${(activeSave || data.name || 'resume').replace(/[^a-zA-Z0-9_. -]/g, '').replace(/\s+/g, '-').toLowerCase()}.md`
            a.click()
            URL.revokeObjectURL(a.href)
          }}>↓ .md</button>
          <button className="btn-reset" onClick={() => { if (confirm('Reset to original?')) { localStorage.removeItem('resume-v3'); setData(INITIAL) } }}>Reset</button>
        </div>
      </div>

      <div className={`resume resume-${template}`} style={
        (isSidebarDark || isThreeCol) ? { background: typo.headerBg.color } :
        (isMultiCol) ? { background: '#f0f2f5' } :
        {}
      }>
        {isSidebarDark && renderSidebarDark()}
        {isThreeCol && renderThreeCol()}
        {isSidebarBand && renderSidebarBand()}
        {!isSidebarDark && !isThreeCol && !isSidebarBand && isMultiCol && renderTwoCol()}
        {!isMultiCol && isMinimal && renderMinimal()}
        {!isMultiCol && !isMinimal && renderClassic()}
      </div>
    </div>
  )
}

// ── Bullet row ─────────────────────────────────────────────────────────────────
function BulletRow({ value, onChange, onEnter, onRemove, onBackspaceEmpty, dp, bulletStyle }) {
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
