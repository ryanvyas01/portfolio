import { ArrowUp } from 'lucide-react'
import { profile } from '../data/resume'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200/80 dark:border-white/[0.07]">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
