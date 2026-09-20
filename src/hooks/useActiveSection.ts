import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in view, so the navbar can
 * highlight the matching link. `ids` should be a stable array reference
 * (defined at module scope) to avoid re-subscribing on every render.
 */
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      if (ids.length === 0) {
        return
      }

      // Consider a section "active" once it crosses this line near the top.
      const line = window.innerHeight * 0.3
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) {
          continue
        }

        const { top, bottom } = element.getBoundingClientRect()
        if (top <= line && bottom > line) {
          current = id
          break
        }
        if (top <= line) {
          current = id
        }
      }

      // The last section is often too short to reach the line, so pin it
      // when the user has scrolled to the bottom of the page.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) {
        current = ids[ids.length - 1]
      }

      setActiveId((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (frame) {
        return
      }
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return activeId
}
