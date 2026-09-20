import { DevTransitionSwitcher } from './components/DevTransitionSwitcher'
import { Footer } from './components/Footer'
import { ModeTransition } from './components/ModeTransition'
import { Navbar } from './components/Navbar'
import { PortfolioProvider } from './components/PortfolioProvider'
import { Sections } from './components/Sections'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <PortfolioProvider>
      <div className="min-h-screen" data-app-root="">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-neutral-900"
        >
          Skip to content
        </a>

        {/*
         * The navbar sits outside ModeTransition: it owns menu state, and it
         * animates its own labels rather than remounting with the page.
         */}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/*
         * Which sections render comes from the active content pack, so the two
         * jobs can differ structurally — see Sections.tsx.
         */}
        <ModeTransition>
          <Sections />
        </ModeTransition>

        <Footer />
        <DevTransitionSwitcher />
      </div>
    </PortfolioProvider>
  )
}

export default App
