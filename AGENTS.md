# AGENTS.md

Guidance for AI coding agents (and humans) working in this repository.

## What this is

**Alix Abroad** — a static photography portfolio site for one person's travel
photos, deployed via GitHub Pages at the repo's project URL
(`tuttijonson.github.io/mini-project/`). Read `PRD.md` and `PROPOSAL.md` first —
they're the source of truth for scope, design direction, and acceptance
criteria. This file only covers *how the code is built*, not what it should do.

## Stack and constraints

- **Plain HTML/CSS/JS. No framework, no build step, no package manager.**
  There is no `package.json` and none should be added. Pages are hand-authored
  `.html` files at the repo root; nothing is generated.
- **One stylesheet**: `css/style.css`, linked identically from every page.
  Don't add a second stylesheet or any inline `<style>`/`style="..."` — this is
  an explicit, repeatedly-verified requirement.
- **One shared script**: `js/site.js`, linked from every page. It's written so
  every feature (theme toggle, scroll progress, carousel, cursor trail)
  no-ops safely if its markup isn't present on a given page — keep new
  features following that same guard pattern (`if (!el) return;`) so the one
  file stays safe to include everywhere.
- **Layout**: CSS Grid for two-dimensional layouts (homepage puzzle, editorial
  photo grid), Flexbox for one-dimensional ones (nav, panels).
- **Semantic HTML on every page**: `<header>`, `<nav>`, `<main>`, `<section>`,
  `<footer>`. Don't reach for generic `<div>` soup where a semantic tag fits.

## Design system — do not introduce new colors

Every color on the site is one of the 9 CSS custom properties defined in
`:root` at the top of `css/style.css` (`--pink`, `--yellow`, `--green`,
`--blue`, `--orange`, `--cream`, `--brown`, `--ink`, `--bg`). This has been an
explicit, repeated constraint across iterations:

- Dark mode (`:root[data-theme="dark"]`) just **swaps** `--bg`/`--ink` — it
  does not add new hex values.
- The cursor trail and scroll-progress bar read palette values live from CSS
  (`getComputedStyle(...).getPropertyValue('--pink')`, etc.) rather than
  hardcoding hex strings, so they never drift from the CSS source of truth.
- The only hex values outside `:root` should be `#fff` (white text/UI over
  photos) — grep `css/style.css` for `#[0-9A-Fa-f]` and sanity-check this
  before committing CSS changes.
- Each destination has an identity color reused across the site: Hong
  Kong = pink, Tokyo = blue, Seoul = yellow, Mount Kinabalu = brown,
  Sydney = orange. It's expressed as the homepage tile's hover accent and as
  the trip page's photo frame border (`.trip--<color>` class on `<main>`).

## Page inventory & template pattern

```
index.html            Homepage: 12-piece CSS Grid puzzle (5 photo + 7 decorative tiles)
about.html             About Me (placeholder body — real content not written yet)
contact.html           Contact (placeholder body — real content not written yet)
hong-kong.html         5 trip pages, all built from one shared template:
tokyo.html               hero photo w/ overlaid title → interactive photo
seoul.html               carousel (stage + thumbnails) → side text panel
mount-kinabalu.html      (name, location, draft intro copy)
sydney.html
css/style.css          The one stylesheet
js/site.js             The one script: theme toggle, scroll progress,
                        carousel, cursor trail — each self-guarding
images/<destination>/  Web-sized JPGs actually used by the site
assets/raw/             Original, unprocessed photos — never referenced
                        directly from HTML; source material only
```

There is no templating engine, so the 5 trip pages are literal copies of the
same structure with `hong-kong`/`tokyo`/etc. and `trip--pink`/`trip--blue`/etc.
swapped. When changing the trip template, changes must be applied to **all
five** trip `.html` files by hand — there's no single place to edit once.

Trip page intro paragraphs are marked with an
`<!-- DRAFT COPY: replace with Alix's own words -->` comment — these are
placeholder text, not Alix's real reflections. Don't remove that comment
without replacing the copy with something actually supplied by her. Same idea
for `[Add travel dates]` placeholders in the trip panels.

## Images

Raw/original photos live in `assets/raw/<destination>/` and are never linked
from HTML directly — they're 3–6MB originals. Before using a photo on a page,
process a web-sized copy into `images/<destination>/` with `sips` (already
confirmed available in this environment), e.g.:

```
sips -Z 1600 -s format jpeg -s formatOptions 75 assets/raw/<dest>/IMG_1234.JPG --out images/<dest>/hero.jpg
```

Rough sizing conventions already in use: homepage tile photos ~1200px long
edge/q70, trip hero ~1800px/q75, gallery/carousel images ~1400px/q72.

## Verifying changes

There's no test suite. To check a change:

1. Serve the repo root locally, e.g. `python3 -m http.server 8123`, and open
   pages in a browser (or drive headless Chromium via Playwright if
   available — that's how prior iterations caught real bugs, like a pointer-
   capture conflict that silently broke the carousel's arrow buttons, and a
   CSS grid/flex height mismatch that broke the homepage's "no scroll"
   requirement).
2. Re-run these checks after any HTML/CSS change:
   - Exactly one `<link rel="stylesheet">` per page, no inline styles.
   - All five semantic tags present on every page.
   - `grep -n "#[0-9A-Fa-f]\{3,6\}" css/style.css` — only `:root` values and
     `#fff` should appear.
3. For the homepage specifically: at common desktop heights, confirm
   `document.documentElement.scrollHeight === window.innerHeight` (the puzzle
   must never require scrolling). On mobile widths, confirm the two-column
   mosaic and that nothing overlaps.
4. For trip pages: confirm the carousel's arrows/thumbnails/keyboard/drag all
   work, the frame color matches that destination's identity color, and dark
   mode only swaps `--bg`/`--ink` (no new colors appear).

## Deployment

GitHub Pages, served from this repo directly (no build/deploy step) — commit
the actual `.html`/`.css`/`.js`/`images/` files as the live site.
`.nojekyll` is present so GitHub Pages serves files as-is.
