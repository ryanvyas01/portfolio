import { usePortfolio } from './portfolioContext'
import { Section } from './Section'

export function Skills() {
  const { content } = usePortfolio()
  const { skills, sections } = content

  return (
    <Section
      id="skills"
      eyebrow={sections.skills.eyebrow}
      title={sections.skills.title}
      description={sections.skills.description}
    >
      <div className="grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/[0.09] dark:bg-white/[0.09]">
        {skills.map((group) => (
          <div key={group.category} className="bg-neutral-50 p-6 dark:bg-neutral-950">
            <h3 className="text-xs tracking-[0.12em] text-neutral-500 uppercase">
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
