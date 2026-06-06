// ── URL helpers ────────────────────────────────────────────────────────────────
export const normLinkedin = v => {
  if (!v) return v
  if (v.startsWith('/')) return v
  const m = v.match(/linkedin\.com(\/.+)/)
  return m ? m[1] : '/' + v
}
export const normGithub = v => {
  if (!v) return v
  if (v.startsWith('/')) return v
  const m = v.match(/github\.com(\/.+)/)
  return m ? m[1] : '/' + v
}

// ── Markdown parser ────────────────────────────────────────────────────────────
export function parseMd(md) {
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
export function parseTypoFromMd(md) {
  const first = md.split('\n')[0]
  const m = first.match(/^<!-- typo:(.*) -->$/)
  if (!m) return null
  try { return { ...DEFAULT_TYPO, ...JSON.parse(m[1]) } } catch { return null }
}

// ── Data → markdown serializer ─────────────────────────────────────────────────
export function dataToMd(data, typo) {
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
