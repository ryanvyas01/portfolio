# Personal Portfolio

A one-page portfolio site built as an in-depth version of my résumé. Clicking a
link in the header scrolls to that section.

## Built with

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server and build tool
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting started

```bash
npm install     # first time only
npm run dev     # start the dev server
```

Then open the URL it prints (usually <http://localhost:5173>). The page reloads
automatically whenever you save a file.

Other commands:

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run build`   | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally            |
| `npm run lint`    | Run the linter                                |

## Making it yours

**Everything you need to change lives in [`src/data/resume.ts`](src/data/resume.ts).**
Your name, bio, jobs, projects, skills, and contact links are all defined there.
You should not need to edit anything in `src/components/`.

Two asset files are referenced but not yet present:

1. **Your résumé PDF** — drop it into `public/` as `resume.pdf`. Until then the
   "Download résumé" button returns a 404.
2. **Your photo** — drop a square image into `public/` as `portrait.jpg`. Until
   then the hero renders a monogram of your initials.

Also worth updating:

- The `<title>` and `<meta description>` in `index.html`.
- `public/favicon.svg` — currently the default Vite icon.

## Design system

The look is deliberately near-monochrome, and a few decisions carry it:

- **Typography does the work.** Headings are large, at a *regular* (400) weight
  with tight negative tracking (`-0.025em`). Making them bold undoes the effect.
- **Neutral greys, not slate.** Slate carries a blue cast; the `neutral-*` scale
  keeps the palette properly monochrome.
- **Accent is a garnish, not a theme.** `accent-*` appears only for the dot after
  the name in the header and for focus rings. Using it on buttons, links, or
  headings breaks the restraint that makes the design read as considered.
- **Surfaces are translucent**, not solid cards — see the `.surface` utility in
  [`src/index.css`](src/index.css).
- **Radii are small** (`rounded-lg`, 8px), never pills.

To re-theme the highlight colour, edit the `--color-accent-*` ramp in
[`src/index.css`](src/index.css); every use updates at once.

Dark mode is the default. Light mode is used only after an explicit toggle, and
that choice is remembered on future visits.

## Project structure

```
src/
  data/resume.ts        All site content — edit this
  components/           One component per section, plus shared UI
  hooks/
    useTheme.ts         Light/dark mode (remembers the choice)
    useActiveSection.ts Highlights the nav link for the section in view
  App.tsx               Composes the navbar, sections, and footer
  index.css             Tailwind import, design tokens, and base styles
```

## Notes

- Design choices favour accessibility: honest heading order, `aria-label`s on
  icon-only buttons, a skip link for keyboard users, and `prefers-reduced-motion`
  support. Body copy meets WCAG AA contrast in both themes.
- The site is fully responsive; the header links collapse into a menu on mobile.
