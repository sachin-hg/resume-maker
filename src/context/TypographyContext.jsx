import React, { createContext, useContext } from 'react'

const TypographyContext = createContext(null)

export function TypographyProvider({ children, value }) {
  return <TypographyContext.Provider value={value}>{children}</TypographyContext.Provider>
}

export function useTypography() {
  const ctx = useContext(TypographyContext)
  if (!ctx) throw new Error('useTypography must be used within TypographyProvider')
  return ctx
}

// Context value shape (constructed in App.jsx):
// {
//   typo,
//   setTypoKey,
//   ts,         // (key) => { fontSize, fontWeight, fontStyle, textAlign, color }
//   accentColor,
//   stp,        // (key, rows, flip?) => SectionTypoPanel props object
//   activeSection,
// }
