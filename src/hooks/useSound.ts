import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-sound'

/**
 * Whether the transition sounds play. On by default — they only ever fire from
 * a deliberate click on the job toggle, never on load or on scroll, and the
 * navbar exposes a mute button that gates both directions.
 */
function getInitialSoundEnabled(): boolean {
  if (typeof window === 'undefined') {
    return true
  }

  return window.localStorage.getItem(STORAGE_KEY) !== 'off'
}

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(getInitialSoundEnabled)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, soundEnabled ? 'on' : 'off')
  }, [soundEnabled])

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => !current)
  }, [])

  return { soundEnabled, setSoundEnabled, toggleSound }
}
