import { useEffect, useMemo, useState } from 'react'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import { JobModeToggle } from './JobModeToggle'
import { usePortfolio } from './portfolioContext'

type NavbarProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const { content, navItems, soundEnabled, toggleSound } = usePortfolio()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /*
   * Memoised so the array identity is stable for a given job. `useActiveSection`
   * re-subscribes whenever its `ids` reference changes, and a fresh array every
   * render would tear down and rebuild the listener on each pass.
   */
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [navItems])
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  const brand = useMemo(() => content.profile.name, [content])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'border-b border-neutral-200/80 bg-neutral-50/80 backdrop-blur-xl dark:border-white/[0.07] dark:bg-neutral-950/80'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6"
      >
        <div className="flex items-center gap-1.5">
          {/* Switching jobs closes the mobile menu, which would otherwise be
              left open showing the previous job's labels. */}
          <JobModeToggle onSwitch={closeMenu} />
          <a
            href="#top"
            onClick={closeMenu}
            className="text-sm font-medium tracking-tight text-neutral-900 transition-opacity hover:opacity-70 dark:text-white"
          >
            {brand}
            {/* The one deliberate flash of colour on the page. */}
            <span className="text-accent-500">.</span>
          </a>
        </div>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-neutral-900 dark:text-white'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-0.5">
          {/* Shown in both jobs, since both directions have a sound. */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute transition sounds' : 'Unmute transition sounds'}
            title={soundEnabled ? 'Mute transition sounds' : 'Unmute transition sounds'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            {soundEnabled ? (
              <Volume2 className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <VolumeX className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 md:hidden dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-neutral-200/80 bg-neutral-50 md:hidden dark:border-white/[0.07] dark:bg-neutral-950">
          <ul className="mx-auto max-w-5xl space-y-1 px-6 py-4">
            {navItems.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-neutral-200/60 text-neutral-900 dark:bg-white/[0.06] dark:text-white'
                        : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
