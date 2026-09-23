import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { contentPacks, navItemsFor, type JobMode } from '../data'
import { useJobMode } from '../hooks/useJobMode'
import { useSound } from '../hooks/useSound'
import { themeForMode, useTheme, type Theme } from '../hooks/useTheme'
import { initBark, playBark, primeBark } from '../lib/bark'
import { initSweep, playSweep, primeSweep } from '../lib/sweep'
import { PortfolioContext, type PortfolioContextValue } from './portfolioContext'
import {
  TRANSITION_TIMING,
  resolveTransitionStyle,
  type RevealOrigin,
  type TransitionDirection,
  type TransitionPhase,
  type TransitionStyle,
} from './transition'

/**
 * Takes a frozen, inert copy of the outgoing page.
 *
 * This snapshot is what fades away, so that elements dropped by a structural
 * change are removed by animating rather than by disappearing.
 *
 * The navbar is deliberately excluded: it does not remount between jobs, so
 * leaving it in would stack a second header inside the ghost. It is scrambled
 * in place instead — see ModeTransition.
 *
 * Ids are stripped because the copy shares a document with the original, and
 * duplicated ids would shadow the real anchors.
 */
function captureGhost(): HTMLElement | null {
  const root = document.querySelector<HTMLElement>('[data-app-root]')
  if (!root) {
    return null
  }

  const clone = root.cloneNode(true) as HTMLElement
  /*
   * Only the navbar is dropped, and it must be matched as a *direct child* of
   * the app root. A plain `header` selector would also catch every section's
   * heading block — Section.tsx renders those as `<header>` — and quietly strip
   * the titles and descriptions out of the ghost.
   */
  clone.querySelectorAll(':scope > header').forEach((element) => element.remove())
  clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))
  clone.querySelectorAll('[data-dev-only]').forEach((element) => element.remove())
  clone.setAttribute('aria-hidden', 'true')
  clone.setAttribute('inert', '')

  return clone
}

/**
 * Where the reveal should start, and how far it has to spread to clear the
 * viewport from there.
 *
 * Resolved here rather than passed in, so every entry point — the navbar
 * toggle, the dev panel's replay button — starts from the same place without
 * each having to measure it. Falls back to the centre of the screen if the
 * toggle is not on the page for any reason.
 */
function resolveRevealOrigin(): RevealOrigin {
  const { innerWidth, innerHeight } = window
  const toggle = document.querySelector<HTMLElement>('[data-job-toggle]')
  const rect = toggle?.getBoundingClientRect()

  const x = rect ? rect.left + rect.width / 2 : innerWidth / 2
  const y = rect ? rect.top + rect.height / 2 : innerHeight / 2

  return {
    x,
    y,
    /*
     * Rounded up: the exact hypot is a long decimal, and a sub-pixel radius is
     * meaningless here — it only needs to clear the furthest corner.
     */
    radius: Math.ceil(
      Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)),
    ),
  }
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { mode: targetJob, toggleMode } = useJobMode()
  const { soundEnabled, toggleSound } = useSound()
  const [job, setJob] = useState<JobMode>(targetJob)
  /*
   * Keyed to the *displayed* job, not the target: the content swaps at the
   * start of a transition, so the theme has to follow the job whose content is
   * actually on screen.
   */
  const theme = useTheme(job)
  const [phase, setPhase] = useState<TransitionPhase>('idle')
  const [ghostClone, setGhostClone] = useState<HTMLElement | null>(null)
  /*
   * The palette the ghost should render in — the one that was on screen when
   * the switch was clicked. Held separately from `theme` because by the time
   * the ghost mounts the live page has already flipped to the new palette, and
   * the ghost is what carries the old one away.
   */
  const [ghostTheme, setGhostTheme] = useState<Theme>(theme)
  const [transitionOrigin, setTransitionOrigin] = useState<RevealOrigin | null>(null)
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>('glitch')
  const [transitionOverrides, setTransitionOverrides] = useState<
    Partial<Record<TransitionDirection, TransitionStyle>>
  >({})

  /** The job the outgoing ghost was captured from, for the dev display. */
  const directionRef = useRef<TransitionDirection>('software->dog')

  // Look for the real recordings once, so a dropped-in file is picked up.
  useEffect(() => {
    initBark()
    initSweep()
  }, [])

  /*
   * Depends only on the job and the style. `direction` is deliberately absent:
   * the content swaps at the start of a glitch, so the direction changes as
   * soon as the job does, and having it here would re-run this effect and
   * restart its own timers mid-transition.
   */
  useEffect(() => {
    if (targetJob === job) {
      return
    }

    const timing = TRANSITION_TIMING[transitionStyle]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setJob(targetJob)
      setGhostClone(null)
      setPhase('idle')
      return
    }

    // The new page mounts straight away, underneath the ghost. There is never a
    // moment where the old page is half-removed, which is what lets a
    // structural change pass unnoticed.
    setJob(targetJob)
    setPhase('out')

    /*
     * Played here, on the same tick the swap is committed, rather than on the
     * 120ms timer this used to use. The timer was there to land the sound
     * mid-transition, but that reads as the click being unresponsive: a cue is
     * feedback for the gesture, so it has to arrive with it, not after it. A
     * passive effect runs within a frame of the click, which is under the
     * threshold where an audio delay is perceptible at all, whereas 120ms is
     * well over it.
     */
    if (soundEnabled) {
      // Going in gets the bark; coming back out gets a sweep of air.
      if (targetJob === 'dog') {
        playBark()
      } else {
        playSweep()
      }
    }

    // Hand over from the ghost to the incoming page's text resolving.
    const hand = window.setTimeout(() => {
      setGhostClone(null)
      setPhase('in')
    }, timing.outDuration)

    const settle = window.setTimeout(() => setPhase('idle'), timing.total)

    return () => {
      window.clearTimeout(hand)
      window.clearTimeout(settle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetJob, transitionStyle, soundEnabled])

  const content = contentPacks[job]

  // Keep the tab honest about which portfolio is open.
  useEffect(() => {
    document.title = `${content.profile.name} — ${content.profile.title}`
  }, [content])

  const navItems = useMemo(() => navItemsFor(content), [content])

  const toggleJob = useCallback(() => {
    // Prime both sounds inside the gesture so whichever plays is not swallowed
    // by the autoplay policy.
    primeBark()
    primeSweep()

    const next: JobMode = job === 'software' ? 'dog' : 'software'
    const direction = `${job}->${next}` as TransitionDirection
    directionRef.current = direction

    const style = resolveTransitionStyle(direction, transitionOverrides)
    setTransitionStyle(style)

    // Captured before any state changes, while the DOM still shows the
    // outgoing portfolio, and before the scroll jump below. Every style needs
    // it — the ghost is what carries the old page away.
    setGhostClone(captureGhost())

    /*
     * The outgoing palette, read before the job changes. The ghost renders in
     * this, so the wipe goes from the old theme to the new one rather than
     * light-to-light.
     */
    setGhostTheme(themeForMode(job))

    /*
     * Measured now, inside the gesture. The navbar is excluded from the ghost
     * so it stays put, but it can still move (the mobile menu closing, the
     * header un-sticking on the scroll below), and the reveal has to grow from
     * where the visitor actually saw the toggle.
     */
    setTransitionOrigin(resolveRevealOrigin())

    toggleMode()

    // Jump to the top before the transition runs rather than smooth scrolling
    // through it: the scramble only animates text that is on screen, so a long
    // smooth scroll would leave the visitor looking at untransformed copy.
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [toggleMode, job, transitionOverrides])

  const setTransitionOverride = useCallback(
    (forDirection: TransitionDirection, style: TransitionStyle | null) => {
      setTransitionOverrides((current) => {
        const next = { ...current }
        if (style === null) {
          delete next[forDirection]
        } else {
          next[forDirection] = style
        }
        return next
      })
    },
    [],
  )

  const value = useMemo<PortfolioContextValue>(
    () => ({
      job,
      targetJob,
      content,
      navItems,
      phase,
      isTransitioning: phase !== 'idle',
      transitionStyle,
      direction: directionRef.current,
      soundEnabled,
      toggleSound,
      transitionOrigin,
      ghostClone,
      ghostTheme,
      setTransitionOverride,
      transitionOverrides,
      toggleJob,
    }),
    [
      job,
      targetJob,
      content,
      navItems,
      phase,
      transitionStyle,
      soundEnabled,
      toggleSound,
      transitionOrigin,
      ghostClone,
      ghostTheme,
      setTransitionOverride,
      transitionOverrides,
      toggleJob,
    ],
  )

  /*
   * The theme scope. Everything the visitor sees lives inside it, and it is the
   * element `data-theme` is set on — not <html>, because the ghost needs to
   * hold a different palette at the same time and an ancestor attribute cannot
   * be overridden by a descendant. The ghost is therefore portalled out of this
   * subtree, to <body>; see GlitchGhost.
   */
  return (
    <PortfolioContext.Provider value={value}>
      <div data-theme={theme}>{children}</div>
    </PortfolioContext.Provider>
  )
}
