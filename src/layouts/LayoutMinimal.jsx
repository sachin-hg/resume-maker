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
  id: 'minimal',
  name: 'Minimal',
  desc: 'Single column · Summary as section',
  columns: 'single',
  defaultMain: ['skills', 'work', 'education', 'achievements', 'extra'],
  defaultSidebar: [],
}

export function LayoutMinimal({ renderSection, mainSections }) {
  const { data, setField, setPhoto, setPhotoSide } = useResumeData()
  const { typo, ts, stp, accentColor } = useTypography()
  const { activate, deactivate } = useUI()

  const headerIsDark = isColorDark(typo.headerBg.color)
  const nameStyle = headerIsDark ? ts('name') : { ...ts('name'), color: '#1a1a1a' }
  // Summary is in the white body area — ensure the color is always readable on white
  const rawSummaryColor = typo.summary?.color
  const summaryOnWhite = rawSummaryColor && isColorDark(rawSummaryColor) ? rawSummaryColor : '#444'
  const summaryStyle = { ...ts('summary'), color: summaryOnWhite }

  return (
    <>
      <div className="section-wrap"
        onMouseEnter={() => activate('header')} onMouseLeave={deactivate}
        onFocus={() => activate('header')} onBlur={deactivate}
      >
        <SectionTypoPanel {...stp('header', [['name', 'Name'], ['title', 'Title'], ['accent', 'Accent Color']])} />
        <div className="rh-minimal rh-with-photo"
          style={{ background: typo.headerBg.color, borderBottomColor: accentColor }}
        >
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
          <div className="rh-minimal-text rh-content">
            <E as="h1" className="rh-name" value={data.name} onChange={v => setField('name', v)} style={nameStyle} />
            <E as="div" className="rh-title rh-title-accent" value={data.title} onChange={v => setField('title', v)} style={ts('title')} />
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
      {data.summary && (
        <div className="section section-wrap"
          onMouseEnter={() => activate('summary')} onMouseLeave={deactivate}
          onFocus={() => activate('summary')} onBlur={deactivate}
        >
          <SectionTypoPanel {...stp('summary', [['sectionTitle', 'Section Title'], ['summary', 'Summary']])} />
          <div className="section-title-row" style={{ borderBottomColor: typo.sectionTitle?.color }}>
            <h2 className="section-title st-inline" style={ts('sectionTitle')}>SUMMARY</h2>
          </div>
          <E as="div" className="rh-summary" value={data.summary} onChange={v => setField('summary', v)} style={summaryStyle} inlineFmt />
        </div>
      )}
      {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
    </>
  )
}
