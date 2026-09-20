import { ArrowUp } from 'lucide-react'
import { profile } from '../data/resume'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} {profile.name}. Built with React,
          TypeScript &amp; Tailwind CSS.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
        >
          Back to top
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
