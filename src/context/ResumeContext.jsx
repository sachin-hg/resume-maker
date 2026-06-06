import React, { createContext, useContext, useState, useRef, useCallback } from 'react'
import { INITIAL, normalizeContact } from '../utils/constants'
import { parseMd, dataToMd, normLinkedin, normGithub } from '../utils/markdown'

const ResumeContext = createContext(null)

export function ResumeProvider({ children, value }) {
  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResumeData() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResumeData must be used within ResumeProvider')
  return ctx
}
