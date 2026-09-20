import { useEffect, useRef } from 'react'

type HoverMotionOptions = {
  /** Extra scale at full engagement. `0.05` = 5% larger. */
  scale?: number
  /** How far the element rises at full engagement, in px. */
  lift?: number
  /** Maximum pointer-follow offset, in px. */
  follow?: number
  /** Lag factor between 0 and 1. Lower is smoother and floatier. */
  smoothing?: number
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

/**
 * Pointer-driven motion for the hero portrait, in place of scroll parallax.
 *
 * On hover the element eases up and scales slightly, and it leans a few pixels
 * toward the cursor so it feels like it is responding rather than just glowing.
 * Like the scroll version, motion is interpolated toward a target instead of
 * snapping to it — the lag is what reads as weight. The loop parks itself once
 * everything settles, so an idle page costs nothing.
 *
 * Skipped entirely under `prefers-reduced-motion`, and on devices without a
 * real pointer (`hover: none`), where there is no hover to respond to.
 */
export function useHoverMotion<T extends HTMLElement>({
  scale = 0.025,
  lift = 8,
  follow = 5,
  smoothing = 0.1,
}: HoverMotionOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover)').matches) return

    let engaged = 0
    let targetEngaged = 0
    let pointerX = 0 // -1 (left) .. 1 (right)
    let pointerY = 0 // -1 (top) .. 1 (bottom)
    let easedX = 0
    let easedY = 0
    let frame = 0

    const draw = () => {
      const scaleValue = 1 + scale * engaged
      const x = easedX * follow
      const y = -lift * engaged + easedY * follow
      element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scaleValue.toFixed(4)})`
    }

    const tick = () => {
      engaged += (targetEngaged - engaged) * smoothing
      easedX += (pointerX - easedX) * smoothing
      easedY += (pointerY - easedY) * smoothing

      const settled =
        Math.abs(targetEngaged - engaged) < 0.0005 &&
        Math.abs(pointerX - easedX) < 0.001 &&
        Math.abs(pointerY - easedY) < 0.001

      if (settled) {
        engaged = targetEngaged
        easedX = pointerX
        easedY = pointerY
        draw()
        frame = 0
        return
      }

      draw()
      frame = requestAnimationFrame(tick)
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      targetEngaged = 1
      kick()
    }

    const onLeave = () => {
      targetEngaged = 0
      pointerX = 0
      pointerY = 0
      kick()
    }

    const onMove = (event: PointerEvent) => {
      if (!targetEngaged) return
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      pointerX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
      pointerY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
      kick()
    }

    element.style.willChange = 'transform'
    draw()
    element.addEventListener('pointerenter', onEnter)
    element.addEventListener('pointerleave', onLeave)
    element.addEventListener('pointermove', onMove)

    return () => {
      element.removeEventListener('pointerenter', onEnter)
      element.removeEventListener('pointerleave', onLeave)
      element.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
      element.style.removeProperty('will-change')
      element.style.removeProperty('transform')
    }
  }, [scale, lift, follow, smoothing])

  return ref
}
