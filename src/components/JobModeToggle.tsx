import { Code, Dog } from 'lucide-react'
import { contentPacks } from '../data'
import { usePortfolio } from './portfolioContext'

/**
 * Flips the site between the software and dog training portfolios.
 *
 * The icon reflects where you *are*: `<>` on the software page, a dog on the
 * trainer page. Both icons stay mounted so the swap can cross-fade and rotate
 * instead of popping.
 *
 * Coloured with the accent ramp in dark mode — one of only two places the
 * accent appears, so it reads as a deliberate highlight. Light mode uses near
 * black instead: the amber is too low-contrast on the light background at this
 * size, and a dark glyph simply reads better there.
 *
 * Sits left of the name in the navbar. `onSwitch` lets the navbar close its
 * mobile menu from the click itself, rather than reacting to the content
 * changing after the fact.
 */
export function JobModeToggle({ onSwitch }: { onSwitch?: () => void }) {
  const { job, targetJob, toggleJob } = usePortfolio()

  /**
   * The icon follows `job` — the page actually on screen — so it can never
   * advertise a mode the page is not in. The accessible name describes what
   * clicking *does*, which is why it reads from `targetJob`: that one flips
   * immediately on click, whereas `job` deliberately lags until the swap.
   */
  const showDog = job === 'dog'
  const destination = targetJob === 'dog' ? 'software' : 'dog'
  const destinationLabel = contentPacks[destination].label

  return (
    <button
      type="button"
      onClick={() => {
        toggleJob()
        onSwitch?.()
      }}
      aria-label={`Switch to the ${destinationLabel} portfolio`}
      title={`Switch to the ${destinationLabel} portfolio`}
      className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-900 transition-colors hover:bg-neutral-200/60 dark:text-accent-400 dark:hover:bg-accent-400/10 dark:hover:text-accent-300"
    >
      <span className="relative block h-[18px] w-[18px]">
        <Code
          aria-hidden="true"
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ${
            showDog ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <Dog
          aria-hidden="true"
          className={`absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ${
            showDog ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'
          }`}
        />
      </span>
    </button>
  )
}
