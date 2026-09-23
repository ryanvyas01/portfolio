import { About } from './About'
import { Contact } from './Contact'
import { Education } from './Education'
import { Experience } from './Experience'
import { Hero } from './Hero'
import { usePortfolio } from './portfolioContext'
import { Process } from './Process'
import { Projects } from './Projects'
import { Skills } from './Skills'
import { Testimonials } from './Testimonials'
import type { SectionId } from '../data'

/** One entry per section id, so the render order follows `enabledSections`. */
const SECTION_COMPONENTS: Record<SectionId, () => React.ReactElement | null> = {
  about: About,
  process: Process,
  experience: Experience,
  education: Education,
  skills: Skills,
  testimonials: Testimonials,
  projects: Projects,
  contact: Contact,
}

/**
 * Renders the hero plus whichever sections the active job enables.
 *
 * Driven by `content.enabledSections` rather than a fixed list, which is what
 * lets the trainer page omit sections the software page has. The nav is built
 * from the same field, so the two cannot drift.
 */
export function Sections() {
  const { content, job } = usePortfolio()

  return (
    <main>
      {/* Keyed by job so the hero's portrait/motion state resets on a switch. */}
      <Hero key={`hero-${job}`} />
      {content.enabledSections.map((id) => {
        const Component = SECTION_COMPONENTS[id]
        return <Component key={`${job}-${id}`} />
      })}
    </main>
  )
}
