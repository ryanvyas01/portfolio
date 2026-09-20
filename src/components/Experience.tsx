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
      <ol className="border-l border-neutral-200 dark:border-white/[0.09]">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.role}-${job.start}`}
            className="relative pb-14 pl-8 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[3.5px] h-[7px] w-[7px] rounded-full bg-neutral-300 ring-4 ring-neutral-50 dark:bg-neutral-600 dark:ring-neutral-950"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg text-neutral-900 dark:text-white">{job.role}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                {job.start} &ndash; {job.end}
              </p>
            </div>

            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
              {job.company}
              {job.location ? <> &middot; {job.location}</> : null}
              {job.employmentType ? <> &middot; {job.employmentType}</> : null}
            </p>

            {job.summary ? (
              <p className="mt-4 text-neutral-600 dark:text-neutral-400">{job.summary}</p>
            ) : null}

            <ul className="mt-4 space-y-2.5">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-neutral-600 dark:text-neutral-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-px w-3 shrink-0 bg-neutral-300 dark:bg-neutral-700"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {job.tech && job.tech.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {job.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-400"
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
