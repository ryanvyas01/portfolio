import { dogTraining } from './dogTraining'
import { software } from './software'
import { SECTION_IDS, type JobMode, type NavItem, type PortfolioContent } from './types'

export * from './types'

/** One pack per job. Add a new one here plus a `JobMode` member to extend. */
export const contentPacks: Record<JobMode, PortfolioContent> = {
  software,
  dog: dogTraining,
}

export const JOB_MODES: JobMode[] = ['software', 'dog']

/** The pack a first-time visitor gets. */
export const DEFAULT_JOB_MODE: JobMode = 'software'

/**
 * Builds the nav from the shared section order, the pack's enabled sections,
 * and its labels — so the nav and the page can never disagree.
 *
 * Reordering `SECTION_IDS` reorders the page, disabling an id removes the
 * section from both, and each job only supplies wording.
 */
export function navItemsFor(content: PortfolioContent): NavItem[] {
  return SECTION_IDS.filter((id) => content.enabledSections.includes(id)).map((id) => ({
    id,
    label: content.navLabels[id],
  }))
}
