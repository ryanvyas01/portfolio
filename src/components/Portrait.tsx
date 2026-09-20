import { useState } from 'react'
import { profile } from '../data/resume'

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
 * Shows the headshot from `profile.photoUrl`. If that file is missing (or
 * fails to load) it falls back to a monogram, so the layout never shows a
 * broken image. Drop a square photo in `public/` to replace the fallback.
 */
export function Portrait() {
  const [hasFailed, setHasFailed] = useState(false)
  const showImage = Boolean(profile.photoUrl) && !hasFailed

  return (
    <div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 sm:h-48 sm:w-48 dark:border-white/10 dark:bg-white/[0.03]">
      {showImage ? (
        <img
          src={profile.photoUrl}
          alt={`Portrait of ${profile.name}`}
          onError={() => setHasFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          role="img"
          aria-label={`${profile.name} monogram`}
        >
          <span className="text-4xl font-normal tracking-tight text-neutral-400 sm:text-5xl dark:text-neutral-600">
            {initialsOf(profile.name)}
          </span>
        </div>
      )}
    </div>
  )
}
