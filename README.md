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

Two asset files are referenced:

1. **Résumé PDF** — `public/resume.pdf` is **not present**, so the "Download
   résumé" button returns a 404. Drop the PDF in to fix it.
2. **Portrait** — `public/portrait.png` and `public/portrait.webp` are a
   background-removed cut-out of the photo, shown in the hero. The `.webp` is
   what browsers actually serve; the `.png` is the fallback. To replace it,
   remove the background elsewhere and export a transparent square image, then
   save both files.

Keep a replacement portrait near its current ~370px. The supplied source was
only 400×400, so a larger export displayed at the same size will look softer,
not sharper.

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

The hero portrait uses a scroll-linked parallax — it scales up slightly and
drifts downward so it lags behind the page, which is what reads as depth. See
[`src/hooks/useParallax.ts`](src/hooks/useParallax.ts); its defaults were
measured off the reference site. The motion is interpolated toward the scroll
position rather than snapped to it, and the animation loop parks itself once the
element settles so an idle page costs nothing. It is skipped entirely under
`prefers-reduced-motion`.

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
    useParallax.ts      Scroll-linked drift/scale used by the hero portrait
  App.tsx               Composes the navbar, sections, and footer
  index.css             Tailwind import, design tokens, and base styles
```

## Notes

- Design choices favour accessibility: honest heading order, `aria-label`s on
  icon-only buttons, a skip link for keyboard users, and `prefers-reduced-motion`
  support. Body copy meets WCAG AA contrast in both themes.
- The site is fully responsive; the header links collapse into a menu on mobile.
