export const TEMPLATE_DEFS = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Single column · Summary in header',
    columns: 'single',
    defaultMain: ['skills', 'work', 'education', 'achievements', 'extra'],
    defaultSidebar: [],
    // Behaviour flags — add new layouts here, nowhere else
    summaryHandledByLayout: true,   // layout renders summary in header; exclude from sections map
    autoAddSummary: false,          // don't force 'summary' into sectionOrder on template switch
    sidebarBgOnWrapper: false,      // apply sidebarBg colour to the .resume wrapper div
    showBlobs: true,                // render decorative background blobs
    columnOptions: null,            // null = single-col; array drives SectionManager column selector
  },
  {
    id: 'two-col',
    name: 'Two Column',
    desc: 'Header · Two-column body',
    columns: 'two',
    defaultMain: ['work', 'education'],
    defaultSidebar: ['skills', 'achievements', 'extra'],
    summaryHandledByLayout: true,
    autoAddSummary: false,
    sidebarBgOnWrapper: false,
    showBlobs: false,
    columnOptions: [
      { value: 'main', label: 'Main' },
      { value: 'sidebar', label: 'Sidebar' },
    ],
  },
  {
    id: 'sidebar-dark',
    name: 'Side Panel',
    desc: 'Full-height panel · Content area',
    columns: 'sidebar-left',
    defaultMain: ['summary', 'work', 'education', 'extra'],
    defaultSidebar: ['skills', 'achievements'],
    summaryHandledByLayout: false,
    autoAddSummary: true,           // sidebar layouts show summary as a section
    sidebarBgOnWrapper: true,       // panel colour bleeds to wrapper bottom
    showBlobs: false,
    columnOptions: [
      { value: 'main', label: 'Main' },
      { value: 'sidebar', label: 'Sidebar' },
    ],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Single column · Summary as section',
    columns: 'single',
    defaultMain: ['skills', 'work', 'education', 'achievements', 'extra'],
    defaultSidebar: [],
    summaryHandledByLayout: true,   // LayoutMinimal hardcodes a summary block
    autoAddSummary: false,
    sidebarBgOnWrapper: false,
    showBlobs: true,
    columnOptions: null,
  },
  {
    id: 'three-col',
    name: 'Three Column',
    desc: 'Three-column body',
    columns: 'three',
    defaultLeft: ['summary', 'achievements', 'passions', 'languages'],
    defaultMain: ['work', 'education'],
    defaultRight: ['skills', 'courses', 'certifications', 'extra'],
    summaryHandledByLayout: false,
    autoAddSummary: true,
    sidebarBgOnWrapper: true,       // left panel colour applied to wrapper
    showBlobs: false,
    columnOptions: [
      { value: 'left', label: 'Left' },
      { value: 'main', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
  },
  {
    id: 'sidebar-band',
    name: 'Sidebar + Band',
    desc: 'Header · Sidebar + Main · Footer',
    columns: 'sidebar-band',
    defaultSidebar: ['skills', 'languages'],
    defaultMain: ['work', 'education'],
    defaultBottom: ['achievements', 'certifications', 'extra'],
    summaryHandledByLayout: true,   // rh-summary lives in the header
    autoAddSummary: false,
    sidebarBgOnWrapper: false,
    showBlobs: false,
    columnOptions: [
      { value: 'sidebar', label: 'Sidebar' },
      { value: 'main', label: 'Main' },
      { value: 'bottom', label: 'Footer' },
    ],
  },
]
