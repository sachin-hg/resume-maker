import React from 'react'

// ── Section item icons ─────────────────────────────────────────────────────────
const IconStar     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
const IconLightning= () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
const IconHeart    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
const IconTrophy   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 21h8m-4-4v4m-5-9V5h10v7a5 5 0 0 1-10 0z"/><path d="M7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4"/></svg>
const IconTarget   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
const IconBook     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconUser     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconGlobe    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const IconMusic    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
const IconCode     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const IconIdea     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.9V17H8v-2.1A7 7 0 0 1 12 2z"/></svg>

// ── URL helpers (required by normalizeContact) ─────────────────────────────────
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

// ── Section type registry ──────────────────────────────────────────────────────
export const SECTION_TYPE_DEFS = {
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
export const DEFAULT_TYPO = {
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
  sidebarBg:   { color: '#1e2d3e' },
  accentColor: { color: '#1a7a70' },
}

// ── Donut chart colors ─────────────────────────────────────────────────────────
export const DONUT_COLORS = ['#4292c6','#74c476','#fd8d3c','#9467bd','#e377c2','#8c564b','#17becf','#bcbd22']

// ── Initial data ───────────────────────────────────────────────────────────────
export const INITIAL = {
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

// ── Section icon map ───────────────────────────────────────────────────────────
export const SECTION_ICON_MAP = { star: <IconStar/>, lightning: <IconLightning/>, heart: <IconHeart/>, trophy: <IconTrophy/>, target: <IconTarget/>, book: <IconBook/>, user: <IconUser/>, globe: <IconGlobe/>, music: <IconMusic/>, code: <IconCode/>, idea: <IconIdea/> }
export const SECTION_ICON_KEYS = Object.keys(SECTION_ICON_MAP)

// ── Normalize contact ──────────────────────────────────────────────────────────
export const normalizeContact = c => {
  const base = { showLocation: true, showLinkedin: true, showGithub: false, ...c }
  base.linkedin = normLinkedin(c?.linkedin ?? INITIAL.contact.linkedin)
  base.github = normGithub(c?.github ?? '')
  base.showGithub = c?.showGithub !== undefined ? c.showGithub : Boolean(c?.github)
  return base
}
