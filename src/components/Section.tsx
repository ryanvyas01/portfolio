import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  eyebrow?: string
  description?: string
  children: ReactNode
}

/**
 * Shared wrapper that gives every section the same spacing and heading style.
 */
export function Section({ id, title, eyebrow, description, children }: SectionProps) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12">
          {eyebrow ? (
            <p className="mb-3 text-sm font-semibold tracking-widest text-accent-600 uppercase dark:text-accent-400">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {title}
          </h2>
          <div
            aria-hidden="true"
            className="mt-4 h-1 w-12 rounded-full bg-accent-600 dark:bg-accent-400"
          />
          {description ? (
            <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}
