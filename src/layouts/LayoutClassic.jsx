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
  id: 'classic',
  name: 'Classic',
  desc: 'Single column · Summary in header',
  columns: 'single',
  defaultMain: ['skills', 'work', 'education', 'achievements', 'extra'],
  defaultSidebar: [],
}

export function LayoutClassic({ renderSection, mainSections }) {
  const { data, setField, setPhoto, setPhotoSide } = useResumeData()
  const { typo, ts, stp, pillTitleStyle, summaryInHeaderStyle } = useTypography()
  const { activate, deactivate } = useUI()

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
        extraStyle={headerIsDark ? { background: typo.headerBg.color, borderBottomColor: 'rgba(255,255,255,0.1)' } : {}}
      />
      {mainSections.map((id, idx) => renderSection(id, mainSections, idx, 'wide'))}
    </>
  )
}
