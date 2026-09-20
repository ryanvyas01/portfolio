import { createSample } from './audioSample'

/**
 * The dog bark, for entering the dog training portfolio.
 *
 * Plays `public/bark.mp3` — a CC0 recording (see README for attribution) —
 * trimmed to its loudest 0.75s: the source is a couple of seconds of a small
 * dog growling and barking, and only the loudest burst is wanted.
 *
 * The synthesised fallback exists so the transition is never silent if the file
 * is missing. It is deliberately crude — a safety net, not a substitute.
 */
function buildSynthBark(context: AudioContext): AudioBuffer {
  const rate = context.sampleRate
  const duration = 0.42
  const length = Math.floor(rate * duration)
  const buffer = context.createBuffer(1, length, rate)
  const channel = buffer.getChannelData(0)

  for (let index = 0; index < length; index += 1) {
    const t = index / rate
    const progress = t / duration

    const pitch = 420 - 270 * Math.min(1, progress * 1.6)
    const body =
      Math.sin(2 * Math.PI * pitch * t) * 0.6 +
      Math.sin(2 * Math.PI * pitch * 0.5 * t) * 0.35

    const noise = (Math.random() * 2 - 1) * Math.max(0, 1 - progress * 4) * 0.75
    const envelope = Math.min(1, progress / 0.04) * Math.exp(-4.2 * progress)
    const grit = 1 + 0.18 * Math.sin(2 * Math.PI * 60 * t)

    channel[index] = (body + noise) * envelope * grit * 0.85
  }

  return buffer
}

const bark = createSample({
  url: '/bark.mp3',
  windowSeconds: 0.75,
  gain: 0.6,
  synth: buildSynthBark,
})

export const initBark = bark.init
export const playBark = bark.play
export const primeBark = bark.prime
