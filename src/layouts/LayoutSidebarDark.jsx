import React from 'react'
import { ContactBar } from '../components/ContactBar'
import { PhotoBlock } from '../components/PhotoBlock'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { E } from '../components/EditableText'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { isColorDark } from '../utils/color'
import { TEMPLATE_DEFS } from './defs'

export const TEMPLATE_DEF = TEMPLATE_DEFS.find(t => t.id === 'sidebar-dark')

/**
 * LayoutSidebarDark — dark left panel with white main content area.
 *
 * Props:
 *   renderSection(id, sections, idx, layout) — renders a single section
 *   columnAssignment  — { [sectionId]: 'main' | 'sidebar' } map
 */
export function LayoutSidebarDark({ renderSection, mainSections = [], sidebarSections = [] }) {
  const { data, set } = useResumeData()
  const { ts, stp, typo, accentColor } = useTypography()
  const { activate, deactivate, sidebarSide } = useUI()

  const sidebarBgColor = typo.sidebarBg?.color ?? typo.headerBg.color
  const sidebarIsDark = isColorDark(sidebarBgColor)

  const setPhoto = v => set(d => ({ ...d, photo: v }))
  const setField = (f, v) => set(d => ({ ...d, [f]: v }))

  const sidebar = (
    <div
      className={`sdark-sidebar${sidebarIsDark ? '' : ' sdark-light'}`}
      style={{ background: sidebarBgColor }}
    >
      <div
        className="section-wrap"
        onMouseEnter={() => activate('header')}
        onMouseLeave={deactivate}
        onFocus={() => activate('header')}
        onBlur={deactivate}
      >
        <SectionTypoPanel
          {...stp('header', [
            ['bg', 'Header Bg'],
            ['sidebar-bg', 'Sidebar Bg'],
            ['name', 'Name'],
            ['title', 'Title'],
            ['accent', 'Accent Color'],
          ])}
        />
        <div
          className={`sdark-name-block${
            data.photoAlign === 'left' ? ' pa-left'
            : data.photoAlign === 'right' ? ' pa-right'
            : ''
          }`}
        >
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
              <button
                key={a}
                className={`sdark-align-btn${(data.photoAlign || 'center') === a ? ' active' : ''}`}
                onClick={() => set(d => ({ ...d, photoAlign: a }))}
                title={`Align ${a}`}
              >
                {a === 'left' ? '←' : a === 'center' ? '⊙' : '→'}
              </button>
            ))}
          </div>
          <E
            as="h1"
            className="sdark-name"
            value={data.name}
            onChange={v => setField('name', v)}
            style={ts('name')}
          />
          <E
            as="div"
            className="sdark-title"
            value={data.title}
            onChange={v => setField('title', v)}
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: accentColor,
              display: 'block',
              marginTop: 3,
              lineHeight: 1.4,
            }}
          />
        </div>
      </div>
      <div className="sdark-divider" />
      <ContactBar vertical isDark={sidebarIsDark} extraStyle={{ background: 'transparent' }} />
      <div className="sdark-divider" />
      {sidebarSections.map((id, idx) =>
        renderSection(id, sidebarSections, idx, 'compact')
      )}
    </div>
  )

  const main = (
    <div className="sdark-main">
      <div className="blob-clip no-print">
        <div className="theme-blob theme-blob-1" />
        <div className="theme-blob theme-blob-2" />
      </div>
      {mainSections.map((id, idx) =>
        renderSection(id, mainSections, idx, 'wide')
      )}
    </div>
  )

  return (
    <div className={`resume-sdark${sidebarSide === 'left' ? ' sdark-left' : ''}`}>
      {sidebarSide === 'left' ? <>{sidebar}{main}</> : <>{main}{sidebar}</>}
    </div>
  )
}
