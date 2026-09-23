import { usePortfolio } from './portfolioContext'
import { Section } from './Section'

/**
 * The steps of working together, in order.
 *
 * An ordered list rather than a row of cards, because the sequence is the point:
 * this section exists to explain that the first session starts by understanding
 * the owner's problem and ends with the dog already over the hardest part. A
 * numberless grid of the same four sentences would read as a feature list.
 *
 * Renders nothing when the pack supplies no steps, rather than an empty frame —
 * the section is only worth a heading if it has something to say.
 */
export function Process() {
  const { content } = usePortfolio()
  // Renamed on destructure so the identifier never shadows the global `process`.
  const { process: steps, sections } = content

  if (steps.length === 0) {
    return null
  }

  return (
    <Section
      id="process"
      eyebrow={sections.process.eyebrow}
      title={sections.process.title}
      description={sections.process.description}
    >
      {/* The same hairline-grid treatment as Skills, so the two read as siblings. */}
      <ol className="grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2 dark:border-white/[0.09] dark:bg-white/[0.09]">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-neutral-50 p-6 sm:p-8 dark:bg-neutral-950">
            <p className="text-xs tracking-[0.12em] text-neutral-500 uppercase">
              Step {index + 1}
            </p>
            <h3 className="mt-3 text-lg text-balance text-neutral-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-pretty text-neutral-600 dark:text-neutral-400">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
