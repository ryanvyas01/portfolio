import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_JOB_MODE, JOB_MODES, type JobMode } from '../data'

const STORAGE_KEY = 'portfolio-job-mode'

/**
 * Which job the site is showing. Remembered like the theme, so someone who
 * arrives on the dog training side stays there on their next visit.
 */
function getInitialJobMode(): JobMode {
  if (typeof window === 'undefined') {
    return DEFAULT_JOB_MODE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return JOB_MODES.includes(stored as JobMode) ? (stored as JobMode) : DEFAULT_JOB_MODE
}

export function useJobMode() {
  const [mode, setMode] = useState<JobMode>(getInitialJobMode)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const toggleMode = useCallback(() => {
    setMode((current) => (current === 'software' ? 'dog' : 'software'))
  }, [])

  return { mode, setMode, toggleMode }
}
