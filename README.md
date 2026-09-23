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
tree. A pack also lists `enabledSections`, which defines **both membership and
page order** — the nav is a projection of that one field, so the two cannot
disagree about either what a page shows or what order it shows it in.

`scripts/make-portrait.py` and the styling below are shared; only the copy and
the section list change.

The two portfolios tell different stories in different sequences, which is why
the order is per-pack rather than global:

| | software | dog training |
| --- | --- | --- |
| Sections | about, experience, education, skills, projects, contact | about, how it works, specialties, programs, contact |

> **The dog training pack is written and real, with one exception.** Everything
> except **Programs** came from Ryan directly — no experience, credentials, or
> clients were invented, and there is deliberately no certification because he
> does not hold one. Programs is still scaffolding: find the remaining
> placeholders with `rg "TODO:" src/data/dogTraining.ts`. Testimonials have a
> section but no quotes yet, so the section is built and left disabled.

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

One more thing the site needs before it can be called finished: **the contact
destinations**. Both are optional and both are unset, so the contact sections work
but are not yet wired to an inbox or a calendar. See [Contact](#contact) for what
each falls back to and what to add.

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

### Theme

The theme is not a preference — each portfolio owns a palette:

| Job      | Theme |
| -------- | ----- |
| software | dark  |
| dog      | light |

There is no theme toggle. A job switch is therefore always a theme switch.

There is no palette fade either. The theme is set as `data-theme` on a scope
element rather than a class on `<html>`, specifically so that **two palettes can
exist at once**: during a switch the ghost holds the *outgoing* palette while the
page underneath already holds the incoming one. The wipe therefore reveals a real
dark-to-light change instead of two copies of the same scheme.

An earlier version went the other way and eased every colour in the document with
a `*` transition, so that the ghost could cross the palette together with the
live page. That was measured at **~318ms of style recalculation** in a single
switch — animating all ~776 layout objects across a 7,700px document, doubled by
the ghost's clone — and was what made the switch feel laggy. The mask itself cost
~29ms. Scoping `data-theme` removed the need for the fade entirely.

Tailwind's dark variant is keyed on `[data-theme='dark']` rather than a `.dark`
class for the same reason: an ancestor class cannot be *removed* by a descendant,
so a single root-level class can only ever express one theme at a time.

The page background is painted on `<html>` by the inline script in `index.html` so
it never flashes the wrong colour before first paint; `useTheme` re-applies the
exact token value once mounted. That script duplicates the job → theme mapping
deliberately, since it has to run before the bundle loads, so **changes must be
made in both `index.html` and `src/hooks/useTheme.ts`.**

## Transitions and sound

Switching portfolios plays a transition that swaps the content mid-flight. Both
directions play a short sound:

| Direction         | Sound            |
| ----------------- | ---------------- |
| software → dog    | a dog bark       |
| dog → software    | a sweep of air   |

A mute button in the header controls both, and the preference is remembered.

**How a structural change is hidden.** The outgoing page is snapshotted into an
inert clone before anything changes, and that clone is the *ghost* — it sits on
top and is carried away while the incoming page mounts underneath. Anything the
new page does not have leaves with the ghost, so the two portfolios can differ
structurally without a hard cut. See
[`GlitchGhost.tsx`](src/components/GlitchGhost.tsx) and
[`useTextScramble.ts`](src/hooks/useTextScramble.ts).

**Three styles, differing only in how the ghost leaves:**

| Style       | How it leaves                                                  | Where the text churn runs            | Default |
| ----------- | -------------------------------------------------------------- | ------------------------------------ | ------- |
| `reveal`    | A circular hole opens out of the portfolio toggle and erases it | the incoming page, during the wipe   | yes     |
| `glitch`    | Its text dissolves into glyph noise, then the layer fades       | the outgoing page, into the noise    | no      |
| `crossfade` | The same model without the text churn                           | —                                    | no      |

`reveal` is the default because the theme is locked to the job, so every switch
is also a palette change — and a wipe from the control that was clicked suits a
change that size better than a fade.

The churn belongs to the page *arriving* for a reveal, and runs while the ghost is
still up, so the opening hole progressively reveals it instead of it starting once
the hole is already open. That is also why `reveal` suppresses the incoming page's
`content-in` fade and the handover flash: by then the hole has already revealed the
page, so fading it in again would blank it and split one motion into two. The
outgoing page is simply wiped away, unchurned.

It is a **mask on the ghost**, not a View Transition: a radial gradient whose
inner stop is `transparent` punches a growing hole in the layer. The radius is
animated by a registered custom property (`@property --reveal-radius`), because
unregistered custom properties cannot be interpolated. The origin is measured
from the portfolio toggle's client rect at click time — the provider queries
`[data-job-toggle]` rather than each caller passing coordinates, so the navbar
toggle and the dev panel's replay button start from the same place.

`glitch` and `crossfade` remain selectable from the dev-only panel in the
bottom-right corner, along with a replay button. That panel does not ship in a
production build.

### Audio licensing

Both sounds are **CC0 (public domain)** from [BigSoundBank](https://bigsoundbank.com/)
by Joseph Sardin, so no attribution is required — but recorded here anyway:

| File                  | Source                          |
| --------------------- | ------------------------------- |
| `public/bark.mp3`     | "Barking of a Spitz" (#0682)    |
| `public/sweep.mp3`    | "Whoosh #5" (#1797)             |

Each is trimmed at load time to its busiest fraction of a second, so replacing
either file is all that is needed to change the sound — see
[`src/lib/audioSample.ts`](src/lib/audioSample.ts). The sweep is shorter than
the trim window, so it is used whole rather than sliced. If `bark.mp3` is
missing the bark falls back to a synthesiser; the sweep stays silent rather than
faking it.

## Contact

Each portfolio decides how a visitor gets in touch, declared by `contactChannel`
in its pack — see `ContactChannel` in [`src/data/types.ts`](src/data/types.ts):

| Job      | Channel          | Wants                        |
| -------- | ---------------- | ---------------------------- |
| software | a message form   | `endpoint` — a Formspree URL |
| dog      | Calendly, inline | `url` — a scheduling link    |

The channel is a discriminated union rather than a pair of optional fields, so a
pack cannot declare both at once or neither.

**Both destinations are optional, and neither is set yet.** The frontend is
complete without them, and each channel degrades rather than pretending to work:

- **The form** still validates and composes, then hands off to the visitor's mail
  client and says so on the confirmation screen. Adding `endpoint` turns it into a
  real `POST` and nothing else changes. It also carries a hidden `_gotcha` field as
  a honeypot, tripped silently — Formspree filters on that same field server-side.
- **Calendly** has nothing to frame with no `url`, so the section shows the email
  link on its own. In development a dashed placeholder marks where the calendar
  will land, so the layout can still be judged; it sits behind
  `import.meta.env.DEV` and is not in a production build.

The calendar is a plain `iframe` rather than Calendly's embed script: no
third-party JavaScript on page load, no dependency, and `loading="lazy"` keeps it
off the critical path until the visitor scrolls to the section. The cost is a fixed
height, because Calendly's script measures its own content and a cross-origin frame
cannot.

## Project structure

```
src/
  data/                 Content packs — see "Two portfolios"
  components/           One component per section, plus shared UI
    Process.tsx         The numbered "how it works" steps
    Testimonials.tsx    Client quotes; renders nothing when there are none
    Contact.tsx         Per-job contact channel plus the direct routes
    ContactForm.tsx     Message form: validation, states, and a honeypot
    CalendlyEmbed.tsx   Inline booking calendar
  hooks/
    useTheme.ts         Locks the palette to the active job
    useJobMode.ts       Which portfolio is active (remembers the choice)
    useActiveSection.ts Highlights the nav link for the section in view
    useHoverMotion.ts   Pointer-driven lift/scale used by the hero portrait
    useTextScramble.ts  Sweeps all visible text between real text and glyphs
    useSound.ts         Mute preference for the transition sounds
  lib/
    audioSample.ts      Fetch, trim, and play a short audio slice
    bark.ts             The bark sample
    sweep.ts            The air sweep sample
  App.tsx               Composes the navbar, transition, sections, and footer
  index.css             Tailwind import, design tokens, and base styles
```

## Notes

- Design choices favour accessibility: honest heading order, `aria-label`s on
  icon-only buttons, a skip link for keyboard users, and `prefers-reduced-motion`
  support. Body copy meets WCAG AA contrast in both themes.
- The site is fully responsive; the header links collapse into a menu on mobile.
