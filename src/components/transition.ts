/**
 * Job-mode transition configuration.
 *
 * Lives outside the component file so the module exports only components,
 * which keeps React Fast Refresh working for the provider.
 */

/**
 * How the content swaps.
 *
 * - `reveal` — the outgoing page is frozen as a ghost and a circular hole opens
 *   out of the portfolio toggle, erasing the old page to uncover the new one
 *   already sitting underneath. Reads as the new world blooming out of the
 *   control that was clicked.
 * - `glitch` — the same ghost model, but the layer dissolves into glyph noise
 *   and fades away instead of being wiped.
 * - `crossfade` — the same model without the text churn, for comparison.
 *
 * All three need the ghost: it is what carries the outgoing page away. They
 * differ only in how it leaves.
 */
export type TransitionStyle = 'reveal' | 'glitch' | 'crossfade'

/**
 * Where a reveal should originate, and how far it has to travel to clear the
 * viewport from there. Resolved at click time, while the toggle is still where
 * the visitor saw it.
 */
export type RevealOrigin = {
  /** Viewport coordinates of the control's centre. */
  x: number
  y: number
  /** Distance to the furthest corner, so the circle covers the whole screen. */
  radius: number
}

/**
 * `out` while the outgoing page is fading, `in` once the new page is resolving,
 * `idle` the rest of the time.
 */
export type TransitionPhase = 'idle' | 'out' | 'in'

/**
 * The two real transitions. Deliberately not a `${JobMode}->${JobMode}`
 * template type, which would also admit the no-op pairs (`dog->dog`) that
 * exist while idle and have no animation of their own.
 */
export type TransitionDirection = 'software->dog' | 'dog->software'

/**
 * How long the ghost takes to be wiped away by a reveal.
 *
 * Lives here with the other swap timings so it is declared before the table
 * below, which reads it. Longer than the other styles' durations: the reveal is
 * the point of that style, so it needs long enough to read as a wipe rather
 * than a flicker.
 */
export const REVEAL_OUT_MS = 560

/**
 * `outDuration` is how long the ghost takes to dissolve and fade. `total` is
 * when everything is done, so `total - outDuration` is the window the incoming
 * text has to resolve in.
 *
 * For `glitch` the content swaps at the *start*, not midway: the ghost covers
 * the change, so there is no moment where the old page is half-gone.
 */
export const TRANSITION_TIMING: Record<
  TransitionStyle,
  { outDuration: number; total: number }
> = {
  reveal: { outDuration: REVEAL_OUT_MS, total: 1080 },
  glitch: { outDuration: 300, total: 900 },
  crossfade: { outDuration: 180, total: 420 },
}

/**
 * Which animation each direction uses by default.
 *
 * Both directions reveal: the theme is locked to the job (dark for software,
 * light for dog), so every switch also flips the palette, and a circular wipe
 * from the toggle is a better fit for a change that big than a fade. `glitch`
 * and `crossfade` remain in the dev panel for comparison.
 */
export const DEFAULT_TRANSITIONS: Record<TransitionDirection, TransitionStyle> = {
  'software->dog': 'reveal',
  'dog->software': 'reveal',
}

/** Every direction, for the dev switcher and any exhaustiveness checks. */
export const TRANSITION_DIRECTIONS: TransitionDirection[] = [
  'software->dog',
  'dog->software',
]

export function directionOf(from: string, to: string): TransitionDirection {
  return `${from}->${to}` as TransitionDirection
}

/**
 * The style to use for a direction, honouring any dev override.
 *
 * Falls back to `crossfade` for directions with no mapping — which includes
 * the same-job pairs (`software->software`) that exist while idle.
 */
export function resolveTransitionStyle(
  direction: TransitionDirection,
  overrides: Partial<Record<TransitionDirection, TransitionStyle>> = {},
): TransitionStyle {
  return overrides[direction] ?? DEFAULT_TRANSITIONS[direction] ?? 'crossfade'
}
