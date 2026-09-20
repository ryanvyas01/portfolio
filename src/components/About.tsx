import { about } from '../data/resume'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A little about me">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-4 self-start rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:grid-cols-1 dark:border-slate-800 dark:bg-slate-900/40">
          {about.highlights.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-500">
                {item.label}
              </dt>
              <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
