import { Quote } from 'lucide-react'
import { testimonials } from '../data/resume'
import { Section } from './Section'

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="What people I've worked with say"
      description="Colleagues and managers on what it's like to work together."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <li key={testimonial.name}>
            <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <Quote
                className="h-6 w-6 shrink-0 text-indigo-600 dark:text-indigo-400"
                aria-hidden="true"
              />
              <blockquote className="mt-4 flex-1 text-slate-600 dark:text-slate-400">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                <span className="block font-semibold text-slate-900 dark:text-white">
                  {testimonial.name}
                </span>
                <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-500">
                  {testimonial.title}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
