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
 * Every section id that exists, so `enabledSections` can be typed against them.
 *
 * These are NOT in render order, and the order here is not what a visitor sees.
 * A job's page order comes from its own `enabledSections` — see below — because
 * the two portfolios do not tell the same story in the same sequence: the
 * trainer page runs philosophy, method, specialties, programs, while the
 * software page runs about, experience, education, skills, projects.
 */
export const SECTION_IDS = [
  'about',
  'process',
  'experience',
  'education',
  'skills',
  'testimonials',
  'projects',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

/**
 * The sections a job renders, IN PAGE ORDER.
 *
 * This is both the membership and the sequence: it is what lets the trainer page
 * drop sections that do not apply, and it is what the nav is built from, so the
 * nav and the page cannot disagree about either. Adding an id here adds it to
 * both; reordering it here reorders both.
 *
 * An earlier version derived the nav from `SECTION_IDS` instead, which meant the
 * two were only ever consistent by coincidence — the nav would have kept the
 * canonical order no matter how a job ordered its own page.
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

/**
 * One step in how a job works with a client.
 *
 * The title is the claim, the description is what actually happens — kept
 * separate because the two are read differently: the titles are scanned, the
 * descriptions are what convince someone the claim is real.
 */
export type ProcessStep = {
  title: string
  description: string
}

/**
 * A quote from someone the job has worked with.
 *
 * Its own type rather than a generic card, because what makes a testimonial
 * worth anything is that a person can be recognised in it. A quote with no
 * attribution is worth very little, and an invented one is worth less than
 * nothing — so these are only ever supplied from real clients.
 */
export type Testimonial = {
  quote: string
  /** First name, or first name and initial. Not a full surname without consent. */
  name: string
  /** The dog, and anything that makes the pairing recognisable. */
  detail?: string
}

export type Profile = {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  /** Served from `public/`. Falls back to a monogram when missing. */
  photoUrl: string
  /**
   * Served from `public/`.
   *
   * Optional because a job may have nothing to download, and an absent value is
   * better than a button pointing at a file that is not there — the trainer
   * portfolio takes bookings rather than handing out a CV.
   */
  resumeUrl?: string
}

/**
 * How a job's Contact section takes a booking or a message.
 *
 * A discriminated union rather than two optional fields, so a pack cannot
 * accidentally declare both a form and a calendar, or neither.
 *
 * Both variants allow their destination to be absent, because the destination is
 * configuration rather than content. The frontend is complete either way, and
 * each case degrades to the `mailto:` link already in `profile.email` rather
 * than rendering something that only looks like it works.
 */
export type ContactChannel =
  | {
      kind: 'form'
      /**
       * Where the message is posted — a Formspree endpoint shaped like
       * `https://formspree.io/f/xxxxxxxx`.
       *
       * Unset means nothing is wired to an inbox yet: the form still validates
       * and composes, then hands the visitor to their mail client rather than
       * claiming a message was delivered.
       */
      endpoint?: string
    }
  | {
      kind: 'calendly'
      /**
       * A full Calendly scheduling URL, e.g.
       * `https://calendly.com/<handle>/<event>`.
       *
       * Unset means there is no calendar to embed yet, and the section shows the
       * email link rather than framing a dead widget.
       */
      url?: string
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
   * How this job asks to be contacted. Not optional: every pack has to decide,
   * and the union makes the decision explicit rather than leaving the Contact
   * section to infer it from whichever fields happen to be filled in.
   */
  contactChannel: ContactChannel
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
  /** The steps of "how it works", in the order they happen. */
  process: ProcessStep[]
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  education: Education[]
  certifications: Certification[]
  /** Real client quotes. Empty means the section has nothing to show. */
  testimonials: Testimonial[]
}

export type JobMode = 'software' | 'dog'
