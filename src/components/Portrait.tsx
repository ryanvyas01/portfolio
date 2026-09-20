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
    <div className="relative shrink-0">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-full bg-accent-500/20 blur-3xl"
      />

      <div className="relative h-44 w-44 overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200 ring-offset-4 ring-offset-white sm:h-52 sm:w-52 dark:bg-slate-900 dark:ring-slate-800 dark:ring-offset-slate-950">
        {showImage ? (
          <img
            src={profile.photoUrl}
            alt={`Portrait of ${profile.name}`}
            onError={() => setHasFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-500/20 to-accent-700/20"
            role="img"
            aria-label={`${profile.name} monogram`}
          >
            <span className="text-5xl font-bold tracking-tight text-accent-700 sm:text-6xl dark:text-accent-300">
              {initialsOf(profile.name)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
