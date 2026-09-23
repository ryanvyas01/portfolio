import { usePortfolio } from './portfolioContext'
import { Section } from './Section'

/**
 * What clients have said, in their own words.
 *
 * `figure` with a `blockquote` and `figcaption` rather than styled divs, because
 * a testimonial is a quotation with an attribution and the semantics say so —
 * screen readers announce the caption as belonging to the quote.
 *
 * Renders nothing when there are no quotes. That is deliberate and it is the
 * normal state for the software portfolio, which has none: the alternative is a
 * heading over an empty grid, or worse, a quote nobody actually said. A
 * testimonial is evidence, and evidence that was invented is worth less than no
 * evidence at all.
 */
export function Testimonials() {
  const { content } = usePortfolio()
  const { testimonials, sections } = content

  if (testimonials.length === 0) {
    return null
  }

  return (
    <Section
      id="testimonials"
      eyebrow={sections.testimonials.eyebrow}
      title={sections.testimonials.title}
      description={sections.testimonials.description}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <figure
            key={`${testimonial.name}-${index}`}
            className="surface flex flex-col rounded-lg p-6 sm:p-8"
          >
            <blockquote className="text-pretty text-neutral-700 dark:text-neutral-300">
              <p>{testimonial.quote}</p>
            </blockquote>
            <figcaption className="mt-6 text-sm text-neutral-500">
              <span className="text-neutral-900 dark:text-white">{testimonial.name}</span>
              {testimonial.detail ? <> · {testimonial.detail}</> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
