import React from 'react'
import { ContactBar } from '../components/ContactBar'
import { PhotoBlock } from '../components/PhotoBlock'
import { SectionTypoPanel } from '../components/SectionTypoPanel'
import { E } from '../components/EditableText'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { isColorDark } from '../utils/color'

export const TEMPLATE_DEF = {
  id: 'three-col',
  name: 'Three Column',
  desc: 'Three-column body',
  columns: 'three',
  defaultLeft: ['summary', 'achievements', 'passions', 'languages'],
  defaultMain: ['work', 'education'],
  defaultRight: ['skills', 'courses', 'certifications', 'extra'],
}

export function LayoutThreeCol({ renderSection, mainSections, leftSections, rightSections }) {
  const { data, setField, setPhoto, setPhotoSide } = useResumeData()
  const { typo, ts, stp, pillTitleStyle } = useTypography()
  const { activate, deactivate, sidebarSide } = useUI()

  const sidebarBgColor = typo.sidebarBg?.color ?? typo.headerBg.color
  const sidebarIsDark = isColorDark(sidebarBgColor)
  const leftClass = `three-col-left${sidebarIsDark ? '' : ' three-col-left-light'}`

  return (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['bg', 'Header Bg'], ['sidebar-bg', 'Sidebar Bg'], ['name', 'Name'], ['title', 'Title'], ['summary', 'Summary'], ['accent', 'Accent Color']])} />
        <div className="rh rh-with-photo" style={{ background: typo.headerBg.color }}>
          {data.photoSide === 'left' && (
            <PhotoBlock
              photo={data.photo || null}
              onUpload={setPhoto}
              onRemove={() => setPhoto(null)}
              onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')}
              flipSide={data.photoSide}
              size={80}
            />
          )}
          <div className="rh-content">
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={pillTitleStyle} />
          </div>
          {data.photoSide === 'right' && (
            <PhotoBlock
              photo={data.photo || null}
              onUpload={setPhoto}
              onRemove={() => setPhoto(null)}
              onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')}
              flipSide={data.photoSide}
              size={80}
            />
          )}
        </div>
      </div>
      <ContactBar />
      <div className="resume-three-col">
        {sidebarSide === 'left' ? (
          <>
            <div className="three-col-right">
              {rightSections.map((id, idx) => renderSection(id, rightSections, idx, 'compact'))}
            </div>
            <div className="three-col-main">
              <div className="blob-clip no-print">
                <div className="theme-blob theme-blob-1" />
                <div className="theme-blob theme-blob-2" />
              </div>
              {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'medium'))}
            </div>
            <div className={leftClass} style={{ background: sidebarBgColor }}>
              {leftSections.map((id, idx) => renderSection(id, leftSections, idx, 'compact'))}
            </div>
          </>
        ) : (
          <>
            <div className={leftClass} style={{ background: sidebarBgColor }}>
              {leftSections.map((id, idx) => renderSection(id, leftSections, idx, 'compact'))}
            </div>
            <div className="three-col-main">
              <div className="blob-clip no-print">
                <div className="theme-blob theme-blob-1" />
                <div className="theme-blob theme-blob-2" />
              </div>
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
}
