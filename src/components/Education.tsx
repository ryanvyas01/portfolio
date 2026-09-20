import { GraduationCap } from 'lucide-react'
import { certifications, education } from '../data/resume'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & certifications">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {education.map((entry) => (
            <article
              key={`${entry.school}-${entry.credential}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <GraduationCap
                className="h-6 w-6 text-accent-600 dark:text-accent-400"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {entry.credential}
              </h3>
              <p className="mt-1 font-medium text-accent-600 dark:text-accent-400">
                {entry.school}
                {entry.field ? (
                  <span className="font-normal text-slate-500 dark:text-slate-500">
                    {' '}
                    &middot; {entry.field}
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                {entry.start} &ndash; {entry.end}
              </p>

              {entry.details && entry.details.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {entry.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        {certifications.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-500">
              Certifications
            </h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={`${cert.name}-${cert.year}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-accent-600 dark:hover:text-accent-400"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  )
}
