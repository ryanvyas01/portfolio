import type { PortfolioContent } from './types'

/**
 * ============================================================================
 *  DOG TRAINING CONTENT
 * ============================================================================
 *  Written from Ryan's own descriptions of how he trains, who he works with, and
 *  what he offers. Nothing here is inferred — every claim about method,
 *  background, and scope of work came from him directly.
 *
 *  Deliberately absent, and why:
 *  - **No certifications.** Ryan is self-taught, so the Certifications section is
 *    dropped from `enabledSections` AND its data is emptied, rather than leaving
 *    scaffolding behind for a section nobody will ever see.
 *  - **No experience entries.** His background is told in `about` instead, which
 *    is why `experience` is empty and unlisted.
 *  - **No aggression or reactivity work advertised.** Those cases are handled
 *    case-by-case, so listing them as a speciality would overclaim. `skills`
 *    lists only what he said he works with.
 *
 *  Still outstanding:
 *  - `projects` (rendered as "Programs") is the last area of scaffolding. See the
 *    note on it below.
 *  - `testimonials` is empty pending real client quotes. The section exists and
 *    is deliberately not enabled, so it can be switched on the moment there are
 *    quotes rather than needing to be built then.
 *  - `contactChannel.url` needs the Calendly scheduling link. Until it exists the
 *    Contact section shows the email address on its own.
 *
 *  On the portrait: reusing the software headshot is a decision rather than a
 *  leftover placeholder. Swap `photoUrl` when a training photo exists.
 */
export const dogTraining: PortfolioContent = {
  label: 'dog training',

  profile: {
    name: 'Ryan Vyas',
    title: 'Dog Trainer',
    /*
     * Opens on the misunderstanding rather than on the dog, because the whole
     * approach is owner-facing: the problem being solved is the gap between what
     * a dog is communicating and what the owner can read.
     */
    tagline:
      "Most dogs aren't being difficult — they're being misunderstood. I help owners close that gap: reading your dog's body language, understanding how they think, and training from there.",
    location: 'Dallas–Fort Worth, TX',
    email: 'ryanvyasrv@gmail.com',
    photoUrl: '/portrait.png',
    /*
     * No `resumeUrl`, which is optional — leaving it out removes the hero's
     * download button entirely (see Hero.tsx). This page takes bookings, so a CV
     * was the wrong call to action anyway, and the file it pointed at never
     * existed.
     */
  },

  /*
   * Email only, for now. Ryan has no social accounts yet, and a button pointing
   * at nothing is worse than a shorter row — the Contact section shows the
   * address prominently in any case. Adding an entry here is the whole change
   * once Instagram or Facebook exists.
   */
  socials: [{ label: 'Email', href: 'mailto:ryanvyasrv@gmail.com', icon: 'mail' }],

  contactChannel: { kind: 'calendly' },

  /**
   * Membership AND page order. Certifications, Education, Experience, and
   * Testimonials are all absent, so they leave the nav and the page together.
   *
   * The sequence is the argument the page makes: who I am, how I work, what I
   * help with, then the invitation to book. Testimonials belong between
   * Specialties and Programs once there are quotes to show.
   */
  enabledSections: ['about', 'process', 'skills', 'projects', 'contact'],

  navLabels: {
    about: 'About',
    process: 'How it works',
    experience: 'Experience',
    education: 'Certifications',
    skills: 'Specialties',
    testimonials: 'Testimonials',
    projects: 'Programs',
    contact: 'Contact',
  },

  sections: {
    about: { eyebrow: 'About', title: 'My approach' },
    process: {
      eyebrow: 'The process',
      title: 'How it works',
      description: 'From the first conversation to training you can carry on yourself.',
    },
    experience: { eyebrow: 'Experience', title: 'Where I train' },
    education: { eyebrow: 'Certifications', title: 'Certifications & training' },
    skills: {
      eyebrow: 'Specialties',
      title: 'What I help with',
      description: 'Where I can make the biggest difference, and how I work.',
    },
    testimonials: { eyebrow: 'Testimonials', title: 'What owners say' },
    // The one remaining piece of scaffolding on this page — see `projects`.
    projects: {
      eyebrow: 'Programs',
      title: 'TODO: e.g. Training programs',
      description: 'TODO: one line on how your programs are structured.',
    },
    contact: {
      eyebrow: 'Contact',
      /** Ryan's own wording. */
      title: 'Schedule a free consultation today',
      /*
       * Assistant draft, not supplied by Ryan — review before this ships. It
       * promises nothing about format, length, or cost beyond the free
       * consultation the title already states.
       */
      description:
        'Pick a time that suits you and we can talk through what you and your dog need.',
    },
  },

  about: {
    paragraphs: [
      'I started in elementary school, reading everything I could find about dogs and training my own childhood dog. It stayed a hobby for years — friends, family, neighbours — until I moved into a community where almost everyone had a dog. The requests started coming in, and I decided to turn a hobby into something I could offer properly.',
      'The goal is that you finish up understanding your dog, not just following instructions. I will show you what your dog is telling you through their body language, how they think, and how that shapes every decision I make — so you can read the situation yourself and keep the training going long after we are done.',
      'Training is built on positive reinforcement. Dogs do not speak English, so the work is speaking their language instead — building positive associations with the behaviours you want to see, and want your dog to attempt. I find what actually drives your dog, whether that is food or play, and use it to get them engaged. And I hope to leave those same skills with you.',
    ],
    highlights: [
      // A lifetime rather than a figure: Ryan described starting in childhood, so
      // a year count would be invented.
      { label: 'Background', value: 'Since childhood' },
      { label: 'Focus', value: 'Puppies & young dogs' },
      { label: 'Service area', value: 'Dallas–Fort Worth' },
      { label: 'Sessions', value: 'In-home or at my facility' },
    ],
  },

  /*
   * The four steps, in order. Step 4 is the one worth reading closely: it says
   * the hardest part is already behind the dog, so the owner does not have to
   * leave perfect at it. That is the reassuring version of "it is fine if you do
   * not get it", which reads as indifference if written literally.
   */
  process: [
    {
      title: 'We start with your problem',
      description:
        'Not a generic checklist. We begin with what is actually going wrong for you and your dog, in your home and in your situation.',
    },
    {
      title: 'I establish the starting point',
      description:
        'I build the first connections of whatever your dog is learning. That is the hardest part to get going, and the point where a dog crosses from not understanding to understanding.',
    },
    {
      title: 'I show you how I did it',
      description:
        'Each step is explained as I go, so you can see how that first connection was built rather than taking my word for it — and repeat it without me.',
    },
    {
      title: 'You keep the progress either way',
      description:
        'You will not absorb all of it in one session, and you do not need to. The hardest part is already behind your dog, so what you take away is enough to keep building on.',
    },
  ],

  /** Told through `about` instead — the page does not need a role history. */
  experience: [],

  /*
   * STILL TO WRITE, and the only visible scaffolding left on this page.
   *
   * Ryan wants defined programmes rather than a session-based description, but
   * has not settled names, lengths, or pricing. Nothing is invented here for
   * that reason: a programme list is a promise, and the details are his to set.
   *
   * His framing to keep when it is written: training should feel available to
   * everyone. Do not imply that the number of sessions simply "depends on the
   * dog" — that reads as evasive. The tone should be that we will find something
   * that works for you.
   *
   * The free consultation already exists and is the entry point to all of it, so
   * whatever programmes land here should sit underneath it rather than beside it.
   */
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

  /*
   * Specialties, not credentials — which is why this section survives despite
   * there being no certification to list. Everything here is something Ryan said
   * he works on.
   *
   * Aggression and reactivity are deliberately missing: he handles those
   * case-by-case, and advertising them would attract the wrong enquiries.
   */
  skills: [
    {
      category: 'Who I work with',
      items: ['Puppies', 'Young dogs', 'Anxious dogs', 'General training'],
    },
    {
      category: 'What we work on',
      items: ['Foundations', 'Manners', 'Building engagement', 'Body language'],
    },
    {
      category: 'How I train',
      items: ['Positive reinforcement', 'Reading communication', 'In-home or at my facility'],
    },
  ],

  /** Disabled and emptied — there is no certification to list. */
  education: [],
  certifications: [],

  /** Empty until real client quotes exist. Enabling the section is then one edit. */
  testimonials: [],
}
