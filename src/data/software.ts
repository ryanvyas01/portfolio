import type { PortfolioContent } from './types'

/**
 * The software engineering portfolio.
 *
 * Sourced from linkedin.com/in/ryan-vyas-uint16. Light edits only: em dashes,
 * contact details moved into the Contact section, and LinkedIn's "... more"
 * truncation markers removed. Nothing was invented.
 */
export const software: PortfolioContent = {
  label: 'software engineering',

  profile: {
    name: 'Ryan Vyas',
    title: 'AI Software Engineer',
    tagline:
      'Proactive engineer with a strong focus on business needs — I refactor legacy codebases, ship new products, and deliver long-term fixes for mission-critical problems.',
    location: 'Dallas–Fort Worth, TX',
    email: 'ryanvyasrv@gmail.com',
    photoUrl: '/portrait.png',
    resumeUrl: '/resume.pdf',
  },

  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/ryanvyas01',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ryan-vyas-uint16/',
      icon: 'linkedin',
    },
    { label: 'Email', href: 'mailto:ryanvyasrv@gmail.com', icon: 'mail' },
  ],

  /**
   * A message rather than a booking: this is the portfolio that takes enquiries
   * and there is nothing to schedule.
   *
   * `endpoint` is deliberately unset for now — see ContactChannel in types.ts.
   * Dropping a Formspree URL in here is the entire switch; nothing else changes.
   */
  contactChannel: { kind: 'form' },

  /*
   * Headings are exhaustive across every section id, not just the six this job
   * shows. `process` and `testimonials` are worded here even though the software
   * page does not render them, so that every pack is a complete description of
   * the site and adding a section is a one-pack change rather than two.
   */
  sections: {
    about: { eyebrow: 'About', title: 'A little about me' },
    process: {
      eyebrow: 'Process',
      title: 'How I work',
      description: 'Not shown here — this portfolio leads with the work itself.',
    },
    experience: {
      eyebrow: 'Experience',
      title: "Where I've worked",
      description: 'The roles that shaped how I build software, most recent first.',
    },
    education: { eyebrow: 'Education', title: 'Education & certifications' },
    skills: {
      eyebrow: 'Skills',
      title: 'What I work with',
      description: 'Tools and technologies I reach for most often.',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What people say',
      description: 'Not shown here.',
    },
    projects: {
      eyebrow: 'Projects',
      title: "Things I've built",
      description:
        'A selection of work that shows how I think about problems and ship solutions.',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's work together",
      description: "I'm always happy to talk about new roles, projects, or interesting problems.",
    },
  },

  navLabels: {
    about: 'About',
    process: 'Process',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    testimonials: 'Testimonials',
    projects: 'Projects',
    contact: 'Contact',
  },

  /** The software portfolio shows every section. */
  enabledSections: ['about', 'experience', 'education', 'skills', 'projects', 'contact'],

  about: {
    paragraphs: [
      "Got products with existing and incoming bugs you can't seem to get away from? Get in touch — let's fix them and make your users happy.",
      'Proactive engineer with a strong focus on business needs. Proven track record of delivering new products prioritizing the user experience to drive sales and customer acquisition. I pride myself on delivering long-term solutions for mission critical, time sensitive issues.',
      'Experienced in working with and refactoring legacy code bases to address system design issues, streamline development, and future-proof performance and maintainability — as well as leading teams, cross-module projects, and architecting solutions.',
    ],
    highlights: [
      { label: 'Experience', value: '3+ years' },
      { label: 'Focus', value: 'AI & full-stack' },
      { label: 'Based in', value: 'Dallas–Fort Worth, TX' },
      { label: 'Education', value: 'UT Austin' },
    ],
  },

  /*
   * Empty rather than absent, because these sections belong to the trainer page.
   * A process list would only restate what the experience entries already show,
   * and there are no client quotes to publish here.
   */
  process: [],

  experience: [
    {
      company: 'Ziosk',
      role: 'AI Software Engineer',
      location: 'Plano, TX',
      employmentType: 'Full-time · Hybrid',
      start: 'Jun 2026',
      end: 'Present',
      summary:
        'Owns production across the stack — React Native and legacy C++ on the tablet front end, C# in the payments backend.',
      highlights: [
        'Own critical production across the stack, from React Native / legacy C++ frontend to a C# payments backend — incidents plus product work.',
        'Enabled E2E regression test generation for tablets using a proprietary OpenGL C++ renderer by building a compatibility layer into the engine for Appium, then building an MCP server for AI to control Appium and finally utilizing the agentic system to generate repeatable E2E scripts.',
        'Serve on an AI Integration POD with executives and stakeholders to turn AI-first initiatives into shared agentic skills, projects, and systems other teams actually run.',
      ],
      tech: ['React Native', 'C++', 'C#', 'OpenGL', 'Appium', 'MCP'],
    },
    {
      company: 'Ziosk',
      role: 'Software Engineer',
      location: 'Plano, TX',
      employmentType: 'Full-time · Hybrid',
      start: 'Jan 2026',
      end: 'Jun 2026',
      summary:
        'First role at Ziosk, split between production support and the next-generation React Native tablet client.',
      highlights: [
        'Cut first-line triage for solutions engineering from days to hours by shipping an agentic RAG system and tooling that pulls JIRA and multi-repo context, locating the failing layer, and routing the issue to the owning team.',
        "Resolved critical and longstanding production issues for Olive Garden, Chili's, Outback, and other brands in a legacy proprietary C++ / OpenGL Android rendering engine while contributing to the next-gen React Native replacement.",
      ],
      tech: ['C++', 'C#', 'React Native', 'RAG', 'JIRA'],
    },
    {
      company: 'Paycom',
      role: 'Software Developer IV',
      location: 'Grapevine, TX',
      employmentType: 'Full-time · On-site',
      start: 'Jan 2025',
      end: 'Jan 2026',
      summary:
        'Payroll platform work across a large legacy codebase, plus new international payroll products.',
      highlights: [
        "Restored workers' compensation data across 10M+ records in one week by fixing the broken web-app writer and shipping a PHP restore that generated SQL from system conditions and legal rules, collision-safe, until records were correct.",
        'Designed and shipped new payroll product with stakeholders — including Ireland tax/payroll via a C# REST API, RabbitMQ, Docker, and Kubernetes.',
        'Delivered application-wide internationalization by defining the shared pattern and mentoring junior engineers for implementation.',
      ],
      tech: ['C#', 'PHP', 'SQL Server', 'REST APIs', 'RabbitMQ', 'Docker', 'Kubernetes'],
    },
    {
      company: 'Paycom',
      role: 'Software Developer III',
      location: 'Grapevine, TX',
      employmentType: 'Full-time · On-site',
      start: 'Jan 2024',
      end: 'Dec 2024',
      summary: "Payroll feature delivery for Paycom's international expansion.",
      highlights: [
        'Unblocked Paycom expansion into GB, IE, and CA by designing and shipping new payroll features end-to-end — React/TypeScript UI, PHP services, SQL Server, REST APIs with JWT and OpenAPI/Swagger.',
        'Migrated legacy script-based PHP to MVC and a React frontend (HTML5, CSS) to improve scalability for that payroll work.',
        'Owned critical production incidents from ticket to lasting fix in the web app and backend, so the same failure class did not bounce back through the queue.',
      ],
      tech: ['React', 'TypeScript', 'PHP', 'SQL Server', 'REST APIs', 'JWT', 'OpenAPI'],
    },
    {
      company: 'Aristocrat',
      role: 'Software Engineer',
      location: 'Austin, TX',
      employmentType: 'Contract · On-site',
      start: 'May 2023',
      end: 'Oct 2023',
      summary:
        'Contract role on internal tooling and build infrastructure for game asset pipelines.',
      highlights: [
        'Cut asset-review feedback from 14 days to real time by building a C++ plugin that visualized game assets inside Adobe After Effects instead of waiting on a full review cycle.',
        'Halved the size of 100,000+ game assets by shipping a custom texture-optimization algorithm in Node.js.',
        'Reduced testing time from hours to minutes by implementing a Jenkins CI/CD pipeline that automated build and test for multiple software tools.',
      ],
      tech: ['C++', 'JavaScript', 'Node.js', 'Jenkins', 'CI/CD'],
    },
  ],

  projects: [
    {
      name: 'CCTV Violence Detector',
      period: 'Nov 2022 – Dec 2022',
      description:
        'An AI-driven program capable of detecting violence within video footage for CCTV applications, built around a custom ensemble classifier.',
      highlights: [
        'Reduced hardware load by 70% through data processing and feature extraction.',
        'Created a custom ensemble method to classify videos, combining the strengths of XGBoost, CLIP, and RNNs.',
        'Achieved high accuracy in detecting violent scenes with an AUC of 0.91.',
      ],
      tech: ['Python', 'XGBoost', 'CLIP', 'RNN', 'Pandas', 'SciKit'],
      featured: true,
    },
    {
      name: 'Omega Optics COVID-19 Biosensor',
      period: 'Aug 2021 – May 2022',
      description:
        'An operating system for a COVID-19 biosensor — controlling the hardware and displaying readings through a Python and PyQt interface.',
      highlights: [
        'Designed and developed a user-friendly OS for controlling the biosensor and displaying data using Python and PyQt.',
        'Led weekly meetings and collaborated with a cross-functional team of hardware engineers, PhD biology and optics students to bring the project from concept to deployment.',
        'Enhanced COVID detection by reducing data noise by 50% using Pandas and SciPy.',
        'Implemented a serial communication protocol to control hardware and retrieve sensor readings.',
        'Designed and executed software testing strategies to ensure the reliability of the system.',
      ],
      tech: ['Python', 'PyQt', 'Pandas', 'SciPy', 'Linux'],
    },
    {
      name: 'Monolith',
      period: 'Aug 2021 – Dec 2021',
      description:
        'A hardware-as-a-service web platform letting customers reserve products on demand, built with a small team using agile methodology.',
      highlights: [
        'Utilized frameworks and tools such as Flask, Bootstrap, and MongoDB to build an online service allowing customers to reserve products on demand.',
        "Implemented JSON tokens for user accounts, greatly improving the website's security.",
        'Conducted and contributed to the code review process to ensure high-quality code.',
        'Worked within a team of developers utilizing agile methodology to ensure timely delivery and requirement satisfaction.',
      ],
      tech: ['Flask', 'Python', 'JavaScript', 'Bootstrap', 'MongoDB'],
    },
    {
      name: 'Simple Bidder',
      period: 'Nov 2020 – Dec 2020',
      description:
        'A scalable client-server solution for hosting auctions, supporting hundreds of simultaneous bidders.',
      highlights: [
        'Built a scalable client-server software solution for hosting auctions using Java.',
        'Implemented multithreading to allow hundreds of clients to connect and bid simultaneously.',
        'Employed the observer design pattern to facilitate real-time updates for all connected clients.',
        'Designed a user-friendly interface that provides clients with easy access to available items and bids.',
        'Conducted extensive JUnit testing to ensure program functionality and eliminate bugs.',
      ],
      tech: ['Java', 'JavaFX', 'Java.net', 'Multithreading', 'JUnit'],
    },
  ],

  skills: [
    {
      category: 'Languages',
      items: ['C++', 'C#', 'C', 'Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'SQL', 'Kotlin'],
    },
    {
      category: 'Frontend',
      items: ['React Native', 'React.js', 'HTML5', 'CSS', 'Bootstrap'],
    },
    {
      category: 'Backend & APIs',
      items: ['.NET', 'Node.js', 'Flask', 'GraphQL', 'Java.net'],
    },
    {
      category: 'Databases',
      items: ['SQL Server', 'MySQL', 'MongoDB'],
    },
    {
      category: 'AI & Data Science',
      items: ['Keras', 'SciKit', 'Pandas', 'SciPy'],
    },
    {
      category: 'Cloud, DevOps & Tools',
      items: [
        'Microsoft Azure',
        'Docker',
        'Kubernetes',
        'CI/CD',
        'Git',
        'Linux',
        'JavaFX',
        'PyQt',
        'VS Code',
        'IntelliJ IDEA',
        'Eclipse',
      ],
    },
    {
      category: 'Strengths',
      items: [
        'Problem Solving',
        'Team Leadership',
        'Team Management',
        'Communication',
        'Multithreading',
      ],
    },
  ],

  education: [
    {
      school: 'The University of Texas at Austin',
      credential: 'B.S. in Electrical and Computer Engineering',
      field: 'Cockrell School of Engineering',
      start: 'Aug 2018',
      end: 'May 2023',
      details: ['Activities and societies: E-nable, NSBE.'],
    },
  ],

  certifications: [
    {
      name: 'Confluence Fundamentals Badge',
      issuer: 'Aristocrat Gaming',
      year: '2023',
    },
    {
      name: 'Jira Fundamentals Badge',
      issuer: 'Aristocrat Gaming',
      year: '2023',
    },
  ],

  /** No client quotes supplied for this portfolio. */
  testimonials: [],
}
