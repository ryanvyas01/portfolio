import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile, socials } from '../data/resume'
import { BrandIcon } from './BrandIcon'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    // `overflow-hidden` keeps the portrait's feathered edges from bleeding past
    // the section boundary, and clips the slight lift on hover.
    <section id="top" className="relative overflow-hidden">
      {/*
       * Desktop is a two-column, two-row grid: the portrait takes the left
       * column, the copy the right, and the action row spans both columns along
       * the bottom so it stays pinned to the left edge instead of travelling
       * across with the copy.
       *
       * The copy stays first in the DOM so the heading is still the first thing
       * a screen reader reaches, and `order-*` restores the mobile stacking
       * order (copy, actions, portrait) that the single-column flex layout had.
       */}
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col px-6 pt-32 sm:pt-40 lg:grid lg:min-h-[min(calc(100svh-4rem),860px)] lg:grid-cols-[auto_minmax(0,1fr)] lg:grid-rows-[1fr_auto] lg:items-end lg:gap-x-12 lg:pt-32">
        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:max-w-xl lg:self-center">
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
        </div>

        {/*
         * Left column, lifted a little above the copy's baseline and clear of
         * the action row beneath it — the portrait's lower half is a fading
         * body rather than empty space, so it would otherwise sit on top of the
         * buttons.
         *
         * The extra lift is a relative `top`, not a margin: the portrait is
         * taller than the row it shares with the copy, so a margin would raise
         * the row (and with it the centred copy) instead of just the portrait.
         */}
        <div className="order-3 mt-14 flex justify-center lg:relative lg:order-none lg:col-start-1 lg:row-start-1 lg:-top-10 lg:mt-0 lg:mb-6 lg:self-end">
          <Portrait />
        </div>

        {/*
         * Spans both columns so the buttons keep their full intrinsic width and
         * stay flush with the left edge. The bottom margin is what holds the
         * row at its original height rather than letting it drop to the
         * section's bottom edge.
         */}
        <div className="order-2 mt-10 flex flex-wrap items-center gap-3 lg:order-none lg:col-span-2 lg:row-start-2 lg:mt-0 lg:mb-[187px]">
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
    </section>
  )
}
