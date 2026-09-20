import { useState } from 'react'
import { profile } from '../data/resume'
import { useParallax } from '../hooks/useParallax'

/** "Ryan Vyas" -> "RV" */
function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * The hero portrait: a cut-out (transparent background) image that drifts and
 * scales as you scroll, sitting on a soft glow so it separates from the page.
 *
 * Sized to stay near the source's native resolution — the supplied photo is
 * only ~370px square, so pushing it much larger than this goes soft. Replace
 * `public/portrait.png` (and `portrait.webp`) with a higher-resolution cut-out
 * to scale the treatment up.
 *
 * Falls back to a monogram if the image is missing, so the layout never shows
 * a broken image.
 */
export function Portrait() {
  const [hasFailed, setHasFailed] = useState(false)
  const parallaxRef = useParallax<HTMLDivElement>()
  const showImage = Boolean(profile.photoUrl) && !hasFailed

  if (!showImage) {
    return (
      <div className="flex justify-center pb-10">
        <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 sm:h-48 sm:w-48 dark:border-white/10 dark:bg-white/[0.03]">
          <span
            role="img"
            aria-label={`${profile.name} monogram`}
            className="text-4xl font-normal tracking-tight text-neutral-400 sm:text-5xl dark:text-neutral-600"
          >
            {initialsOf(profile.name)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex justify-center">
      {/* Soft light behind the subject so the cut-out reads against the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70%] w-[130%] max-w-[560px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.07),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.10),transparent_70%)]"
      />

      <div ref={parallaxRef} className="relative">
        <picture>
          <source srcSet="/portrait.webp" type="image/webp" />
          <img
            src={profile.photoUrl}
            alt={`Portrait of ${profile.name}`}
            onError={() => setHasFailed(true)}
            className="block w-[240px] max-w-full select-none sm:w-[300px] lg:w-[340px]"
          />
        </picture>
      </div>
    </div>
  )
}
