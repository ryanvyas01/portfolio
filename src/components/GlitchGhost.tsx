import { useEffect, useRef } from 'react'
import { useTextScramble } from '../hooks/useTextScramble'

/**
 * The outgoing page, frozen and fading.
 *
 * It exists because fading requires a live element: once React unmounts the
 * old tree there is nothing left to animate, so anything present in the old
 * structure but missing from the new one would just vanish. Keeping a snapshot
 * on top lets it dissolve as a whole — which covers *any* structural
 * difference without diffing anything element by element.
 *
 * The clone is appended into a host div rather than rendered by React, because
 * React cannot adopt an existing DOM node.
 */
export function GlitchGhost({
  clone,
  duration,
}: {
  clone: HTMLElement
  duration: number
}) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) {
      return
    }

    host.appendChild(clone)
    return () => {
      if (clone.parentNode === host) {
        host.removeChild(clone)
      }
    }
  }, [clone])

  // The ghost's own copy is what scrambles on the way out.
  useTextScramble({
    resolveContainers: () => [hostRef.current],
    active: true,
    mode: 'dissolve',
    duration,
  })

  return (
    <div className="glitch-ghost" aria-hidden="true">
      <div className="glitch-ghost__host" ref={hostRef} />
    </div>
  )
}
