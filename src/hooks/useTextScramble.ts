import { useEffect } from 'react'

/**
 * Glyphs used while a string is in flux. Deliberately ASCII and roughly
 * uniform in width so the scramble jitters without the text visibly reflowing
 * on every frame.
 */
const GLYPHS = '<>=/\\_[]{}$#%&*+?!0123456789'

/**
 * `resolve` — real text at the start, noise at the end. Used for content
 * arriving.
 * `dissolve` — noise at the start, real text at the end, i.e. read backwards.
 * Used for content leaving.
 */
export type ScrambleMode = 'resolve' | 'dissolve'

type ScrambleEntry = {
  node: Text
  original: string
  /** ms after the sweep starts before this node begins changing. */
  delay: number
  /** How long this node takes to complete. */
  span: number
}

type Options = {
  /**
   * Resolved inside the effect, not at render time — a ref's `.current` is
   * still null when the effect is created, and a DOM query needs to run after
   * the tree is committed anyway.
   */
  resolveContainers: () => (HTMLElement | null)[]
  /** When false the hook does nothing and restores any text it touched. */
  active: boolean
  mode: ScrambleMode
  /** Total run time for the sweep, including stagger. */
  duration: number
}

/**
 * Sweeps every visible string inside `containers` between real text and glyph
 * noise, and back.
 *
 * Works on the DOM rather than through components, so it covers all copy —
 * paragraphs, list items, tech tags, nav labels — without wrapping each string
 * in a wrapper and without touching the section components.
 *
 * Text is mutated in place and restored on completion, so there is no
 * duplicated copy for assistive tech to trip over and no layout shift: strings
 * keep their length throughout.
 *
 * Only nodes intersecting the viewport are touched. The page scrolls to the
 * top as part of switching jobs, so that is nearly everything on screen, and it
 * keeps the per-frame work bounded.
 */
export function useTextScramble({ resolveContainers, active, mode, duration }: Options) {
  useEffect(() => {
    if (!active) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const roots = resolveContainers().filter(
      (element): element is HTMLElement => Boolean(element),
    )
    if (roots.length === 0) {
      return
    }

    const entries = collect(roots, duration)
    if (entries.length === 0) {
      return
    }

    const start = performance.now()
    let frame = 0
    let pending = entries

    const tick = (now: number) => {
      const elapsed = now - start
      const stillWorking: ScrambleEntry[] = []

      for (const entry of pending) {
        const local = elapsed - entry.delay

        if (local <= 0) {
          // Not its turn yet — leave it exactly as it is.
          stillWorking.push(entry)
          continue
        }

        const progress = Math.min(1, local / entry.span)
        const changed = Math.floor(progress * entry.original.length)

        let output = ''
        for (let index = 0; index < entry.original.length; index += 1) {
          const character = entry.original[index]

          if (character === ' ') {
            output += character
            continue
          }

          // `resolve` starts real and becomes noise; `dissolve` the reverse.
          const isNoise =
            mode === 'resolve' ? index >= changed : index < changed

          output += isNoise ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : character
        }

        entry.node.data = output

        if (progress < 1) {
          stillWorking.push(entry)
        } else {
          // Settle exactly on the real string and stop touching this node.
          entry.node.data = entry.original
        }
      }

      pending = stillWorking

      if (pending.length > 0) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      // Never strand glyph noise if we are torn down mid-sweep.
      for (const entry of entries) {
        if (entry.node.data !== entry.original) {
          entry.node.data = entry.original
        }
      }
    }
    // `resolveContainers` is a fresh closure each render by design, so it is
    // deliberately not a dependency — the effect re-runs on `active` instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mode, duration])
}

/** Gathers the visible, worth-animating text nodes and their timing. */
function collect(roots: HTMLElement[], duration: number): ScrambleEntry[] {
  const found: { node: Text; top: number }[] = []
  const padding = 160

  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.nodeType !== Node.TEXT_NODE) {
          return NodeFilter.FILTER_REJECT
        }

        const text = node as Text
        const parent = text.parentElement
        if (!parent) {
          return NodeFilter.FILTER_REJECT
        }

        const tag = parent.tagName
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
          return NodeFilter.FILTER_REJECT
        }

        // Screen-reader-only text should stay readable rather than churn.
        if (parent.closest('.sr-only')) {
          return NodeFilter.FILTER_REJECT
        }

        const value = text.data
        if (!value || value.trim().length === 0) {
          return NodeFilter.FILTER_REJECT
        }

        return NodeFilter.FILTER_ACCEPT
      },
    })

    let current = walker.nextNode()
    while (current) {
      const text = current as Text
      const element = text.parentElement
      if (element) {
        const rect = element.getBoundingClientRect()
        const onScreen =
          (rect.width > 0 || rect.height > 0) &&
          rect.bottom > -padding &&
          rect.top < window.innerHeight + padding

        if (onScreen) {
          found.push({ node: text, top: rect.top })
        }
      }
      current = walker.nextNode()
    }
  }

  if (found.length === 0) {
    return []
  }

  // Stagger top-to-bottom so the page changes as a sweep rather than all at
  // once. Kept short so everything finishes inside the transition.
  found.sort((a, b) => a.top - b.top)

  const staggerWindow = Math.min(200, duration * 0.35)
  const perNode = Math.max(150, duration - staggerWindow)

  return found.map(({ node }, index) => {
    const ratio = found.length === 1 ? 0 : index / (found.length - 1)
    return {
      node,
      original: node.data,
      delay: ratio * staggerWindow,
      span: Math.min(perNode, perNode * 0.55 + node.data.length * 7),
    }
  })
}
