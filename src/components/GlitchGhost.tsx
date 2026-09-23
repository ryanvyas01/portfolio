import { useEffect, useRef, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { Theme } from '../hooks/useTheme'
import { useTextScramble } from '../hooks/useTextScramble'
import type { RevealOrigin, TransitionStyle } from './transition'

/**
 * The outgoing page, frozen and being carried away.
 *
 * It exists because animating away requires a live element: once React unmounts
 * the old tree there is nothing left to animate, so anything present in the old
 * structure but missing from the new one would just vanish. Keeping a snapshot
 * on top lets it leave as a whole — which covers *any* structural difference
 * without diffing anything element by element.
 *
 * How it leaves is the `style`: `reveal` opens a circular hole out of the
 * portfolio toggle, `glitch` and `crossfade` dissolve and fade.
 *
 * It carries the OUTGOING palette in its own `data-theme`, which is why it is
 * portalled to `<body>`: it has to sit outside the live page's theme scope,
 * since an element cannot un-inherit an ancestor's theme. That is also why it
 * takes the reveal variables and duration as props rather than reading them
 * from an ancestor — out here there is no ancestor to inherit them from.
 *
 * The clone is appended into a host div rather than rendered by React, because
 * React cannot adopt an existing DOM node.
 */
export function GlitchGhost({
  clone,
  duration,
  style,
  theme,
  origin,
}: {
  clone: HTMLElement
  duration: number
  style: TransitionStyle
  theme: Theme
  origin: RevealOrigin | null
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

  /*
   * For `glitch` and `crossfade` the outgoing page churns into noise as it
   * fades, which is what makes a structural change read as a transformation
   * rather than a cut.
   *
   * The reveal deliberately does NOT do this. There the outgoing page is simply
   * wiped away, and the churn belongs to the page arriving instead: the
   * incoming content resolves out of noise as the hole opens over it. Churning
   * the outgoing page would put the effect on the screen that is leaving, which
   * is the opposite of what the wipe is for — see ModeTransition.
   */
  useTextScramble({
    resolveContainers: () => [hostRef.current],
    active: style !== 'reveal',
    mode: 'dissolve',
    duration,
  })

  const layerStyle = {
    '--ghost-duration': `${duration}ms`,
    // The CSS defaults only apply if a transition somehow ran without an origin.
    ...(origin
      ? {
          '--reveal-x': `${origin.x}px`,
          '--reveal-y': `${origin.y}px`,
          '--reveal-max-radius': `${origin.radius}px`,
        }
      : {}),
  } as CSSProperties

  /*
   * Rendered into <body> rather than in place, so the ghost is a sibling of the
   * theme scope instead of a descendant of it. Portalling needs a real DOM node
   * to render into, and this only ever runs in the browser.
   */
  return createPortal(
    <div
      className="glitch-ghost"
      data-style={style}
      data-theme={theme}
      style={layerStyle}
      aria-hidden="true"
    >
      <div className="glitch-ghost__host" ref={hostRef} />
    </div>,
    document.body,
  )
}
