import { ExternalLink } from 'lucide-react'
import { BrandIcon } from './BrandIcon'
import { usePortfolio } from './portfolioContext'
import { Section } from './Section'

export function Projects() {
  const { content } = usePortfolio()
  const { projects, sections } = content

  return (
    <Section
      id="projects"
      eyebrow={sections.projects.eyebrow}
      title={sections.projects.title}
      description={sections.projects.description}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className={`surface flex flex-col rounded-lg p-6 transition-colors hover:border-neutral-400/50 dark:hover:border-white/25 ${
              project.featured ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg text-neutral-900 dark:text-white">
                {project.name}
              </h3>
              {project.period ? (
                <p className="shrink-0 text-xs text-neutral-500 dark:text-neutral-500">
                  {project.period}
                </p>
              ) : null}
            </div>

            <p className="mt-3 text-pretty text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 ? (
              <ul className="mt-5 space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6rem] h-px w-3 shrink-0 bg-neutral-300 dark:bg-neutral-700"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-400"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.liveUrl || project.repoUrl ? (
              <div className="mt-6 flex flex-wrap gap-5 border-t border-neutral-200 pt-5 dark:border-white/[0.08]">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live site
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    <BrandIcon name="github" className="h-4 w-4" />
                    Source
                  </a>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}
