import { dogTraining } from './dogTraining'
import { software } from './software'
import { type JobMode, type NavItem, type PortfolioContent } from './types'

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
 * Builds the nav from the pack's own section list, so the nav is a projection of
 * the page rather than a parallel structure that has to be kept in step.
 *
 * It reads `enabledSections` for both membership AND order. Deriving either one
 * from somewhere else is how a nav ends up highlighting the wrong link: the two
 * orders would agree only for as long as nobody reordered a single page.
 */
export function navItemsFor(content: PortfolioContent): NavItem[] {
  return content.enabledSections.map((id) => ({ id, label: content.navLabels[id] }))
}
