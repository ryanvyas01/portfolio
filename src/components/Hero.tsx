import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile, socials } from '../data/resume'
import { BrandIcon } from './BrandIcon'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {profile.availability}
        </p>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          {profile.name}
        </h1>

        <p className="mt-4 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl dark:from-indigo-400 dark:to-violet-400">
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
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
    </section>
  )
}
