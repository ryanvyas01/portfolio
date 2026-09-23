/**
 * Loads a short audio sample and slices the densest window out of it.
 *
 * Both transition sounds need the same three things: fetch a file once, find
 * the busiest moment (a bark's loudest burst, a sweep's full arc), and play
 * that slice. Sharing the machinery keeps the bark and the sweep from drifting
 * into two slightly different implementations.
 */

export type Sample = {
  /** Fetches and decodes. Safe to call repeatedly — the work happens once. */
  init: () => void
  /** Plays the slice. The first call must be inside a user gesture. */
  play: () => void
  /** Wakes the audio context during a gesture so the first play is not clipped. */
  prime: () => void
}

type Options = {
  url: string
  /** Length of the slice to keep, in seconds. */
  windowSeconds: number
  /** Output level, 0–1. */
  gain?: number
  /**
   * Used when the file is missing or cannot be decoded. Without one the sound
   * is simply silent — which is the right call for a decorative effect.
   */
  synth?: (context: AudioContext) => AudioBuffer
}

type AudioContextConstructor = typeof AudioContext

function getContext(): AudioContext | null {
  const Ctor: AudioContextConstructor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext

  if (!Ctor) {
    return null
  }

  return new Ctor()
}

/** Keeps one context per module instance, created lazily on first use. */
export function createSample({ url, windowSeconds, gain = 0.7, synth }: Options): Sample {
  let context: AudioContext | null = null
  let real: AudioBuffer | null = null
  let fallback: AudioBuffer | null = null
  let started = false

  const ctx = () => {
    context ??= getContext()
    return context
  }

  /**
   * Trims to the loudest window by total energy, with short fades so the slice
   * never clicks at its edges.
   */
  const trim = (audioContext: AudioContext, buffer: AudioBuffer): AudioBuffer => {
    const rate = audioContext.sampleRate
    const span = Math.max(1, Math.floor(rate * windowSeconds))
    const channel = buffer.getChannelData(0)

    if (channel.length <= span) {
      return buffer
    }

    const step = Math.max(1, Math.floor(rate * 0.01))
    let energy = 0
    for (let index = 0; index < span; index += 1) {
      energy += channel[index] * channel[index]
    }

    let best = energy
    let bestStart = 0

    for (let start = step; start + span < channel.length; start += step) {
      for (let index = start - step; index < start; index += 1) {
        energy -= channel[index] * channel[index]
      }
      for (let index = start + span - step; index < start + span; index += 1) {
        energy += channel[index] * channel[index]
      }
      if (energy > best) {
        best = energy
        bestStart = start
      }
    }

    const trimmed = audioContext.createBuffer(1, span, rate)
    const target = trimmed.getChannelData(0)
    target.set(channel.subarray(bestStart, bestStart + span))

    const fade = Math.floor(rate * 0.012)
    for (let index = 0; index < fade; index += 1) {
      target[index] *= index / fade
      target[span - 1 - index] *= index / fade
    }

    return trimmed
  }

  return {
    init() {
      if (started || typeof window === 'undefined') {
        return
      }
      started = true

      const audioContext = ctx()
      if (!audioContext) {
        return
      }

      void (async () => {
        try {
          const response = await fetch(url)
          if (!response.ok) {
            return
          }

          // A dev server serving the SPA fallback returns HTML with a 200, so
          // check the type before handing bytes to the decoder.
          const type = response.headers.get('content-type') ?? ''
          if (!/audio|mpeg|ogg|octet-stream/i.test(type)) {
            return
          }

          const bytes = await response.arrayBuffer()
          const decoded = await audioContext.decodeAudioData(bytes)
          real = trim(audioContext, decoded)
        } catch {
          real = null
        }
      })()
    },

    play() {
      const audioContext = ctx()
      if (!audioContext) {
        return
      }

      if (audioContext.state === 'suspended') {
        void audioContext.resume()
      }

      let buffer = real
      if (!buffer && synth) {
        fallback ??= synth(audioContext)
        buffer = fallback
      }
      if (!buffer) {
        return
      }

      const source = audioContext.createBufferSource()
      source.buffer = buffer

      const level = audioContext.createGain()
      level.gain.value = gain

      source.connect(level).connect(audioContext.destination)
      source.start()
    },

    prime() {
      const audioContext = ctx()
      if (audioContext && audioContext.state === 'suspended') {
        void audioContext.resume()
      }
    },
  }
}
