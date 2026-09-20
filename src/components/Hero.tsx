import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile, socials } from '../data/resume'
import { BrandIcon } from './BrandIcon'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    <section id="top" className="pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col-reverse items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-4xl leading-[1.05] text-balance sm:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-5 text-xl text-neutral-500 sm:text-2xl dark:text-neutral-400">
              {profile.title}
            </p>

            <p className="mt-8 max-w-xl text-lg text-pretty text-neutral-600 dark:text-neutral-400">
              {profile.tagline}
            </p>

            <p className="mt-6 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 dark:bg-white dark:text-neutral-900"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white/[0.06]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download résumé
              </a>

              <ul className="flex items-center gap-0.5 sm:ml-1">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
                    >
                      <BrandIcon name={social.icon} className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Portrait />
        </div>
      </div>
    </section>
  )
}
