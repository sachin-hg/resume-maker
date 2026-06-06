import { SectionSummary, SECTION_DEF as summaryDef } from './SectionSummary'
import { SectionSkills, SECTION_DEF as skillsDef } from './SectionSkills'
import { SectionWork, SECTION_DEF as workDef } from './SectionWork'
import { SectionEducation, SECTION_DEF as educationDef } from './SectionEducation'
import { SectionAchievements, SECTION_DEF as achievementsDef } from './SectionAchievements'
import { SectionLanguages, SECTION_DEF as languagesDef } from './SectionLanguages'
import { SectionCourses, SECTION_DEF as coursesDef } from './SectionCourses'
import { SectionPassions, SECTION_DEF as passionsDef } from './SectionPassions'
import { SectionCertifications, SECTION_DEF as certificationsDef } from './SectionCertifications'
import { SectionMyTime, SECTION_DEF as mytimeDef } from './SectionMyTime'
import { SectionExtra, SECTION_DEF as extraDef } from './SectionExtra'

export const SECTION_REGISTRY = {
  summary:        { ...summaryDef,        component: SectionSummary },
  skills:         { ...skillsDef,         component: SectionSkills },
  work:           { ...workDef,           component: SectionWork },
  education:      { ...educationDef,      component: SectionEducation },
  achievements:   { ...achievementsDef,   component: SectionAchievements },
  languages:      { ...languagesDef,      component: SectionLanguages },
  courses:        { ...coursesDef,        component: SectionCourses },
  passions:       { ...passionsDef,       component: SectionPassions },
  certifications: { ...certificationsDef, component: SectionCertifications },
  mytime:         { ...mytimeDef,         component: SectionMyTime },
  extra:          { ...extraDef,          component: SectionExtra },
}
