import { createSample } from './audioSample'

/**
 * A burst of typing, for returning to the software portfolio.
 *
 * Plays `public/keyboard.mp3` — BigSoundBank "Computer Keyboard" (#229), CC0,
 * by Joseph SARDIN. See the README for attribution.
 *
 * Trimmed to its densest 0.6s at runtime, which lands on the fastest run of
 * keystrokes, so it reads as someone getting back to work. Swapping the
 * recording is a matter of replacing that one file: the trim finds the busiest
 * moment automatically, so no code changes.
 *
 * No synthesiser fallback: a synthesised keyboard would just be noise, and
 * silence is better than a bad stand-in for something this recognisable.
 */
const keyboard = createSample({
  url: '/keyboard.mp3',
  windowSeconds: 0.6,
  // Typing is quieter than a bark and sits under the visual, so it comes up a
  // little to match perceived loudness.
  gain: 0.85,
})

export const initKeyboard = keyboard.init
export const playKeyboard = keyboard.play
export const primeKeyboard = keyboard.prime
