/**
 * ============================================================================
 *  EDIT THIS FILE TO MAKE THE SITE YOURS
 * ============================================================================
 *  Every piece of text on the page comes from this file, so you can update
 *  your whole portfolio without touching the components in /src/components.
 *
 *  Anything marked with TODO is placeholder content — swap it for your details.
 */

export type SocialLink = {
  label: string
  href: string
  /** Icon key handled in components/BrandIcon.tsx, or a lucide icon name. */
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

/* -------------------------------------------------------------------------- */
/*  Navigation — one entry per section on the page. Order controls the layout. */
/* -------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/* -------------------------------------------------------------------------- */
/*  Hero + contact details                                                     */
/* -------------------------------------------------------------------------- */

export const profile = {
  // TODO: your name
  name: 'Your Name',
  // TODO: what you do — this is the big line under your name
  title: 'Software Engineer',
  // TODO: one sentence on what you're about
  tagline:
    'I build reliable, user-focused software — from data-heavy backends to polished interfaces.',
  // TODO: where you're based
  location: 'City, State',
  // TODO: your email
  email: 'you@example.com',
  // A short line shown at the top of the Contact section
  availability: 'Open to new opportunities',
  // Drop your PDF in the `public/` folder and reference it here.
  resumeUrl: '/resume.pdf',
}

/** The buttons and links shown in the hero and footer. */
export const socials: SocialLink[] = [
  // TODO: replace with your real profiles (delete any you don't use)
  { label: 'GitHub', href: 'https://github.com/your-username', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-username', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:you@example.com', icon: 'mail' },
]

/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  // Each string becomes its own paragraph.
  paragraphs: [
    "TODO: Write two or three short paragraphs here. This is the 'elevator pitch' version of your resume — who you are, what you've worked on, and what kind of problems you like solving.",
    'A good structure: start with your current role and focus, then mention a couple of things you have shipped or led, and finish with what you are looking for next.',
  ],
  // Quick facts rendered as a small grid beside your bio.
  highlights: [
    { label: 'Years of experience', value: '5+' },
    { label: 'Focus', value: 'Full-stack' },
    { label: 'Based in', value: 'City, ST' },
    { label: 'Availability', value: 'Open to work' },
  ],
}

/* -------------------------------------------------------------------------- */
/*  Experience — most recent first                                             */
/* -------------------------------------------------------------------------- */

export const experience: Experience[] = [
  {
    company: 'Company Name',
    role: 'Senior Software Engineer',
    location: 'City, State',
    start: 'Jan 2023',
    end: 'Present',
    summary: 'One line on your scope and the team you work with.',
    highlights: [
      'Led a project and describe the outcome with a number — e.g. "cut page load time by 40%" or "grew signups 25%".',
      'Explain something you owned end-to-end and the impact it had on users or the business.',
      'Mention collaboration, mentoring, or process improvements you drove.',
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    company: 'Previous Company',
    role: 'Software Engineer',
    location: 'City, State',
    start: 'Jun 2020',
    end: 'Dec 2022',
    summary: 'One line on what the product did and your role in it.',
    highlights: [
      'Describe a feature you shipped and who it helped.',
      'Describe a tricky bug, migration, or performance win you resolved.',
    ],
    tech: ['Python', 'Django', 'React', 'Docker'],
  },
  {
    company: 'First Company',
    role: 'Junior Developer',
    location: 'City, State',
    start: 'Jul 2018',
    end: 'May 2020',
    summary: 'Where you started and what you learned.',
    highlights: [
      'Turn responsibilities into results wherever you can.',
      'It is fine to keep older roles shorter — depth matters more than length.',
    ],
    tech: ['JavaScript', 'HTML/CSS', 'MySQL'],
  },
]

/* -------------------------------------------------------------------------- */
/*  Projects — put your best 2–4 here                                          */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    name: 'Project One',
    description:
      'What it does and who it is for, in a sentence or two. Say the interesting part: the scale, the tricky constraint, or what makes it different.',
    highlights: ['A notable technical decision or a metric worth calling out.'],
    tech: ['React', 'TypeScript', 'Supabase'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/your-username/project-one',
    featured: true,
  },
  {
    name: 'Project Two',
    description:
      'Another thing you built. Side projects, open-source contributions, and work projects all count.',
    tech: ['Node.js', 'PostgreSQL', 'Redis'],
    repoUrl: 'https://github.com/your-username/project-two',
  },
  {
    name: 'Project Three',
    description:
      'If you are light on projects, use this space for a talk you gave, an article you wrote, or a meaningful contribution.',
    tech: ['Python', 'FastAPI'],
    liveUrl: 'https://example.com',
  },
]

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Tooling & Ops',
    items: ['Git', 'Docker', 'CI/CD', 'AWS'],
  },
]

/* -------------------------------------------------------------------------- */
/*  Education & certifications                                                 */
/* -------------------------------------------------------------------------- */

export const education: Education[] = [
  {
    school: 'University Name',
    credential: 'B.S. in Computer Science',
    start: '2014',
    end: '2018',
    details: [
      'Optional: relevant coursework, honors, GPA, or a notable activity.',
    ],
  },
]

export const certifications: Certification[] = [
  // Delete this array's contents if you don't have any yet.
  {
    name: 'Certification Name',
    issuer: 'Issuing Organization',
    year: '2024',
  },
]
