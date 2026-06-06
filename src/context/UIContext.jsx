import React, { createContext, useContext } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children, value }) {
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}

// Context value shape (constructed in App.jsx):
// {
//   activeSection,
//   activate,         // (id) => void
//   deactivate,       // () => void
//   // drag state for skills
//   dragSk, setDragSk, dragSkOver, setDragSkOver,
//   // drag state for bullets
//   dragBu, setDragBu, dragBuOver, setDragBuOver,
//   // layout hints (set by layout components via prop or context)
//   template,
//   sidebarSide, setSidebarSide,
//   showTemplatePicker, setShowTemplatePicker,
//   showThemePicker, setShowThemePicker,
//   showSectionManager, setShowSectionManager,
// }
