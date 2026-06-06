import React from 'react'
import { IconMail, IconPhone, IconMapPin, IconLinkedIn, IconGithub } from '../icons'
import { E } from './EditableText'
import { SectionTypoPanel } from './SectionTypoPanel'
import { useResumeData } from '../context/ResumeContext'
import { useTypography } from '../context/TypographyContext'
import { useUI } from '../context/UIContext'
import { isColorDark } from '../utils/color'
import { DEFAULT_TYPO } from '../utils/constants'
import { normLinkedin, normGithub } from '../utils/markdown'

const liHref = path => `https://linkedin.com${path?.startsWith('/') ? path : '/' + (path || '')}`
const ghHref = path => `https://github.com${path?.startsWith('/') ? path : '/' + (path || '')}`

export function ContactBar({ vertical = false, isDark = false, extraStyle = {} }) {
  const { data, set } = useResumeData()
  const { ts, stp } = useTypography()
  const { activate, deactivate } = useUI()

  const setContact = (f, v) => set(d => ({ ...d, contact: { ...d.contact, [f]: v } }))

  return (
    <div
      className={`contact-bar${vertical ? ' contact-bar-v' : ''}${isDark ? ' contact-bar-dark' : ''}`}
      style={{
        fontSize: ts('contact').fontSize,
        color: (isDark && ts('contact').color === DEFAULT_TYPO.contact.color)
          ? 'rgba(255,255,255,0.75)'
          : ts('contact').color,
        ...extraStyle,
      }}
      onMouseEnter={() => activate('contact')}
      onMouseLeave={deactivate}
      onFocus={() => activate('contact')}
      onBlur={deactivate}
    >
      <SectionTypoPanel
        {...stp('contact', [['contact', 'Contact']])}
        extraClass={vertical ? 'stp-below' : ''}
      />
      <span className={`contact-item${vertical ? ' contact-item-v' : ''}`}>
        <span className="ci-icon"><IconMail /></span>
        <E value={data.contact.email} onChange={v => setContact('email', v)} />
      </span>
      <span className={`contact-item${vertical ? ' contact-item-v' : ''}`}>
        <span className="ci-icon"><IconPhone /></span>
        <E value={data.contact.phone} onChange={v => setContact('phone', v)} />
      </span>
      {data.contact.showLocation !== false && data.contact.location ? (
        <span className={`contact-item ci-opt${vertical ? ' contact-item-v' : ''}`}>
          <span className="ci-icon"><IconMapPin /></span>
          <E value={data.contact.location} onChange={v => setContact('location', v)} />
          <button className="btn-ci-rm no-print" onClick={() => setContact('showLocation', false)}>×</button>
        </span>
      ) : (
        <button
          className="btn-ci-add no-print"
          onClick={() => {
            setContact('showLocation', true)
            if (!data.contact.location) setContact('location', 'City, Country')
          }}
        >
          + location
        </button>
      )}
      {data.contact.showLinkedin !== false ? (
        <span className={`contact-item ci-opt${vertical ? ' contact-item-v' : ''}`}>
          <a
            href={liHref(data.contact.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="ci-icon ci-link-icon"
          >
            <IconLinkedIn />
          </a>
          <E value={data.contact.linkedin} onChange={v => setContact('linkedin', normLinkedin(v))} />
          <button className="btn-ci-rm no-print" onClick={() => setContact('showLinkedin', false)}>×</button>
        </span>
      ) : (
        <button className="btn-ci-add no-print" onClick={() => setContact('showLinkedin', true)}>
          + linkedin
        </button>
      )}
      {data.contact.showGithub ? (
        <span className={`contact-item ci-opt${vertical ? ' contact-item-v' : ''}`}>
          <a
            href={ghHref(data.contact.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="ci-icon ci-link-icon"
          >
            <IconGithub />
          </a>
          <E value={data.contact.github} onChange={v => setContact('github', normGithub(v))} />
          <button className="btn-ci-rm no-print" onClick={() => setContact('showGithub', false)}>×</button>
        </span>
      ) : (
        <button
          className="btn-ci-add no-print"
          onClick={() => {
            setContact('showGithub', true)
            if (!data.contact.github) setContact('github', '/username')
          }}
        >
          + github
        </button>
      )}
    </div>
  )
}
