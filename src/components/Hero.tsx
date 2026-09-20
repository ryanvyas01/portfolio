import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile, socials } from '../data/resume'
import { BrandIcon } from './BrandIcon'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/15" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              {profile.name}
            </h1>

            <p className="mt-4 bg-gradient-to-r from-accent-700 to-accent-500 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl dark:from-accent-300 dark:to-accent-500">
              {profile.title}
            </p>

            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {profile.tagline}
            </p>

            <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download résumé
              </a>

              <ul className="flex items-center gap-1 sm:ml-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
                    >
                      <BrandIcon name={social.icon} />
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
