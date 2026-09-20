import { useEffect, useRef } from 'react'

type ParallaxOptions = {
  /** Extra scale applied at the end of the effect. `0.05` = 5% larger. */
  scale?: number
  /** How far the element drifts downward by the end of the effect, in px. */
  drift?: number
  /** Scroll distance, in px, over which the effect completes. */
  range?: number
  /** Lag factor between 0 and 1. Lower is smoother and floatier. */
  smoothing?: number
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/**
 * Scroll-linked parallax: scales the element up slightly while drifting it
 * downward, so it appears to lag behind the page as it scrolls.
 *
 * The motion is interpolated toward the scroll position rather than snapped to
 * it — that lag is what reads as "floating" rather than mechanical. The animation
 * loop parks itself once the element settles, so an idle page costs nothing.
 *
 * Defaults mirror the effect measured on the reference site (scale to 1.0564,
 * drift +39.5px, completing over roughly the first 400px of scroll).
 */
export function useParallax<T extends HTMLElement>({
  scale = 0.056,
  drift = 40,
  range = 400,
  smoothing = 0.09,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Honour reduced-motion by leaving the element completely untransformed.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let target = clamp(window.scrollY / range, 0, 1)
    let current = target
    let frame = 0

    const draw = () => {
      element.style.transform = `translate3d(0, ${(drift * current).toFixed(2)}px, 0) scale(${(
        1 +
        scale * current
      ).toFixed(4)})`
    }

    const tick = () => {
      current += (target - current) * smoothing

      if (Math.abs(target - current) < 0.0004) {
        current = target
        draw()
        frame = 0
        return
      }

      draw()
      frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = clamp(window.scrollY / range, 0, 1)
      if (!frame) frame = requestAnimationFrame(tick)
    }

    element.style.willChange = 'transform'
    draw()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
      element.style.removeProperty('will-change')
      element.style.removeProperty('transform')
    }
  }, [scale, drift, range, smoothing])

  return ref
}
