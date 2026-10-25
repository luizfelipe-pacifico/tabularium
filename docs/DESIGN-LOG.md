# Design Log — Public Site

A working log of the marketing/public site (everything outside `src/app/(app)/`): decisions made, why, what changed between iterations, image sources, and open improvement points. `docs/BRANDING.md` stays the prescriptive rulebook; this document is the history and the punch list, updated every time the public site changes materially.

## Current state (2026-10-25), iteration 5

The home page (`/`) is now one long, section-anchored landing page modelled on the owner's other open-source project (same palette and brand system), refined with three design skills installed in `.claude/skills` and pinned in `skills-lock.json`: `impeccable`, Emil Kowalski's `emil-design-eng`, and `design-taste-frontend`. `/recursos`, `/sobre` and `/login` remain as separate routes and share the same primitives.

- **Light-only public site.** The page always renders in the light theme; a few sections are deliberately Ebony (hero, security, the name). `.site-light` on the marketing wrapper re-declares the light tokens so the `.dark` class next-themes sets for the product app cannot leak in. This fixed text that turned light-on-light (contrast 1.02:1) for visitors whose system was in dark mode.
- **Section order on `/`:** hero (Ebony) · O problema · O método (5 steps) · Pontuação (illustrative score sheet) · O sistema hoje (real screen captures carousel) · Seis áreas · Sete pilares (post-MVP roadmap) · Segurança (Ebony) · quote · O nome (Ebony) · Oito pranchas (carousel) · A coleção · Onde estamos (MVP checklist) · closing call. The header links are anchors with a scrollspy.
- **Fields:** Parchment, a lighter surface (`--lp-surface`), a tone band (`--lp-tone`) and Ebony (`--lp-field`), separated by hairlines. Amber text on light fields uses `--amber-ink` (#8a5224, 5.2 to 6:1); filled Amber buttons use `--amber-strong` (#a3622c, white text 4.75:1). Brand Amber (#b8773d) stays for marks, rules and dots.
- **Plates.** Line-art SVGs drawn for Tabularium (`src/components/landing/plates.tsx`): the hero emblem is the brand column on a timeline inside a dial; the Tabularium building has seven columns for the seven pillars; hourglass, ledger, vault, compass, ornament and astrolabe rings. Strokes marked `.plate-draw` draw themselves when their `Reveal` enters the viewport. The 14 hand-inked `.webp` illustrations are numbered I to XIV as "pranchas".
- **Real screens.** `public/assets/landing/screens/*.webp` are captures of the production build at 1440×900 (Visão geral, Demandas ativas, Jornada, Histórico). Screens whose copy cites internal docs (Board, Roadmap, and others) are excluded, and the sample operator name that matches a real person is swapped for a fictional one in the capture only.
- **Honesty rules carried from the reference:** an "Em construção" note in the hero, an "Exemplo ilustrativo" label on the score sheet (the 212 pts example mirrors the dashboard mock), the MVP checklist with real statuses, and a note that the license file does not exist yet.

### Skill gates and documented exceptions

- `design-taste-frontend` lint still flags 12 eyebrows and the 01 to 05 step numbers. Both are part of the owner's reference pattern, so they stay (the skill's own rule: when the brand requires a banned device, keep it and say so).
- `impeccable detect` flags the Amber left rule on the name statement (reference pattern, kept). The 3px top border on step cards became a clipped `::before` cap so the rounded corners stay clean.
- Motion follows `emil-design-eng`: custom ease-out curves, transform and opacity only, press feedback (`scale(0.97)`), hover gated to fine pointers, `prefers-reduced-motion` respected, reveals hidden only under `@media (scripting: enabled)`. The hero title and lead rise without fading so they paint on the first frame (they are the LCP).
- Phones get their own composition: long card runs (areas, pillars, collection) become swipe rows with scroll snap, carousel tabs scroll in one line, the back-to-top button appears only after the first screen.

### Measured (local production build, Lighthouse 12, same engine as PageSpeed Insights)

| Route | Mobile perf | Desktop perf | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | 94 (median of 3) | 100 | 100 | 100 | 100 |
| `/recursos` | 93 | 100 | 100 | 100 | 100 |
| `/sobre` | 95 | 100 | 100 | 100 | 100 |

Baseline before this work (production, `/`): mobile 71 (LCP 4.6s, TBT 490ms), desktop 99, accessibility 96. axe-core contrast audit: 0 AA failures on all public routes at 390 and 1440, with the OS in light and in dark mode (278 before the light-only fix). `experimental.inlineCss` was tried and reverted: it measured worse (LCP 3.3s vs 3.1s).

## Previous state (2026-08-16)

The public site is a small multi-route site instead of one long scrolling page, matching how the product itself works: `docs/SCREENS.md` already treats every app destination as its own route, and the public site follows the same logic.

- `/` — Home. Short hero, a compact explanation of what Tabularium does (demand management with roadmap tracking, not a generic "life organizer"), and a link into the rest of the site.
- `/recursos` — Features, one section per pillar (Board, Journey, Scoring, Operators), grounded in the actual product screens documented in `docs/SCREENS.md`, not invented for the marketing copy.
- `/sobre` — About: what the project is, who it's for, and the real architecture it's built on (PostgreSQL, Prisma, a public roadmap).
- `/login` — stays a standalone page outside the marketing layout (no nav distractions on a conversion page). The button navigates straight to `/dashboard`; real authentication is tracked in `docs/ROADMAP.md`'s MVP checklist, but that engineering detail stays out of the public copy (see "conversion copy" in iteration 3).

Shared chrome (`src/app/(marketing)/layout.tsx`) provides one nav and one footer instead of every route rebuilding its own.

## Section pattern (researched, applied to every route)

Researched current (2026) SaaS marketing site guidance before restructuring the site, rather than guessing at a page shape. The two findings that actually changed something:

- A hero's job is exactly three things: say what the product does, establish it's credible, give one clear next step — not more. ([Lovable: SaaS Website Best Practices](https://lovable.dev/guides/saas-website-best-practices))
- "How it works"/feature content reads best answering the questions a prospect actually has, in the order they come up, rather than a decorative tour — features as modular, evenly-sized cards, not a mixed layout. ([Genesys Growth: B2B SaaS Homepages](https://genesysgrowth.com/blog/designing-b2b-saas-homepages))

Applied as the standard shape every `(marketing)` route follows, in order:

1. **Hero** — one headline, one line of support copy, one primary action. Never a second competing CTA at this level.
2. **What it is, concretely** — the shortest possible grounded explanation, tied to a real product concept (`docs/SCREENS.md`), never generic "boost your productivity" language.
3. **Modular content grid** — feature cards, pillar cards, whatever the page's actual content is; consistent card size and spacing, not a mixed layout.
4. **One supporting image row** — a single photo or two, not a gallery; vintage-treated (see photo treatment below).
5. **Closing CTA** — restates the single action from the hero, doesn't introduce a new one.

A page that doesn't need one of these steps skips it; none are padded in just to match the shape.

## Animation system

Every animation on the public site goes through one of four dependency-free primitives in `src/components/landing/`. Use these, don't hand-roll a new scroll listener or IntersectionObserver — that's exactly the kind of one-off that drifts from the rest of the site.

| Component | File | What it does | Props | When to use it |
| --- | --- | --- | --- | --- |
| `Reveal` | `reveal.tsx` | Fades and slides an element in the first time it scrolls into view (IntersectionObserver, fires once). | `children`, `delay?` (ms), `from?` (`"up"` default, `"left"`, `"right"`), `className?` | Wrap essentially every section-level block — headings, cards, images. This is the default; almost nothing on the page should just pop in unanimated. |
| `Parallax` | `parallax.tsx` | Translates its content vertically at a fraction of scroll speed (rAF-throttled scroll listener), so it drifts slower/faster than the page. | `children`, `speed?` (default `0.3`; use `0.06–0.12` for a subtle effect on a bordered photo, higher only for a full-bleed background), `className?`, `style?` | Wrap hero and section-lead photographs. Keep `speed` low (≤ 0.12) outside a true full-bleed background — this is a vintage site, not a scroll-jacking one. |
| `TiltCard` | `tilt-card.tsx` | Tracks the mouse over the card and applies a 3D `rotateX`/`rotateY` tilt toward the cursor, resetting smoothly on mouse-leave. | `children`, `className?` | Any interactive card in a grid (feature cards, pillar cards). Skip it on plain text blocks or full-width photos — the tilt only reads well on a bounded card. |
| `CountUp` | `count-up.tsx` | Renders the real number on the server, then (below the fold, motion allowed) counts up from 0 the first time it scrolls into view. | `target` (number), `duration?` (ms, default `1600`), `prefix?`, `suffix?` | Only for numbers that are actually true today — a count of real product concepts (features, roadmap pillars, MVP checklist items), never an invented usage metric. See "grounded numbers" below. |

**Grounded numbers rule for `CountUp`:** every number animated with `CountUp` must be independently verifiable by reading `docs/ROADMAP.md` or `docs/SCREENS.md` at the time it's written (e.g. "4 recursos", "7 pilares no roadmap") — not a plausible-sounding usage stat. Iteration 2 cut `CountUp` entirely because its first use (1,280+ tasks, 350+ people) was invented; iteration 3 restores it under this rule instead of removing the technique.

Every `(marketing)` route should use all four where they genuinely fit the content — the animation system exists to be used consistently, not sampled once and forgotten.

## Iteration 2 — corrections from the first pass

The first pass (a single long-scrolling landing page) got explicit feedback to fix:

- **Too much text, too many diminutives.** The first draft leaned hard into "criança de 7 anos" phrasing (tarefinha, casinha, gostinho, coraçãozinho) to the point of reading as baby talk rather than warm-and-simple. Corrected: shorter copy blocks, plain and direct language, diminutives used sparingly rather than as the dominant voice.
- **Hero had too much going on.** Badge, headline, subline, two buttons, and a scroll hint all competed at once. Corrected: one headline, one line of support copy, one primary action.
- **Not vintage enough.** Rounded-full pill buttons, backdrop-blur "glass" panels, and heavy colored drop shadows are contemporary SaaS patterns that contradict `docs/BRANDING.md` directly: it calls for moderate 4–8px radii (not pills, except compact status badges), subtle borders and tonal separation over shadows, and explicitly rules out glassmorphism and glossy gradients. Corrected: rectangular-ish buttons at the brand's `--radius-md`, `--shadow-sm`/`--shadow-md` instead of tinted glow shadows, borders doing the separation work instead of blur.
- **Icon contrast.** The transparent, off-white brand mark (v1) is illegible on light backgrounds — it's meant for the always-dark sidebar. The black alternate (v2) is meant for light backgrounds — the public site and the browser favicon. Fixed: `src/app/favicon.ico` now ships v2 (black); the sidebar logo now points directly at `public/brand/icon-tabularium.png` (v1, off-white) instead of sharing the favicon file; the public site's nav/footer mark uses `public/brand/icon-tabularium-black.png` (v2).
- **Single page → multi-route site.** Broken up as described above.

## Image sources

**Current (iteration 4):** `public/assets/landing/` now holds six custom vintage-illustration `.webp` assets the user generated and supplied directly — hand-inked, parchment-toned archive/instrument illustrations, already in the target aesthetic natively. These replaced the Unsplash hotlinks entirely; every `<Image>` on the public site now points at a local `/assets/landing/*.webp` file, no external image host involved at runtime.

| File | Used on |
| --- | --- |
| `hero-archive-order.webp` | Home hero background (video poster/fallback); Sobre's lead image |
| `feature-organized-records.webp` | Home "Quadro" pillar card; Recursos "Quadro" card and "organização" supporting image |
| `feature-workflow-clarity.webp` | Home "Jornada" pillar card; Recursos "Jornada" card and "planejamento" supporting image |
| `feature-priority-balance.webp` | Home and Recursos "Pontuação" card |
| `feature-team-collaboration.webp` | Recursos "Operadores" card |
| `feature-operational-intelligence.webp` | Home's "roadmap" supporting image |

Because these are native illustrations, not photographs, they are used **without** the `.photo-vintage`/`.photo-vintage-overlay` treatment below — applying a duotone filter to an image that's already hand-inked and parchment-toned double-processes it and muddies the linework. The photo-vintage treatment stays documented and ready for the day a real photograph (not an illustration) needs to go on the site.

`next.config.ts` still allow-lists `images.unsplash.com` — harmless to leave in case a future image genuinely needs a hotlink, but nothing on the site uses it as of this iteration.

**Superseded (iteration 2–3):** the site originally hotlinked Unsplash photographs (team collaborating, organized workspace, sticky notes, desk with flowers) under the Unsplash License. Kept here for the record only, not for reuse: [Team collaborating](https://unsplash.com/photos/team-collaborating-around-a-computer-in-an-office-UikYLDQj9_I), [Organized workspace](https://unsplash.com/photos/a-modern-organized-workspace-with-a-laptop-aN8yRTfGYXY), [Sticky notes](https://unsplash.com/photos/woman-writing-on-colorful-sticky-notes-on-wall-PAYitTwkMwQ), [Desk with flowers](https://unsplash.com/photos/a-desk-with-a-notepad-notebook-and-flowers-AofgbZrFyGA).

Two images from the first draft (the pastel-gradient parallax banner and the "jumping for joy" photo) were dropped along with the sections that used them — see "what got cut" below.

## Photo treatment (vintage LUT)

For an actual **photograph** (not the hand-inked illustrations now used throughout the site — see "Image sources" above), apply this treatment so it reads as one consistent printed plate instead of contemporary stock-photo color grading. Implemented as two layers in `packages/ui/src/styles/globals.css` — a CSS `filter` on the `<Image>` itself, plus a duotone overlay `<div>` — the closest practical equivalent to a LUT without a real color-grading pipeline.

**v2 (current):** a duotone print, not a color-graded photograph. A flat color filter alone (v1, below) still read as "a photo with a filter on it." Duotone — desaturate to near-grayscale, then tint through a blend mode — is how old engravings, letterpress plates, and two-color print runs actually looked, which is a closer match to "vintage" than a warmed-up color photo.

| Layer | Value | Why |
| --- | --- | --- |
| `filter` (on the image) | `grayscale(85%) contrast(118%) brightness(96%)` | Strips almost all color first — duotone only reads correctly starting from a near-grayscale source, otherwise the tint below just muddies the original colors instead of replacing them. Contrast is pushed harder than a color-graded shot would need, to keep midtones legible after tinting. |
| Overlay `background` | `linear-gradient(135deg, var(--ebony), var(--amber))` | The two-color map: shadows pull toward Ebony, highlights toward Amber, both already brand tokens — the tint changes with the palette automatically instead of being hand-picked hex values. |
| Overlay `mix-blend-mode` | `multiply` | The blend mode that actually produces duotone — it multiplies the gradient into the grayscale image instead of sitting on top of it, so dark image regions come out ebony-black and light regions come out warm amber rather than the whole photo looking uniformly tinted. |
| Overlay `opacity` | `50%` (light), `62%` (dark, via `.dark .photo-vintage-overlay`) | Dark mode's background is already dark, so the same overlay needs more strength to keep the duotone from washing out against it. |

```css
.photo-vintage { filter: grayscale(85%) contrast(118%) brightness(96%); }
.photo-vintage-overlay { background: linear-gradient(135deg, var(--ebony), var(--amber)); mix-blend-mode: multiply; opacity: .5; }
.dark .photo-vintage-overlay { opacity: .62; }
```

**v1 (superseded):** `saturate(82%) contrast(106%) brightness(97%) sepia(15%)` with a flat dark-to-transparent overlay wash. Kept here for the record, not for reuse — replaced because it read as a lightly-warmed photograph rather than a vintage plate.

Apply `.photo-vintage` to a real photograph's `<Image>` (an overlay `<div className="photo-vintage-overlay absolute inset-0" />` sits on top, inside the same `relative` wrapper) — **not** to the hand-inked illustrations in `public/assets/landing/`, which are already vintage-styled at the source. Do not tune these filter values per-image; if a specific photo genuinely needs an exception, record it here with the reason rather than silently diverging.

## Icons

Public-site icons are inlined Bootstrap Icons 1.11.3 SVGs (`src/components/landing/bi-icons.tsx`, generated from the official files, paths unmodified), by explicit request, kept separate from the app's `lucide-react` icons (`docs/BEST_PRACTICES.md`). Only add a new one here if the public site genuinely needs it — don't grow this file speculatively.

## What got cut in iteration 2

- The full-bleed parallax "statement" banner and the standalone "joy" section — two extra long-scroll moments that added length without adding information, cut along with "muito texto" feedback.
- The animated count-up stats (1280+ tasks, 350+ people, etc.) — they were invented numbers with no basis in real product data, which reads as marketing filler rather than something grounded in what the product (still pre-MVP, see `docs/ROADMAP.md`) actually does. `CountUp` (`src/components/landing/count-up.tsx`) is kept as a component for when there's a real number to animate.
- Multiple overlapping CTAs in the hero — down to one.

## Iteration 3 — hero video, restored animations, conversion copy

- **Hero video.** Replaced the two-column hero with a full-bleed background media hero (`.hero-media`/`.hero-video`/`.hero-media-still` in `packages/ui/src/styles/globals.css`): a `<video autoPlay muted loop playsInline poster="…">` with a `<source src="/videos/hero.mp4">`, and a sibling still-image div that's hidden by default and shown instead of the video under `@media (prefers-reduced-motion: reduce)` (researched pattern: [Mux — background video performance](https://www.mux.com/articles/add-background-video-website-hls-performance), [Harvard Design System — autoplaying hero video](https://designsystem.harvardsites.harvard.edu/news/2025/02/autoplaying-hero-background-videos-digital-design)). Minimal centered copy over it, two actions below: Entrar (primary) and Contato (`mailto:contato@tabularium.dev` for now — no `/contato` page exists yet).
  - **Blocked:** no video file exists at `/public/videos/hero.mp4` yet. The request was to generate it via a Higgsfield MCP server, but **no such MCP tool is connected in this environment** — `ToolSearch` found nothing matching Higgsfield or video generation. Until either that MCP is connected or a video is supplied another way, the `<source>` 404s silently and the `poster` attribute (a vintage-treated still photo) carries the hero, which is a legitimate permanent fallback per the reduced-motion research above, not just a placeholder.
- **Section pattern, researched.** See "Section pattern" above — applied uniformly to Home/Recursos/Sobre instead of each page inventing its own shape.
- **Animations restored, not re-cut.** Iteration 2 removed `CountUp` outright over the invented-numbers concern; the correct fix was the "grounded numbers" rule (see "Animation system" above), not removing the technique. `CountUp` is back on `/` with three real, checkable numbers (4 recursos, 7 pilares, 9 etapas do MVP — counted directly from `docs/ROADMAP.md` at the time this was written). `Reveal`, `Parallax`, and `TiltCard` remain applied throughout all three routes.
- **Conversion copy, confidence over disclaimers.** The public copy no longer says things like "ainda não existe autenticação real" or "sem um banco de dados real por trás" — technically honest, but self-sabotaging on a site whose job is to convert. Replaced with copy that's still factually defensible (`packages/db` genuinely runs on PostgreSQL/Prisma, `docs/DATA_MODEL.md`/`docs/SECURITY.md`/`docs/ROADMAP.md` are genuinely documented and public) but reads as a confident, real product rather than a disclaimer-laden work-in-progress. The engineering-honest version of "what's actually implemented vs. mocked" stays exactly where it belongs — `docs/ROADMAP.md`'s MVP checklist and `docs/SCREENS.md` — never on the public pages themselves.

## Iteration 4 — local illustrations replace hotlinked photos

The user supplied six custom vintage-illustration assets directly (`public/assets/landing/*.webp`) — already in the target aesthetic natively. Every Unsplash hotlink across Home/Recursos/Sobre was replaced with one of these; see "Image sources" above for the exact file-to-section mapping. The pillar/feature cards on Home and Recursos also gained a thumbnail image (`aspect-[3/2]` crop above the icon/text) that didn't exist before, using the same assets — more image, less bare text, per the standing "use bastante animações e imagens" direction from the first prompt.

## Open improvement points

- [ ] Public `/login` leads to `/dashboard`, which `src/proxy.ts` redirects to `/` outside localhost; the hero CTA should point somewhere useful until auth ships.
- [ ] Generate or otherwise source `public/videos/hero.mp4` (the current `/` hero no longer uses a video; keep this only if a video comes back) — blocked on Higgsfield MCP not being connected in this environment (or supply a video another way); keep it ≤ 4MB desktop / ≤ 2MB mobile per the researched performance guidance. The hero currently falls back to `hero-archive-order.webp` as its poster, which is a legitimate look on its own, not just a stopgap.
- [ ] Add a real `/contato` page or form; the hero's "Contato" button is a bare `mailto:` link today.
- [ ] `/recursos` and `/sobre` are lighter on imagery than Home; consider whether they need another illustration once more are available.
- [ ] No automated visual regression check exists for the public site; verification today is `pnpm build` + a manual `curl` smoke pass per route (see `docs/SCREENS.md`'s verification pattern for the app routes — the public site doesn't have an equivalent doc entry yet).
- [ ] Copy has not been reviewed by anyone other than the person who wrote it — get a second read before this is genuinely public-facing.
- [x] `docs/ROADMAP.md`'s MVP checklist item "Brand tokens applied" reconciled on 2026-10-25. Previously it was still unchecked even though the brand palette is now live in `packages/ui/src/styles/globals.css` — worth reconciling next time that file is touched, unrelated to this iteration but noticed while counting checklist items for the `CountUp` stat.

## References

- `docs/BRANDING.md` — the palette, type, spacing, and "no glassmorphism/pills/heavy shadow" rules this site must follow.
- `docs/SCREENS.md` — what the actual product screens do, which the `/recursos` copy should stay grounded in.
- `docs/ROADMAP.md` — current MVP status; the public site should never claim a capability that isn't real yet.
