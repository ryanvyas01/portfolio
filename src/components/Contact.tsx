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
      description="I'm always happy to talk about new roles, projects, or interesting problems."
    >
      <div className="surface rounded-lg p-8 sm:p-10">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-baseline gap-3 text-xl tracking-tight text-neutral-900 transition-opacity hover:opacity-70 sm:text-2xl dark:text-white"
        >
          <Mail
            className="h-5 w-5 shrink-0 translate-y-0.5 text-neutral-400"
            aria-hidden="true"
          />
          {profile.email}
        </a>

        <p className="mt-5 flex items-center gap-2 text-sm text-neutral-500">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {profile.location}
        </p>

        <ul className="mt-9 flex flex-wrap gap-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/[0.06]"
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
