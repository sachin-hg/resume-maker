export { TEMPLATE_DEFS } from './defs'

import { LayoutClassic } from './LayoutClassic'
import { LayoutMinimal } from './LayoutMinimal'
import { LayoutTwoCol } from './LayoutTwoCol'
import { LayoutSidebarDark } from './LayoutSidebarDark'
import { LayoutThreeCol } from './LayoutThreeCol'
import { LayoutSidebarBand } from './LayoutSidebarBand'

export const LAYOUT_COMPONENTS = {
  'classic':       LayoutClassic,
  'two-col':       LayoutTwoCol,
  'sidebar-dark':  LayoutSidebarDark,
  'minimal':       LayoutMinimal,
  'three-col':     LayoutThreeCol,
  'sidebar-band':  LayoutSidebarBand,
}
