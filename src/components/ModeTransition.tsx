import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useTextScramble } from '../hooks/useTextScramble'
import { GlitchGhost } from './GlitchGhost'
import { usePortfolio } from './portfolioContext'
import { TRANSITION_TIMING } from './transition'

/**
 * Wraps the job-specific content and plays the swap animation.
 *
 * For `glitch` — the only style in use — the provider swaps the content
 * immediately and hands us a frozen snapshot of the outgoing page. That
 * snapshot is the ghost: it sits on top, its text dissolves into noise, and the
 * whole layer fades out. Meanwhile this wrapper's own text resolves out of
 * noise.
 *
 * That combination is what makes a structural change work. Anything present in
 * the old page but missing from the new one fades away with the ghost, and
 * anything new fades in here — with no element-by-element diffing.
 */
export function ModeTransition({ children }: { children: ReactNode }) {
  const { job, phase, transitionStyle, ghostClone } = usePortfolio()
  const contentRef = useRef<HTMLDivElement>(null)

  const timing = TRANSITION_TIMING[transitionStyle]
  const inDuration = timing.total - timing.outDuration
  const outDuration = timing.outDuration
  /*
   * The incoming page's text resolves out of noise.
   *
   * The navbar is included via a DOM query rather than a ref: it lives outside
   * this wrapper (deliberately — it must not remount, since it owns the mobile
   * menu state), but its labels still need to churn with everything else.
   */
  useTextScramble({
    resolveContainers: () => [
      contentRef.current,
      document.querySelector<HTMLElement>('header'),
    ],
    active: phase === 'in',
    mode: 'resolve',
    duration: inDuration,
  })

  const showGhost = phase === 'out' && ghostClone !== null

  return (
    <div
      style={
        {
          '--ghost-duration': `${outDuration}ms`,
          '--content-duration': `${inDuration}ms`,
        } as CSSProperties
      }
    >
      <div
        key={job}
        ref={contentRef}
        data-phase={phase}
        data-style={transitionStyle}
        className="mode-transition relative"
      >
        {children}
      </div>

      {showGhost ? <GlitchGhost clone={ghostClone} duration={outDuration} /> : null}
    </div>
  )
}
