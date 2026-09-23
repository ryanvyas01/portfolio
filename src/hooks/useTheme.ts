import { useEffect } from 'react'
import type { JobMode } from '../data'

export type Theme = 'light' | 'dark'

/**
 * The theme each job is locked to.
 *
 * There is deliberately no theme toggle. Each portfolio owns a palette: software
 * is the technical register and runs dark, dog training is the warm one and runs
 * light. A job switch is therefore also a theme switch, every time.
 *
 * Kept in sync with the pre-paint script in index.html.
 */
const MODE_THEMES: Record<JobMode, Theme> = {
  software: 'dark',
  dog: 'light',
}

const CHROME_BACKGROUND: Record<Theme, string> = {
  light: 'var(--color-neutral-50)',
  dark: 'var(--color-neutral-950)',
}

/**
 * The theme that belongs to a job. Pure, so it can be read anywhere without
 * subscribing to anything.
 */
export function themeForMode(mode: JobMode): Theme {
  return MODE_THEMES[mode]
}

/**
 * Tints `<html>` for the active job.
 *
 * The component palette is *not* applied here. It is set declaratively as
 * `data-theme` on the theme scope (see PortfolioProvider), because the scope has
 * to be per-subtree: during a job switch the ghost renders in the outgoing
 * palette while the live page renders in the incoming one, and a single class on
 * `<html>` cannot express both.
 *
 * All this hook does is paint the element behind everything, so overscroll and
 * any area past the app match. It is inline rather than a class so it cannot
 * accidentally satisfy a `[data-theme='dark']` variant and theme the subtree.
 */
export function useTheme(mode: JobMode) {
  const theme = themeForMode(mode)

  useEffect(() => {
    const root = document.documentElement
    root.style.backgroundColor = CHROME_BACKGROUND[theme]
    root.style.colorScheme = theme
  }, [theme])

  return theme
}
