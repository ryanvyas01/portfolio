import { experience } from '../data/resume'
import { Section } from './Section'

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      description="The roles that shaped how I build software, most recent first."
    >
      <ol className="space-y-10 border-l border-slate-200 pl-8 dark:border-slate-800">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}-${job.start}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[2.375rem] h-3 w-3 rounded-full border-2 border-white bg-accent-600 dark:border-slate-950 dark:bg-accent-400"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {job.role}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
                {job.start} &ndash; {job.end}
              </p>
            </div>

            <p className="mt-1 text-base font-medium text-accent-600 dark:text-accent-400">
              {job.company}
              {job.location ? (
                <span className="font-normal text-slate-500 dark:text-slate-500">
                  {' '}
                  &middot; {job.location}
                </span>
              ) : null}
              {job.employmentType ? (
                <span className="font-normal text-slate-500 dark:text-slate-500">
                  {' '}
                  &middot; {job.employmentType}
                </span>
              ) : null}
            </p>

            {job.summary ? (
              <p className="mt-3 text-slate-600 dark:text-slate-400">{job.summary}</p>
            ) : null}

            <ul className="mt-4 space-y-2">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-slate-600 dark:text-slate-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {job.tech && job.tech.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  )
}
