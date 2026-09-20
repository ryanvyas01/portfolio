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
import { initBark, playBark, primeBark } from '../lib/bark'
import { initKeyboard, playKeyboard, primeKeyboard } from '../lib/keyboard'
import { PortfolioContext, type PortfolioContextValue } from './portfolioContext'
import {
  TRANSITION_TIMING,
  resolveTransitionStyle,
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

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { mode: targetJob, toggleMode } = useJobMode()
  const { soundEnabled, toggleSound } = useSound()
  const [job, setJob] = useState<JobMode>(targetJob)
  const [phase, setPhase] = useState<TransitionPhase>('idle')
  const [ghostClone, setGhostClone] = useState<HTMLElement | null>(null)
  const [transitionStyle, setTransitionStyle] = useState<TransitionStyle>('glitch')
  const [transitionOverrides, setTransitionOverrides] = useState<
    Partial<Record<TransitionDirection, TransitionStyle>>
  >({})

  /** The job the outgoing ghost was captured from, for the dev display. */
  const directionRef = useRef<TransitionDirection>('software->dog')

  // Look for a real bark recording once, so a dropped-in file is picked up.
  useEffect(() => {
    initBark()
    initKeyboard()
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

    const toDog = targetJob === 'dog'
    let sound = 0
    if (soundEnabled) {
      // Going in gets the bark; coming back out gets a burst of typing.
      sound = window.setTimeout(toDog ? playBark : playKeyboard, 120)
    }

    // Hand over from the ghost to the incoming page's text resolving.
    const hand = window.setTimeout(() => {
      setGhostClone(null)
      setPhase('in')
    }, timing.outDuration)

    const settle = window.setTimeout(() => setPhase('idle'), timing.total)

    return () => {
      window.clearTimeout(sound)
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
    primeKeyboard()

    const next: JobMode = job === 'software' ? 'dog' : 'software'
    const direction = `${job}->${next}` as TransitionDirection
    directionRef.current = direction

    const style = resolveTransitionStyle(direction, transitionOverrides)
    setTransitionStyle(style)

    // Captured before any state changes, while the DOM still shows the
    // outgoing portfolio, and before the scroll jump below.
    setGhostClone(style === 'glitch' || style === 'crossfade' ? captureGhost() : null)

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
      ghostClone,
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
      ghostClone,
      setTransitionOverride,
      transitionOverrides,
      toggleJob,
    ],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
