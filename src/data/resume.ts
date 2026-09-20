/**
 * ============================================================================
 *  SITE CONTENT — EDIT THIS FILE TO MAKE THE SITE YOURS
 * ============================================================================
 *  Every piece of text on the page comes from this file, so you can update
 *  your whole portfolio without touching the components in /src/components.
 *
 *  !! CURRENT STATE: PLACEHOLDER COPY !!
 *  This is realistic filler written to show off the layout while we develop
 *  the look and feel. The name is real; the jobs, projects, metrics, and
 *  dates are invented. Replace them before this goes anywhere public.
 */

export type SocialLink = {
  label: string
  href: string
  /** Icon key handled in components/BrandIcon.tsx. */
  icon: 'github' | 'linkedin' | 'x' | 'mail' | 'website'
}

export type NavItem = {
  id: string
  label: string
}

export type Experience = {
  company: string
  role: string
  location?: string
  start: string
  end: string
  summary?: string
  highlights: string[]
  tech?: string[]
}

export type Project = {
  name: string
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

export type Testimonial = {
  quote: string
  name: string
  title: string
}

/* -------------------------------------------------------------------------- */
/*  Navigation — one entry per section on the page. Order controls the layout. */
/* -------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

/* -------------------------------------------------------------------------- */
/*  Hero + contact details                                                     */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Ryan Vyas',
  title: 'Senior Software Engineer',
  tagline:
    'I design and build systems that stay fast and correct under real-world load — from event-driven backends to interfaces people actually enjoy using.',
  location: 'Chicago, IL',
  email: 'ryan@example.com',
  availability: 'Open to new opportunities',
  /** Drop your PDF in `public/` and reference it here. */
  resumeUrl: '/resume.pdf',
}

/** The buttons and links shown in the hero and contact sections. */
export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/your-username', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ryan-vyas-uint16/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:ryan@example.com', icon: 'mail' },
]

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  /** Each string becomes its own paragraph. */
  paragraphs: [
    'I am a software engineer with eight years of experience building products across fintech and developer tooling. These days I spend most of my time on the boundary between backend systems and the people who use them — designing APIs, untangling data models, and making sure the interface tells the truth about what is happening underneath.',
    'I have led projects from first sketch to production, mentored engineers through their first on-call rotations, and spent more than one long night chasing a memory leak that turned out to be a cache key collision. I care about systems that are boring in the best way: predictable, observable, and easy for the next person to change.',
    'Outside of work I write about debugging, contribute to a couple of small open-source libraries, and am slowly teaching myself hardware by breaking inexpensive microcontrollers.',
  ],
  /** Quick facts rendered as a small grid beside your bio. */
  highlights: [
    { label: 'Years of experience', value: '8' },
    { label: 'Focus', value: 'Backend & platform' },
    { label: 'Based in', value: 'Chicago, IL' },
    { label: 'Availability', value: 'Open to work' },
  ],
}

/* -------------------------------------------------------------------------- */
/*  Experience — most recent first                                             */
/* -------------------------------------------------------------------------- */

export const experience: Experience[] = [
  {
    company: 'Northwind Labs',
    role: 'Senior Software Engineer',
    location: 'Chicago, IL',
    start: 'Mar 2022',
    end: 'Present',
    summary:
      'Payments platform team of six, owning the ledger and the services that move money between accounts.',
    highlights: [
      'Re-architected the double-entry ledger onto an append-only event log, cutting reconciliation failures by 94% and making every balance auditable back to its originating transaction.',
      'Drove a migration of 40+ services onto a shared typed API layer, which removed an entire class of serialization bugs and cut new-endpoint setup from days to under an hour.',
      'Cut p99 checkout latency from 840ms to 210ms by profiling and eliminating a chatty fan-out, then adding read-through caching for the hot path.',
      'Mentored two engineers through their first year, both of whom now lead their own service areas.',
    ],
    tech: ['TypeScript', 'Go', 'PostgreSQL', 'Kafka', 'AWS', 'Kubernetes'],
  },
  {
    company: 'Meridian Analytics',
    role: 'Software Engineer',
    location: 'Remote',
    start: 'Aug 2019',
    end: 'Feb 2022',
    summary:
      'First backend hire on a product that turned messy customer event data into reports non-technical teams could trust.',
    highlights: [
      'Built the ingestion pipeline that processed 200M+ events per day, with backpressure and replay so a bad deploy could be undone without data loss.',
      'Designed the query layer that powered the reporting UI, translating a visual query builder into safe, parameterized SQL.',
      'Introduced integration testing against a real Postgres instance in CI, dropping production incidents from roughly monthly to none over two quarters.',
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'GCP'],
  },
  {
    company: 'Brightpath Software',
    role: 'Software Developer',
    location: 'Chicago, IL',
    start: 'Jul 2017',
    end: 'Jul 2019',
    summary:
      'Agency work across a dozen client projects, from scheduling tools for a clinic network to an internal inventory system.',
    highlights: [
      'Shipped a patient scheduling app used daily by 300+ staff across eleven clinics.',
      'Learned to scope ruthlessly: the first version went live in six weeks by cutting everything that was not the appointment itself.',
    ],
    tech: ['JavaScript', 'React', 'Node.js', 'MySQL'],
  },
  {
    company: 'TechBridge Fellowship',
    role: 'Software Engineering Fellow',
    location: 'Chicago, IL',
    start: 'Jan 2017',
    end: 'Jun 2017',
    summary: 'Intensive full-time program covering computer science fundamentals and applied web development.',
    highlights: [
      'Built and presented four projects, including a peer-to-peer code review tool.',
      'Stayed on as a part-time mentor for the following two cohorts.',
    ],
    tech: ['JavaScript', 'Ruby on Rails', 'SQL'],
  },
]

/* -------------------------------------------------------------------------- */
/*  Projects — your best 2–4                                                   */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    name: 'Backpressure',
    description:
      'An open-source toolkit for testing how backend services behave when a dependency becomes slow instead of failing outright. Most resilience testing punishes hard failures; the failures that actually take systems down are the slow, partial ones.',
    highlights: [
      'Adopted by several teams testing payment and notification pipelines in staging.',
      'Ships as a lightweight middleware with adapters for Express, Fastify, and plain Node servers.',
    ],
    tech: ['TypeScript', 'Node.js', 'Vitest'],
    repoUrl: 'https://github.com/your-username/backpressure',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    name: 'Ledger Explainer',
    description:
      'A small tool that takes any double-entry transaction log and renders it as an interactive narrative, so a support engineer can answer "where did this money actually go?" without pulling in an accountant.',
    highlights: [
      'Handles multi-currency settlements and partial reversals.',
      'Reduced one team\'s time-to-diagnosis on balance disputes from hours to minutes.',
    ],
    tech: ['React', 'TypeScript', 'D3', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/your-username/ledger-explainer',
  },
  {
    name: 'Static Site Starter',
    description:
      'A deliberately opinionated starter template for documentation sites and personal blogs, tuned for fast loads and no layout shift. Born out of rebuilding a corporate docs site that had somehow reached four megabytes of JavaScript.',
    tech: ['Astro', 'Tailwind CSS', 'TypeScript'],
    repoUrl: 'https://github.com/your-username/site-starter',
  },
  {
    name: 'uint16.dev',
    description:
      'A technical blog about debugging, performance work, and the unglamorous parts of maintaining software. The most-read post is still the one about the cache key collision.',
    tech: ['Astro', 'MDX'],
    liveUrl: 'https://example.com',
  },
]

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'Go', 'Python', 'SQL', 'JavaScript'],
  },
  {
    category: 'Backend & Data',
    items: [
      'Node.js',
      'PostgreSQL',
      'Kafka',
      'Redis',
      'REST APIs',
      'Event sourcing',
    ],
  },
  {
    category: 'Frontend',
    items: ['React', 'Tailwind CSS', 'Vite', 'Accessibility', 'D3'],
  },
  {
    category: 'Infrastructure',
    items: [
      'AWS',
      'Kubernetes',
      'Docker',
      'Terraform',
      'GitHub Actions',
      'Observability',
    ],
  },
  {
    category: 'Practices',
    items: [
      'System design',
      'Code review',
      'Mentoring',
      'Incident response',
      'Technical writing',
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Education & certifications                                                 */
/* -------------------------------------------------------------------------- */

export const education: Education[] = [
  {
    school: 'University of Illinois at Chicago',
    credential: 'B.S. in Computer Science',
    start: '2013',
    end: '2017',
    details: [
      'Minor in Mathematics. Coursework in distributed systems, databases, and compilers.',
      'Teaching assistant for the introductory data structures course for three semesters.',
    ],
  },
]

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
  },
  {
    name: 'Certified Kubernetes Application Developer',
    issuer: 'Cloud Native Computing Foundation',
    year: '2023',
  },
]

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      'Ryan has a rare instinct for finding the one design decision that everything else hinges on. He rewrote our ledger approach and quietly made two years of accumulated workarounds unnecessary.',
    name: 'Dana Whitfield',
    title: 'Engineering Manager, Northwind Labs',
  },
  {
    quote:
      'He is the person I go to when something is wrong and nobody can explain why. Ryan reads a stack trace the way other people read a map.',
    name: 'Marcus Iyer',
    title: 'Staff Engineer, Meridian Analytics',
  },
  {
    quote:
      'The most patient mentor I have had. He never just handed me the answer, but he also never let me flounder for longer than I needed to.',
    name: 'Priya Raman',
    title: 'Software Engineer, Northwind Labs',
  },
]
