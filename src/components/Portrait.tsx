import { useState } from 'react'
import { profile } from '../data/resume'
import { useHoverMotion } from '../hooks/useHoverMotion'

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
 * The hero portrait: a cut-out image whose edges dissolve into the page via a
 * feathered circular mask. On hover it eases up, scales slightly, and leans
 * toward the cursor.
 *
 * The transform sits on an outer wrapper rather than on the masked image, so
 * the masked subtree is rasterised once into a layer and the motion just moves
 * that layer, keeping it cheap.
 *
 * No drop shadow: against the light page a broad shadow read as haze around the
 * subject rather than depth, and against the dark page it read as grime. The
 * feathered edge is what separates the portrait from the background.
 *
 * Falls back to a monogram if the image is missing, so the layout never shows a
 * broken image.
 */
export function Portrait() {
  const [hasFailed, setHasFailed] = useState(false)
  const motionRef = useHoverMotion<HTMLDivElement>()
  const showImage = Boolean(profile.photoUrl) && !hasFailed

  if (!showImage) {
    return (
      <div className="flex justify-center pb-10">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 sm:h-48 sm:w-48 dark:border-white/10 dark:bg-white/[0.03]">
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
      <div ref={motionRef} className="relative">
        <picture>
          <source srcSet="/portrait.webp" type="image/webp" />
          <img
            src={profile.photoUrl}
            alt={`Portrait of ${profile.name}`}
            onError={() => setHasFailed(true)}
            className="portrait-fade block w-[300px] max-w-full select-none sm:w-[370px] lg:w-[440px]"
          />
        </picture>
      </div>
    </div>
  )
}
