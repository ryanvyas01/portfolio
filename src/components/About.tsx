import { about } from '../data/resume'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A little about me">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6 text-lg text-pretty text-neutral-600 dark:text-neutral-400">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="surface grid grid-cols-2 gap-6 self-start rounded-lg p-6 md:grid-cols-1">
          {about.highlights.map((item) => (
            <div key={item.label}>
              <dt className="text-xs tracking-[0.12em] text-neutral-500 uppercase">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-base text-neutral-900 dark:text-neutral-100">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
