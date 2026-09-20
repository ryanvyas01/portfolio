import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  eyebrow?: string
  description?: string
  children: ReactNode
}

/**
 * Shared wrapper giving every section the same vertical rhythm, a hairline
 * separator, and a consistent heading treatment.
 */
export function Section({ id, title, eyebrow, description, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-neutral-200/80 dark:border-white/[0.07]">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <header className="mb-14 max-w-2xl">
          {eyebrow ? (
            <p className="mb-5 text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase dark:text-neutral-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl text-balance sm:text-4xl">{title}</h2>
          {description ? (
            <p className="mt-5 text-lg text-pretty text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}
