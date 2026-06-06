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
  id: 'two-col',
  name: 'Two Column',
  desc: 'Header · Two-column body',
  columns: 'two',
  defaultMain: ['work', 'education'],
  defaultSidebar: ['skills', 'achievements', 'extra'],
}

export function LayoutTwoCol({ renderSection, mainSections, sidebarSections }) {
  const { data, setField, setPhoto, setPhotoSide } = useResumeData()
  const { typo, ts, stp, pillTitleStyle, summaryInHeaderStyle } = useTypography()
  const { activate, deactivate, sidebarSide } = useUI()

  const headerIsDark = isColorDark(typo.headerBg.color)

  return (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['bg', 'Background'], ['name', 'Name'], ['title', 'Title'], ['summary', 'Summary'], ['accent', 'Accent Color']])} />
        <div className="rh rh-with-photo" style={{ background: typo.headerBg.color }}>
          {data.photoSide === 'left' && (
            <PhotoBlock
              photo={data.photo || null}
              onUpload={setPhoto}
              onRemove={() => setPhoto(null)}
              onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')}
              flipSide={data.photoSide}
              size={84}
            />
          )}
          <div className="rh-content">
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={ts('name')} />
            <E as="div" className="rh-title" value={data.title} onChange={v => setField('title', v)} style={pillTitleStyle} />
            <E as="div" className="rh-summary" value={data.summary} onChange={v => setField('summary', v)} style={summaryInHeaderStyle} inlineFmt />
          </div>
          {data.photoSide === 'right' && (
            <PhotoBlock
              photo={data.photo || null}
              onUpload={setPhoto}
              onRemove={() => setPhoto(null)}
              onFlip={() => setPhotoSide(data.photoSide === 'right' ? 'left' : 'right')}
              flipSide={data.photoSide}
              size={84}
            />
          )}
        </div>
      </div>
      <ContactBar
        isDark={headerIsDark}
        extraStyle={{
          background: typo.headerBg.color,
          borderBottomColor: headerIsDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        }}
      />
      <div className={`resume-two-col${sidebarSide === 'left' ? ' two-col-reversed' : ''}`}>
        <div className="two-col-main">
          <div className="blob-clip no-print">
            <div className="theme-blob theme-blob-1" />
            <div className="theme-blob theme-blob-2" />
          </div>
          {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
        </div>
        <div className="two-col-sidebar">
          {sidebarSections.map((id, idx) => renderSection(id, sidebarSections, idx, 'compact'))}
        </div>
      </div>
    </>
  )
}
