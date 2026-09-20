import type { PortfolioContent } from './types'

/**
 * ============================================================================
 *  DOG TRAINING CONTENT — PLACEHOLDER, NOT REAL COPY
 * ============================================================================
 *  Every value below is a scaffold. Nothing here is a real claim about Ryan's
 *  dog training experience, credentials, clients, or pricing, and none of it
 *  should ship as-is.
 *
 *  Search for `TODO:` to find every placeholder:
 *
 *      rg "TODO:" src/data/dogTraining.ts
 *
 *  Each TODO states what belongs there. Replace the whole string (including
 *  the `TODO:` marker) with real copy.
 *
 *  Note: `photoUrl` intentionally reuses the software portrait for now.
 *  Point it at a dog-training photo when one exists.
 */
export const dogTraining: PortfolioContent = {
  label: 'dog training',

  profile: {
    name: 'Ryan Vyas',
    title: 'TODO: e.g. Dog Trainer & Behaviour Specialist',
    tagline:
      'TODO: one or two sentences on your training philosophy and the outcome owners get. This is the first thing a visitor reads.',
    location: 'Dallas–Fort Worth, TX',
    email: 'ryanvyasrv@gmail.com',
    /** Reusing the software portrait for now — swap for a training photo. */
    photoUrl: '/portrait.png',
    /** TODO: add a dog-training PDF as public/dog-training-services.pdf, or drop the button. */
    resumeUrl: '/dog-training-services.pdf',
  },

  // TODO: replace with the dog training business's real links.
  socials: [
    {
      label: 'TODO: Instagram',
      href: 'https://example.com/todo-instagram',
      icon: 'website',
    },
    {
      label: 'TODO: Facebook',
      href: 'https://example.com/todo-facebook',
      icon: 'website',
    },
    { label: 'Email', href: 'mailto:ryanvyasrv@gmail.com', icon: 'mail' },
  ],

  /**
   * The trainer page drops Education and Skills entirely: it has no
   * certifications or speciality list to show. Removing them here takes them
   * out of both the nav and the page.
   */
  enabledSections: ['about', 'experience', 'projects', 'contact'],

  /**
   * Nav wording for this job. Section ids and ordering are shared, so the page
   * keeps the same structure — only the labels change.
   */
  navLabels: {
    about: 'About',
    experience: 'Experience',
    education: 'Certifications',
    skills: 'Specialties',
    projects: 'Programs',
    contact: 'Contact',
  },

  sections: {
    about: {
      eyebrow: 'About',
      title: 'TODO: e.g. Meet your trainer',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'TODO: e.g. Where I train',
      description: 'TODO: one line framing this list, e.g. how long you have trained and who you work with.',
    },
    education: {
      eyebrow: 'Certifications',
      title: 'TODO: e.g. Certifications & training',
    },
    skills: {
      eyebrow: 'Specialties',
      title: 'TODO: e.g. Areas of expertise',
      description: 'TODO: one line on what you are best at.',
    },
    projects: {
      eyebrow: 'Programs',
      title: 'TODO: e.g. Training programs',
      description: 'TODO: one line on how your programs are structured.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'TODO: e.g. Book an assessment',
      description: 'TODO: one line on how to get started and what happens next.',
    },
  },

  about: {
    paragraphs: [
      'TODO: how you got into training dogs, and the approach you take. Two to three sentences.',
      'TODO: what a session with you looks like, and what owners should expect to do between sessions.',
      'TODO: your credentials or philosophy on methods — be specific about the training methods you use and avoid.',
    ],
    highlights: [
      { label: 'TODO: e.g. Experience', value: 'TODO: e.g. 5 years' },
      { label: 'TODO: e.g. Speciality', value: 'TODO: e.g. reactivity' },
      { label: 'TODO: e.g. Service area', value: 'TODO: e.g. DFW metroplex' },
      { label: 'TODO: e.g. Certification', value: 'TODO: e.g. CPDT-KA' },
    ],
  },

  // TODO: replace with real training experience (roles, apprenticeships, kennels,
  // rescues, or your own practice). Duplicate entries as needed.
  experience: [
    {
      company: 'TODO: organisation or "Self-employed"',
      role: 'TODO: your title there',
      location: 'TODO: city, ST',
      employmentType: 'TODO: e.g. Full-time · In-person',
      start: 'TODO: Mon YYYY',
      end: 'TODO: Mon YYYY or Present',
      summary: 'TODO: one line on what this role involved.',
      highlights: [
        'TODO: a concrete result, e.g. number of dogs trained or a notable outcome.',
        'TODO: a second concrete result, ideally with a number in it.',
        'TODO: a third concrete result, or delete this entry.',
      ],
      tech: ['TODO: method one', 'TODO: method two', 'TODO: certification'],
    },
    {
      company: 'TODO: second organisation, or delete this entry',
      role: 'TODO: your title there',
      location: 'TODO: city, ST',
      employmentType: 'TODO: e.g. Contract · In-person',
      start: 'TODO: Mon YYYY',
      end: 'TODO: Mon YYYY',
      summary: 'TODO: one line on what this role involved.',
      highlights: [
        'TODO: a concrete result from this role.',
        'TODO: a second concrete result, or delete this entry.',
      ],
      tech: ['TODO: method one', 'TODO: method two'],
    },
  ],

  // Rendered as "Training programs" in the nav's Projects slot.
  // TODO: replace with your real programs and pricing.
  projects: [
    {
      name: 'TODO: Program name, e.g. Puppy Foundations',
      period: 'TODO: e.g. 6 weeks',
      description: 'TODO: what this program covers and who it is for.',
      highlights: [
        'TODO: what the dog learns in this program.',
        'TODO: what the owner learns, or the format (in-person, group, etc.).',
      ],
      tech: ['TODO: e.g. Puppy', 'TODO: e.g. Group'],
      featured: true,
    },
    {
      name: 'TODO: Second program name',
      period: 'TODO: e.g. 4 sessions',
      description: 'TODO: what this program covers and who it is for.',
      highlights: ['TODO: what the dog learns.', 'TODO: format and duration.'],
      tech: ['TODO'],
    },
    {
      name: 'TODO: Third program name',
      period: 'TODO: e.g. Ongoing',
      description: 'TODO: what this program covers and who it is for.',
      highlights: ['TODO: what the dog learns.', 'TODO: format and duration.'],
      tech: ['TODO'],
    },
  ],

  // TODO: replace with real specialties.
  skills: [
    {
      category: 'TODO: e.g. Training methods',
      items: [
        'TODO: method one',
        'TODO: method two',
        'TODO: method three',
        'TODO: method four',
      ],
    },
    {
      category: 'TODO: e.g. Behaviour issues',
      items: ['TODO: issue one', 'TODO: issue two', 'TODO: issue three'],
    },
    {
      category: 'TODO: e.g. Dogs I work with',
      items: [
        'TODO: dog type one',
        'TODO: dog type two',
        'TODO: dog type three',
        'TODO: dog type four',
      ],
    },
    {
      category: 'TODO: e.g. Formats',
      items: ['TODO: format one', 'TODO: format two', 'TODO: format three'],
    },
  ],

  // TODO: replace with real qualifications. Do not list a certification you do
  // not hold.
  education: [
    {
      school: 'TODO: school or certifying body',
      credential: 'TODO: credential or course name',
      field: 'TODO: optional focus area',
      start: 'TODO: Mon YYYY',
      end: 'TODO: Mon YYYY',
      details: ['TODO: anything notable about this qualification.'],
    },
  ],

  // TODO: replace with real certifications, or empty the array to hide the column.
  certifications: [
    {
      name: 'TODO: certification name',
      issuer: 'TODO: issuing body',
      year: 'TODO',
    },
    {
      name: 'TODO: second certification, or delete',
      issuer: 'TODO: issuing body',
      year: 'TODO',
    },
  ],
}
