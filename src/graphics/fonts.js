export const FONT_DEFS = [
  { id: 'auto',        name: 'Theme Default', stack: null },
  { id: 'system',      name: 'System',       stack: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { id: 'inter',       name: 'Inter',        stack: '"Inter", sans-serif',           url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  { id: 'poppins',     name: 'Poppins',      stack: '"Poppins", sans-serif',         url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
  { id: 'lato',        name: 'Lato',         stack: '"Lato", sans-serif',            url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap' },
  { id: 'raleway',     name: 'Raleway',      stack: '"Raleway", sans-serif',         url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap' },
  { id: 'playfair',    name: 'Playfair',     stack: '"Playfair Display", serif',     url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap' },
  { id: 'merriweather',name: 'Merriweather', stack: '"Merriweather", serif',         url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap' },
  { id: 'sourceserif', name: 'Source Serif', stack: '"Source Serif 4", serif',       url: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&display=swap' },
  { id: 'ibmplex',     name: 'IBM Plex',     stack: '"IBM Plex Sans", sans-serif',   url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap' },
  { id: 'dmserif',     name: 'DM Serif',     stack: '"DM Serif Display", serif',     url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap' },
]

const loadedFonts = new Set()

export function loadFont(fontDef) {
  if (!fontDef.url || loadedFonts.has(fontDef.id)) return
  loadedFonts.add(fontDef.id)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = fontDef.url
  document.head.appendChild(link)
}
