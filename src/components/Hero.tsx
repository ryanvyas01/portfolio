import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile, socials } from '../data/resume'
import { BrandIcon } from './BrandIcon'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    // `overflow-hidden` clips the portrait as it drifts down, so the subject
    // appears to sink behind the section edge rather than spilling over it.
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col px-6 pt-32 sm:pt-40 lg:min-h-[min(calc(100svh-4rem),860px)] lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pt-32">
        {/*
         * Two columns on desktop rather than a vertical stack: stacking put the
         * portrait below the fold on shorter screens and left a large void
         * between the copy and the image. Side by side, the copy centres itself
         * while the portrait stays flush to the bottom edge.
         */}
        <div className="lg:max-w-xl lg:self-center">
          <h1 className="text-4xl leading-[1.05] text-balance sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-5 text-xl text-neutral-500 sm:text-2xl dark:text-neutral-400">
            {profile.title}
          </p>

          <p className="mt-8 max-w-xl text-lg text-pretty text-neutral-600 dark:text-neutral-400">
            {profile.tagline}
          </p>

          <p className="mt-6 flex items-center gap-2 text-sm text-neutral-500">
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

        {/* Anchored to the bottom edge so the shoulder cut meets the section divider. */}
        <div className="mt-14 flex justify-center lg:mt-0 lg:shrink-0">
          <Portrait />
        </div>
      </div>
    </section>
  )
}
