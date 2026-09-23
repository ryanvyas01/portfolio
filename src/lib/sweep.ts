import { createSample } from './audioSample'

/**
 * A sweep of air, for returning to the software portfolio.
 *
 * Plays `public/sweep.mp3` — BigSoundBank "Whoosh #5" (#1797), CC0, by Joseph
 * SARDIN, a whoosh made with a long wooden stick. See the README for attribution.
 *
 * The recording is 0.54s, shorter than the window below, so `trim()` hands it
 * back whole rather than cutting a slice out of it. That is deliberate: a sweep
 * is an arc, and an arc cut from its own middle stops being one.
 *
 * No synthesiser fallback. Air is the one thing synthesis genuinely does well,
 * but a stand-in would not be the same sound, so a missing file is better left
 * silent than substituted.
 */
const sweep = createSample({
  url: '/sweep.mp3',
  // Longer than the recording on purpose, so the whole sweep survives the trim.
  windowSeconds: 1.2,
  /*
   * Deliberately quieter than the bark rather than matched to it. The bark
   * announces the dog portfolio; the sweep is just the page exhaling on the way
   * back, so it should sit under the content instead of alongside it.
   *
   * This file peaks at 0.524, so 0.7 puts it at ~0.37 against the bark's
   * ~0.60 — roughly 4dB down, audibly present but not an event. It was 1.15
   * (peak-matched to the bark) and read as too loud.
   */
  gain: 0.7,
})

export const initSweep = sweep.init
export const playSweep = sweep.play
export const primeSweep = sweep.prime
