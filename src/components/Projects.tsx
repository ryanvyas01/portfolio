import { ExternalLink } from 'lucide-react'
import { projects } from '../data/resume'
import { BrandIcon } from './BrandIcon'
import { Section } from './Section'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      description="A selection of work that shows how I think about problems and ship solutions."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-500/50 ${
              project.featured ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {project.name}
                </h3>
                {project.period ? (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                    {project.period}
                  </p>
                ) : null}
              </div>
              {project.featured ? (
                <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  Featured
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {project.liveUrl || project.repoUrl ? (
              <div className="mt-6 flex flex-wrap gap-4 pt-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
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
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
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
