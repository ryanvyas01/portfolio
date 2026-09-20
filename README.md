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

Two things to add manually:

1. **Your résumé PDF** — drop it in the `public/` folder as `resume.pdf`. It is
   linked by the "Download résumé" button.
2. **Your photo** (optional) — add it to `public/` and reference it from the hero.

Also worth updating:

- The `<title>` and `<meta description>` in `index.html`.
- `public/favicon.svg` — currently the default Vite icon.

Anything marked `TODO` in `resume.ts` is placeholder copy.

## Project structure

```
src/
  data/resume.ts        All site content — edit this
  components/           One component per section, plus shared UI
  hooks/
    useTheme.ts         Light/dark mode (remembers the choice)
    useActiveSection.ts Highlights the nav link for the section in view
  App.tsx               Composes the navbar, sections, and footer
  index.css             Tailwind import, theme, and base styles
```

## Notes

- Dark mode follows your system preference on first visit, then remembers
  whatever you toggle it to.
- Design choices favour accessibility: honest heading order, `aria-label`s on
  icon-only buttons, and a skip link for keyboard users.
- The site is fully responsive; the header links collapse into a menu on mobile.
