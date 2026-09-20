import { Mail, MapPin } from 'lucide-react'
import { profile, socials } from '../data/resume'
import { BrandIcon } from './BrandIcon'
import { Section } from './Section'

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's work together"
      description="I'm always happy to talk about new roles, projects, or interesting problems. The fastest way to reach me is email."
    >
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-8 sm:p-10 dark:border-slate-800 dark:bg-slate-900/40">
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-3 text-xl font-semibold text-slate-900 transition-colors hover:text-indigo-600 sm:text-2xl dark:text-white dark:hover:text-indigo-400"
        >
          <Mail
            className="h-6 w-6 shrink-0 text-indigo-600 dark:text-indigo-400"
            aria-hidden="true"
          />
          {profile.email}
        </a>

        <p className="mt-4 flex items-center gap-2 text-slate-500 dark:text-slate-500">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {profile.location}
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900"
              >
                <BrandIcon name={social.icon} className="h-4 w-4" />
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
