import { createContext, useContext } from 'react'
import type { JobMode, NavItem, PortfolioContent } from '../data'
import type { TransitionDirection, TransitionPhase, TransitionStyle } from './transition'

/**
 * The context object and its reader live here rather than in the provider
 * component file, so that file exports only components and React Fast Refresh
 * keeps working when the provider is edited.
 */
export type PortfolioContextValue = {
  /** The job being displayed. */
  job: JobMode
  /** The job the visitor asked for; differs from `job` during the `out` phase. */
  targetJob: JobMode
  content: PortfolioContent
  navItems: NavItem[]
  phase: TransitionPhase
  isTransitioning: boolean
  /** The style being used for the transition currently in flight. */
  transitionStyle: TransitionStyle
  /** Which way the current (or most recent) transition is going. */
  direction: TransitionDirection
  soundEnabled: boolean
  toggleSound: () => void
  /**
   * A frozen snapshot of the page captured when a transition begins, or null.
   * Owned by the provider so it is taken before the content changes.
   */
  ghostClone: HTMLElement | null
  /** Dev-only: force a style for one direction. */
  setTransitionOverride: (direction: TransitionDirection, style: TransitionStyle | null) => void
  transitionOverrides: Partial<Record<TransitionDirection, TransitionStyle>>
  toggleJob: () => void
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(null)

/** Reads the active content pack. Throws if used outside the provider. */
export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used inside <PortfolioProvider>')
  }
  return context
}
