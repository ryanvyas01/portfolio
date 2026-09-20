/**
 * ============================================================================
 *  CONTENT TYPES
 * ============================================================================
 *  The site renders one "content pack" at a time. A pack supplies every piece
 *  of text, plus the per-job section headings, so the software and dog
 *  training portfolios can word the same sections differently while sharing
 *  one component tree.
 *
 *  Structure (section ids and order) is deliberately NOT part of a pack — it
 *  lives in `navItems` and `App.tsx` so both jobs keep the same layout.
 */

export type SocialLink = {
  label: string
  href: string
  /** Icon key handled in components/BrandIcon.tsx. */
  icon: 'github' | 'linkedin' | 'x' | 'mail' | 'website'
}

/**
 * The canonical section ids. Order and membership are shared by every job —
 * only the labels and headings differ — so the nav and the page can never
 * disagree about structure.
 */
export const SECTION_IDS = [
  'about',
  'experience',
  'education',
  'skills',
  'projects',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

/**
 * The sections a job actually renders, in the shared order.
 *
 * This is what lets the two portfolios differ structurally: the software page
 * shows every section, the trainer page drops the ones that do not apply. Both
 * the nav and the page read from it, so they cannot disagree.
 */
export type EnabledSections = SectionId[]

export type NavItem = {
  id: string
  label: string
}

export type Experience = {
  company: string
  role: string
  location?: string
  employmentType?: string
  start: string
  end: string
  summary?: string
  highlights: string[]
  tech?: string[]
}

export type Project = {
  name: string
  period?: string
  description: string
  highlights?: string[]
  tech: string[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type Education = {
  school: string
  credential: string
  field?: string
  start: string
  end: string
  details?: string[]
}

export type Certification = {
  name: string
  issuer: string
  year: string
  url?: string
}

/** Per-section headings, so each job can word each section for itself. */
export type SectionCopy = {
  eyebrow: string
  title: string
  description?: string
}

export type Profile = {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  /** Served from `public/`. Falls back to a monogram when missing. */
  photoUrl: string
  /** Served from `public/`. */
  resumeUrl: string
}

/**
 * Everything that changes when you flip jobs. `sections` and `navLabels` are
 * keyed by the shared section ids.
 */
export type PortfolioContent = {
  /** Short label for the toggle's accessible name, e.g. "dog trainer". */
  label: string
  profile: Profile
  socials: SocialLink[]
  /**
   * Which sections this job renders. Both the nav and the page read from it, so
   * the trainer page can drop sections that do not apply to it without the two
   * drifting apart.
   */
  enabledSections: EnabledSections
  /** Nav wording for this job; ordering comes from `SECTION_IDS`. */
  navLabels: Record<SectionId, string>
  /** Headings for each section, so each job can word them for itself. */
  sections: Record<SectionId, SectionCopy>
  about: {
    paragraphs: string[]
    highlights: { label: string; value: string }[]
  }
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  education: Education[]
  certifications: Certification[]
}

export type JobMode = 'software' | 'dog'
