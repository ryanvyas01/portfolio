import { usePortfolio } from './portfolioContext'
import {
  DEFAULT_TRANSITIONS,
  TRANSITION_DIRECTIONS,
  type TransitionDirection,
  type TransitionStyle,
} from './transition'

const STYLES: TransitionStyle[] = ['glitch', 'crossfade']

const LABELS: Record<TransitionDirection, string> = {
  'software->dog': 'code → dog',
  'dog->software': 'dog → code',
}

/**
 * Dev-only controls for auditioning the swap animations without editing code,
 * plus a mute switch for the bark. Returns null in a production build, so none
 * of it ships.
 *
 * Carries `data-dev-only` so a transition's page snapshot strips it — otherwise
 * the ghost would contain a second copy of this panel.
 */
export function DevTransitionSwitcher() {
  const {
    transitionOverrides,
    setTransitionOverride,
    toggleJob,
    soundEnabled,
    toggleSound,
    direction,
  } = usePortfolio()

  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <div
      data-dev-only=""
      className="fixed right-4 bottom-4 z-[70] w-72 rounded-lg border border-neutral-300 bg-neutral-50/95 p-2 text-xs backdrop-blur-xl dark:border-white/15 dark:bg-neutral-900/95"
    >
      <div className="mb-1.5 flex items-center justify-between px-1">
        <span className="tracking-[0.12em] text-neutral-500 uppercase">animation</span>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          className={`rounded-md px-2 py-0.5 transition-colors ${
            soundEnabled
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
              : 'text-neutral-500 hover:bg-neutral-200/60 dark:hover:bg-white/[0.08]'
          }`}
        >
          sound {soundEnabled ? 'on' : 'off'}        </button>
      </div>

      {TRANSITION_DIRECTIONS.map((forDirection) => {
        const active = transitionOverrides[forDirection] ?? DEFAULT_TRANSITIONS[forDirection]
        const isCurrent = direction === forDirection
        return (
          <div key={forDirection} className="mb-1 flex items-center gap-1 px-1 last:mb-0">
            <span
              className={`w-20 shrink-0 ${
                isCurrent ? 'text-neutral-900 dark:text-white' : 'text-neutral-500'
              }`}
            >
              {LABELS[forDirection]}
            </span>
            {STYLES.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setTransitionOverride(forDirection, style)}
                aria-pressed={active === style}
                className={`rounded-md px-1.5 py-0.5 transition-colors ${
                  active === style
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-200/60 dark:text-neutral-400 dark:hover:bg-white/[0.08]'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        )
      })}

      <button
        type="button"
        onClick={toggleJob}
        className="mt-1.5 w-full rounded-md border border-neutral-300 px-2.5 py-1 text-neutral-600 transition-colors hover:bg-neutral-200/60 dark:border-white/15 dark:text-neutral-300 dark:hover:bg-white/[0.08]"
      >
        replay
      </button>
    </div>
  )
}
