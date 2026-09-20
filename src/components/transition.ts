/**
 * Job-mode transition configuration.
 *
 * Lives outside the component file so the module exports only components,
 * which keeps React Fast Refresh working for the provider.
 */

/**
 * How the content swaps.
 *
 * - `glitch` — the outgoing page is frozen as a ghost, its text dissolves into
 *   glyph noise and the layer fades out while the incoming page resolves out of
 *   noise underneath. Non-text elements fade with the ghost, so a structural
 *   change between jobs is covered rather than hard-cutting.
 * - `crossfade` — the same model without the text churn, for comparison.
 */
export type TransitionStyle = 'glitch' | 'crossfade'

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
  glitch: { outDuration: 300, total: 900 },
  crossfade: { outDuration: 180, total: 420 },
}

/**
 * Which animation each direction uses by default.
 *
 * Both are cross-fade: it reads as calmer and more deliberate than the glitch,
 * and it still hides a structural change because the ghost layer carries the
 * outgoing page away. `glitch` remains available in the dev panel for
 * comparison.
 */
export const DEFAULT_TRANSITIONS: Record<TransitionDirection, TransitionStyle> = {
  'software->dog': 'crossfade',
  'dog->software': 'crossfade',
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
