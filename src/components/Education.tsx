import { certifications, education } from '../data/resume'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education & certifications">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          {education.map((entry) => (
            <article
              key={`${entry.school}-${entry.credential}`}
              className="surface rounded-lg p-6"
            >
              <h3 className="text-lg text-neutral-900 dark:text-white">
                {entry.credential}
              </h3>
              <p className="mt-1.5 text-neutral-600 dark:text-neutral-400">
                {entry.school}
                {entry.field ? <> &middot; {entry.field}</> : null}
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
                {entry.start} &ndash; {entry.end}
              </p>

              {entry.details && entry.details.length > 0 ? (
                <ul className="mt-5 space-y-2.5">
                  {entry.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6rem] h-px w-3 shrink-0 bg-neutral-300 dark:bg-neutral-700"
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
            <h3 className="text-xs tracking-[0.12em] text-neutral-500 uppercase">
              Certifications
            </h3>
            <ul className="mt-5 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={`${cert.name}-${cert.year}`}
                  className="surface flex items-baseline justify-between gap-4 rounded-lg p-4"
                >
                  <span className="text-neutral-900 dark:text-neutral-100">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-opacity hover:opacity-70"
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </span>
                  <span className="shrink-0 text-xs text-neutral-500">
                    {cert.issuer} &middot; {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  )
}
