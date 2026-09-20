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

## Two portfolios

The site switches between two complete portfolios — software engineering and
dog training — via the icon button to the left of the name in the header. The
icon shows the portfolio you are currently on, and the choice is remembered.

Content lives in **content packs**, and only one is rendered at a time:

```
src/data/
  types.ts          Shared types, the canonical section ids, PortfolioContent
  software.ts       The software engineering portfolio
  dogTraining.ts    The dog training portfolio
  index.ts          contentPacks registry, nav derivation
```

Each pack supplies every piece of text **and** the per-section headings, so the
two jobs can word the same sections differently while sharing one component
tree. A pack also lists `enabledSections`, which is how the trainer page omits
sections that do not apply to it — the nav and the page both read from that one
field, so they cannot drift apart.

`scripts/make-portrait.py` and the styling below are shared; only the copy and
the section list change.

> **The dog training pack is scaffolded, not written.** Every value is a marked
> placeholder. Find them with `rg "TODO:" src/data/dogTraining.ts`; each states
> what belongs there. Nothing in it is a real claim about experience,
> credentials, or pricing.

Adding a third job means one new pack plus a member on the `JobMode` type.

## Making it yours

**Content lives in the content packs under [`src/data/`](src/data/)** — see
above. You should not need to edit anything in `src/components/`.

Two asset files are referenced:

1. **Résumé PDF** — `public/resume.pdf` is **not present**, so the "Download
   résumé" button returns a 404. Drop the PDF in to fix it.
2. **Portrait** — `public/portrait.png` and `public/portrait.webp` are a
   background-removed cut-out of the photo, shown in the hero. Regenerate them
   from the original with:

   ```bash
   pip install rembg onnxruntime pillow numpy
   python scripts/make-portrait.py path/to/original.jpg
   ```

   The script upscales first, mattes with BiRefNet, decontaminates the edge
   colours so no background halo survives, then downscales — see the docstring
   for why the order matters. The `.webp` is what browsers actually serve; the
   `.png` is the fallback, so both are written.

   A source around 400×400 was enough because the script upscales before
   segmenting, but a higher-resolution original will always give a better
   result. For reference, the current source renders at 420px wide.

Also worth updating:

- The `<title>` and `<meta description>` in `index.html`.
- `public/favicon.svg` — currently the default Vite icon.

## Design system

The look is deliberately near-monochrome, and a few decisions carry it:

- **Typography does the work.** Headings are large, at a *regular* (400) weight
  with tight negative tracking (`-0.025em`). Making them bold undoes the effect.
- **Neutral greys, not slate.** Slate carries a blue cast; the `neutral-*` scale
  keeps the palette properly monochrome.
- **Accent is a garnish, not a theme.** `accent-*` appears in only three places:
  the dot after the name in the header, the job-mode icon in dark mode, and
  focus rings. Using it on buttons, links, or headings breaks the restraint that
  makes the design read as considered. (In light mode that icon is near-black
  instead, because the amber is too low-contrast against the light background at
  that size.)
- **Surfaces are translucent**, not solid cards — see the `.surface` utility in
  [`src/index.css`](src/index.css).
- **Radii are small** (`rounded-lg`, 8px), never pills.

To re-theme the highlight colour, edit the `--color-accent-*` ramp in
[`src/index.css`](src/index.css); every use updates at once.

The hero portrait responds to the pointer: on hover it eases upward, scales
slightly, and leans a few pixels toward the cursor. See
[`src/hooks/useHoverMotion.ts`](src/hooks/useHoverMotion.ts). The motion is
interpolated toward its target rather than snapped, and the animation loop parks
itself once everything settles so an idle page costs nothing. It is skipped
entirely under `prefers-reduced-motion` and on devices without a real pointer.

Its edges are dissolved into the page by a feathered rectangular mask — two
linear gradients combined with `mask-composite: intersect`, so the masked region
stays square instead of circular — see the `.portrait-fade` utility in
[`src/index.css`](src/index.css).
It carries no drop shadow on purpose: a broad shadow read as haze around the
subject in light mode and as grime in dark mode, so the feathered edge does the
separating instead. The portrait assets are cut-outs with generous empty margin,
which is what the fade dissolves into; regenerating without that padding will
make the mask clip the subject.

Dark mode is the default. Light mode is used only after an explicit toggle, and
that choice is remembered on future visits.

## Transitions and sound

Switching portfolios plays a transition that swaps the content mid-flight. Both
directions cross-fade by default, and both play a short sound:

| Direction         | Sound            |
| ----------------- | ---------------- |
| software → dog    | a dog bark       |
| dog → software    | a burst of typing |

A mute button in the header controls both, and the preference is remembered.

**How a structural change is hidden.** The outgoing page is snapshotted into an
inert clone before anything changes, and that clone is the *ghost* — it sits on
top, its text dissolves into glyph noise, and the whole layer fades away while
the incoming page mounts underneath. Anything the new page does not have fades
out with the ghost, so the two portfolios can differ structurally without a hard
cut. See [`GlitchGhost.tsx`](src/components/GlitchGhost.tsx) and
[`useTextScramble.ts`](src/hooks/useTextScramble.ts).

A `glitch` style (slice displacements plus a full-text scramble) is also
implemented and selectable from the dev-only panel in the bottom-right corner,
along with a replay button. That panel does not ship in a production build.

### Audio licensing

Both sounds are **CC0 (public domain)** from [BigSoundBank](https://bigsoundbank.com/)
by Joseph Sardin, so no attribution is required — but recorded here anyway:

| File                  | Source                          |
| --------------------- | ------------------------------- |
| `public/bark.mp3`     | "Barking of a Spitz" (#0682)    |
| `public/keyboard.mp3` | "Computer Keyboard" (#0229)     |

Both are trimmed at load time to their busiest fraction of a second, so
replacing either file is all that is needed to change the sound — see
[`src/lib/audioSample.ts`](src/lib/audioSample.ts). If `bark.mp3` is missing the
bark falls back to a synthesiser; the keyboard stays silent rather than faking
it.

## Project structure

```
src/
  data/                 Content packs — see "Two portfolios"
  components/           One component per section, plus shared UI
  hooks/
    useTheme.ts         Light/dark mode (remembers the choice)
    useJobMode.ts       Which portfolio is active (remembers the choice)
    useActiveSection.ts Highlights the nav link for the section in view
    useHoverMotion.ts   Pointer-driven lift/scale used by the hero portrait
    useTextScramble.ts  Sweeps all visible text between real text and glyphs
    useSound.ts         Mute preference for the transition sounds
  lib/
    audioSample.ts      Fetch, trim, and play a short audio slice
    bark.ts             The bark sample
    keyboard.ts         The typing sample
  App.tsx               Composes the navbar, transition, sections, and footer
  index.css             Tailwind import, design tokens, and base styles
```

## Notes

- Design choices favour accessibility: honest heading order, `aria-label`s on
  icon-only buttons, a skip link for keyboard users, and `prefers-reduced-motion`
  support. Body copy meets WCAG AA contrast in both themes.
- The site is fully responsive; the header links collapse into a menu on mobile.
